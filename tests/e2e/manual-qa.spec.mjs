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
