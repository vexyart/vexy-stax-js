# Vexy Stax JS - Project Overview

This document provides a compact description of the Vexy Stax JS project, its structure, and development guidelines.

## Project Description

Vexy Stax JS is a browser-based 3D image stacking visualizer built with Three.js. It allows users to load images, arrange them in a 3D space, apply various materials and camera effects, and export the final scene as high-resolution PNG images or JSON configurations.

## Codebase Structure

The project is organized into several directories, each with a specific purpose:

-   **`src/main.js`**: The main entry point of the application. It is currently a large file that orchestrates the entire application, from UI setup to rendering.
-   **`src/core`**: Contains the core utilities of the application, such as state management (`AppState.js`), an event bus for decoupled communication (`EventBus.js`), and the main rendering loop (`RenderLoop.js`).
-   **`src/scene`**: Manages the Three.js scene, including the floor, lighting, and other environmental elements.
-   **`src/camera`**: Handles camera animations and controls.
-   **`src/utils`**: A collection of helper functions and a logging utility.
-   **`tests`**: A comprehensive suite of unit tests that ensure the stability and correctness of the codebase.
-   **`.md` files**: The project is extensively documented with over 30 markdown files covering everything from the API and architecture to testing and contribution guidelines.

## `main.js` Refactoring State

The `main.js` file is currently in a **partially refactored state**. While some core functionalities have been extracted into their own modules (e.g., `RenderLoop.js`), the file remains large and contains a significant amount of logic that is planned to be moved into more focused modules. The project's `PLAN.md` outlines a clear strategy to extract the following functionalities from `main.js`:

-   UI Initialization (`TweakpaneSetup.js`)
-   File Handling (`FileHandler.js`)
-   Scene Composition (`SceneComposition.js`)
-   Camera Controls (`CameraController.js`)
-   Export Management (`ExportManager.js`)

This refactoring effort aims to make the codebase more modular, maintainable, and easier to test.

## Maintenance and Coding Guidelines

The project adheres to a strict set of maintenance and coding guidelines to ensure high quality and consistency:

-   **Testing**: All new code must be accompanied by comprehensive unit tests. The project has a high standard for test coverage, especially for core utilities.
-   **Code Style**: A consistent coding style is enforced through an `.editorconfig` file. This includes rules for indentation (4 spaces for JavaScript, 2 for others) and line endings (LF).
-   **Documentation**: All new features, modules, and functions must be thoroughly documented. The project uses JSDoc for all exported functions and constants.
-   **Commit Messages**: A structured commit message format is enforced through a `.gitmessage` template to ensure a clear and informative git history.
-   **Dependencies**: The project relies on a small, curated set of well-maintained and secure dependencies. All dependencies are documented in `DEPENDENCIES.md`.
