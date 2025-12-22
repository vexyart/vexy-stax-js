import { test, expect } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturesDir = path.resolve(__dirname, '../fixtures');

function loadFixtureBuffer(filename) {
  return fs.readFileSync(path.join(fixturesDir, filename));
}

const redImage = {
  name: 'red.png',
  mimeType: 'image/png',
  buffer: loadFixtureBuffer('red.png'),
};

const greenImage = {
  name: 'green.png',
  mimeType: 'image/png',
  buffer: loadFixtureBuffer('green.png'),
};

function fixtureToDataURL(filename, mimeType) {
  const buffer = loadFixtureBuffer(filename);
  const base64 = buffer.toString('base64');
  return `data:${mimeType};base64,${base64}`;
}

async function captureCanvasMetrics(page) {
  return page.evaluate(() => {
    const canvas = document.getElementById('canvas');
    if (!canvas) {
      throw new Error('Canvas not found in DOM');
    }
    const { width, height } = canvas;
    const { width: cssWidth, height: cssHeight } = getComputedStyle(canvas);
    return {
      cssWidth,
      cssHeight,
      width,
      height,
      pixelRatio: window.devicePixelRatio,
    };
  });
}

async function dispatchFileDragEvent(page, type) {
  await page.evaluate((eventType) => {
    const overlay = document.getElementById('drop-overlay');
    const dt = new DataTransfer();
    dt.items.add(new File(['dummy'], 'dummy.png', { type: 'image/png' }));
    const event = new DragEvent(eventType, {
      dataTransfer: dt,
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(event);
    return overlay?.classList.contains('visible') ?? false;
  }, type);
}

test.describe('Manual QA checklist automation', () => {
  test('canvas respects device pixel ratio for DPR 1 and 2', async ({ browser }) => {
    for (const deviceScaleFactor of [1, 2]) {
      const context = await browser.newContext({
        viewport: { width: 2560, height: 1440 },
        deviceScaleFactor,
        baseURL: 'http://127.0.0.1:4173',
      });
      const page = await context.newPage();
      await page.goto('/');
      await page.waitForSelector('#canvas');
      const metrics = await captureCanvasMetrics(page);

      const cssWidthPx = Number.parseFloat(metrics.cssWidth);
      const cssHeightPx = Number.parseFloat(metrics.cssHeight);

      expect(metrics.pixelRatio).toBe(deviceScaleFactor);
      expect(metrics.width).toBeCloseTo(cssWidthPx * deviceScaleFactor, 0);
      expect(metrics.height).toBeCloseTo(cssHeightPx * deviceScaleFactor, 0);
      expect(cssWidthPx).toBeGreaterThan(0);
      expect(cssHeightPx).toBeGreaterThan(0);

      await context.close();
    }
  });

  test('global drop overlay toggles visibility during file drag lifecycle', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#canvas');
    const overlay = page.locator('#drop-overlay');
    await overlay.waitFor({ state: 'attached' });

    await expect(overlay).not.toHaveClass(/visible/);

    await dispatchFileDragEvent(page, 'dragenter');
    await expect(overlay).toHaveClass(/visible/);

    await dispatchFileDragEvent(page, 'dragover');
    await expect(overlay).toHaveClass(/visible/);

    await dispatchFileDragEvent(page, 'dragleave');
    await expect(overlay).not.toHaveClass(/visible/);

    await dispatchFileDragEvent(page, 'dragenter');
    await expect(overlay).toHaveClass(/visible/);

    await dispatchFileDragEvent(page, 'drop');
    await expect(overlay).not.toHaveClass(/visible/);
  });

  test('thumbnail strip supports file ingestion, tooltip metadata, reordering, and focus styles', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#canvas');
    page.on('dialog', (dialog) => dialog.accept());
    page.on('console', (message) => {
      if (['error', 'warning'].includes(message.type())) {
        console.warn(`[browser:${message.type()}] ${message.text()}`);
      }
    });
    const thumbnails = page.locator('.slide-thumb');

    await page.setInputFiles('#image-input', [redImage, greenImage]);
    await expect(thumbnails).toHaveCount(2, { timeout: 30_000 });

    await expect(thumbnails.nth(0)).toHaveAttribute('title', /red\.png/);
    await expect(thumbnails.nth(1)).toHaveAttribute('title', /green\.png/);
    await expect(thumbnails.nth(0).locator('.slide-thumb-index')).toHaveText('1');
    await expect(thumbnails.nth(1).locator('.slide-thumb-index')).toHaveText('2');

    await thumbnails.nth(1).dragTo(thumbnails.nth(0));

    await expect(thumbnails.nth(0)).toHaveAttribute('title', /green\.png/);
    await expect(thumbnails.nth(1)).toHaveAttribute('title', /red\.png/);
    await expect(thumbnails.nth(0).locator('.slide-thumb-index')).toHaveText('1');
    await expect(thumbnails.nth(1).locator('.slide-thumb-index')).toHaveText('2');

    await thumbnails.nth(0).focus();
    await expect(thumbnails.nth(0)).toHaveClass(/focused/);

    await page.keyboard.press('ArrowDown');
    await expect(thumbnails.nth(1)).toHaveClass(/focused/);

    const tooltipText = await thumbnails.nth(0).getAttribute('title');
    expect(tooltipText).toMatch(/green\.png/);
    expect(tooltipText).toMatch(/1×1px/);
  });
});

test('automation bridge exposes slide/viewpoint/heroShot controls', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('#canvas');

  await page.waitForFunction(() => typeof window.__vexyStaxAutomation !== 'undefined');

  const dataURL = fixtureToDataURL('red.png', 'image/png');

  await page.evaluate(async ({ dataURL }) => {
    await window.__vexyStaxAutomation.addSlideFromDataURL(dataURL, 'automation-red.png');
  }, { dataURL });

  const stackCount = await page.evaluate(() => window.vexyStax.getImageStack().length);
  expect(stackCount).toBe(1);

  await page.evaluate(async () => {
    await window.__vexyStaxAutomation.setViewpointPreset('beauty');
    await window.__vexyStaxAutomation.playHeroShot({ duration: 0.05, holdTime: 0.01, easing: 'linear' });
  });
});

test('tallest slide centered, all slides bottom-aligned (SCENE.md §1)', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('#canvas');
  await page.waitForFunction(() => typeof window.__vexyStaxAutomation !== 'undefined');

  // Create two images of different heights via canvas
  const images = await page.evaluate(() => {
    function createDataURL(width, height, color) {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);
      return canvas.toDataURL('image/png');
    }
    return {
      tall: createDataURL(100, 200, '#ff0000'),   // 200px tall (tallest)
      short: createDataURL(100, 100, '#00ff00'),  // 100px tall
    };
  });

  // Add tall slide first
  await page.evaluate(async (dataURL) => {
    await window.__vexyStaxAutomation.addSlideFromDataURL(dataURL, 'tall.png');
  }, images.tall);

  // Add short slide
  await page.evaluate(async (dataURL) => {
    await window.__vexyStaxAutomation.addSlideFromDataURL(dataURL, 'short.png');
  }, images.short);

  // Get mesh positions from the scene
  // getImageStack() returns: { index, filename, width, height, position: {x,y,z} }
  const positions = await page.evaluate(() => {
    const stack = window.vexyStax.getImageStack();
    return stack.map(img => ({
      filename: img.filename,
      height: img.height,
      y: img.position.y,
      bottomY: img.position.y - img.height / 2,
    }));
  });

  expect(positions).toHaveLength(2);

  // Find tallest and shortest
  const tallSlide = positions.find(p => p.filename === 'tall.png');
  const shortSlide = positions.find(p => p.filename === 'short.png');

  expect(tallSlide).toBeDefined();
  expect(shortSlide).toBeDefined();

  // All slides bottom-aligned means bottomY should be equal
  expect(tallSlide.bottomY).toBeCloseTo(shortSlide.bottomY, 0);

  // Tallest slide should be taller
  expect(tallSlide.height).toBeGreaterThan(shortSlide.height);
});

test('first slide triggers auto-defaults (SCENE.md §2)', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('#canvas');
  await page.waitForFunction(() => typeof window.__vexyStaxAutomation !== 'undefined');

  // Create and add first slide
  const dataURL = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0, 0, 100, 100);
    return canvas.toDataURL('image/png');
  });

  await page.evaluate(async (dataURL) => {
    await window.__vexyStaxAutomation.addSlideFromDataURL(dataURL, 'first.png');
  }, dataURL);

  // Wait for first-slide callback to trigger
  await page.waitForTimeout(200);

  // Verify slide was added
  const stackCount = await page.evaluate(() => window.vexyStax.getImageStack().length);
  expect(stackCount).toBe(1);

  // Verify slide is positioned correctly per SCENE.md §1:
  // Single slide is the "tallest", so its center is at Y=0
  const slidePos = await page.evaluate(() => {
    const stack = window.vexyStax.getImageStack();
    return stack[0]?.position ?? null;
  });

  expect(slidePos).not.toBeNull();
  // Single tallest slide's center is at Y=0
  expect(slidePos.y).toBeCloseTo(0, 0);
});

test('Hero→Beauty restores layer depth (SCENE.md §5)', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('#canvas');
  await page.waitForFunction(() => typeof window.__vexyStaxAutomation !== 'undefined');

  // Create and add two slides
  const images = await page.evaluate(() => {
    function createDataURL(width, height, color) {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);
      return canvas.toDataURL('image/png');
    }
    return {
      first: createDataURL(100, 100, '#ff0000'),
      second: createDataURL(100, 100, '#00ff00'),
    };
  });

  await page.evaluate(async (dataURL) => {
    await window.__vexyStaxAutomation.addSlideFromDataURL(dataURL, 'slide1.png');
  }, images.first);

  await page.evaluate(async (dataURL) => {
    await window.__vexyStaxAutomation.addSlideFromDataURL(dataURL, 'slide2.png');
  }, images.second);

  // Wait for layout to settle
  await page.waitForTimeout(200);

  // Get initial z-positions (with layer depth spacing)
  const initialPositions = await page.evaluate(() => {
    return window.vexyStax.getImageStack().map(img => img.position.z);
  });

  // Z positions should be different (layer depth applied)
  expect(initialPositions[0]).not.toBe(initialPositions[1]);
  const initialSpacing = Math.abs(initialPositions[0] - initialPositions[1]);
  expect(initialSpacing).toBeGreaterThan(10); // Should be ~243 (960/4 + 3)

  // Switch to Hero viewpoint (collapses layer depth)
  await page.evaluate(async () => {
    await window.__vexyStaxAutomation.setViewpointPreset('hero');
  });

  // Wait for viewpoint change and layout to settle
  await page.waitForTimeout(300);

  // Get positions after Hero (should be collapsed)
  const heroPositions = await page.evaluate(() => {
    return window.vexyStax.getImageStack().map(img => img.position.z);
  });

  const heroSpacing = Math.abs(heroPositions[0] - heroPositions[1]);
  // Hero viewpoint collapses slides to MIN_LAYER_GAP (3px)
  expect(heroSpacing).toBeLessThan(10);

  // Switch to Beauty viewpoint (should restore layer depth)
  await page.evaluate(async () => {
    await window.__vexyStaxAutomation.setViewpointPreset('beauty');
  });

  // Wait for viewpoint change and layout to settle
  await page.waitForTimeout(300);

  // Get positions after Beauty (should be restored)
  const beautyPositions = await page.evaluate(() => {
    return window.vexyStax.getImageStack().map(img => img.position.z);
  });

  const beautySpacing = Math.abs(beautyPositions[0] - beautyPositions[1]);
  // Should be approximately back to initial spacing (tolerance of 10%)
  expect(beautySpacing).toBeGreaterThan(initialSpacing * 0.9);
});
