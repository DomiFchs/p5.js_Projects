# P5.js Interactive Sketch Suite with QuickSettings-style UI

A browser-first collection of runnable p5.js sketches demonstrating classic simulations, procedural content generation, and interactive visuals. Each sketch is wrapped in its own HTML file and loads a dedicated JavaScript module (sketch.js, snake.js, ship.js, etc.). A lightweight QuickSettings-inspired UI is embedded to expose parameters in real time, bind them to sketch state, and optionally persist configurations to localStorage.

What this project can do for you
- Quickly explore and remix a variety of interactive demos without a server
- See real-time parameter tweaking through a consistent UI across sketches
- Insulate UI logic from sketch logic so you can focus on algorithms and visuals
- Bind UI controls to any sketch property (numbers, colors, booleans, strings, dates, files, etc.)
- Save and restore UI state across sessions
- Use island/terrain presets, flow-fields, L-systems, cellular automata, and arcade-style games all in one repo

core capabilities and key features
- Real-time parameter tweaking
  - Sliders, color pickers, dropdowns, checkboxes, text inputs, date/time inputs, files, and more
  - Bind controls to sketch state with a simple API
- Multiple runnable demos
  - Game of Life (cellular automata)
  - Snake
  - Space Invaders
  - Island/terrain generation with noise-based algorithms and color palettes
  - Flow-field driven particle systems
  - Fractals and L-systems (trees and branching)
  - Additional sketches and experiments via dedicated HTML wrappers
- UI toolkit (QuickSettings-like)
  - Create panels, add controls, group related parameters
  - Save and load UI state from localStorage
  - Bind UI changes to callbacks for immediate sketch updates
  - Lightweight, browser-only, no backend required
- Prototyping and experimentation
  - Quick swapping between island presets (MountainIsland, VolcanicIsland, CoralAtoll, etc.)
  - Tune noise scales, falloff, center boost, and color palettes to explore terrain styles
- Core utilities
  - 2D grid helpers for cellular automata and grid-based simulations
  - Basic vector math and scene management for flows, particles, and collisions
  - Lightweight architecture for adding new sketches with minimal boilerplate
- Client-side, browser-first
  - No servers or backend processing needed
  - Each sketch runs entirely in the browser with HTML/CSS/JS

What’s inside (high-level architecture and components)
- Sketch wrappers and entry points
  - TheGameofLife.html, Snake.html, SpaceInvaders.html, Sketch.html, etc.
  - Each wrapper loads its own sketch.js and supporting modules
- Core utilities
  - 2D array/grid helpers (Make2DArray, index calculations)
  - Simple entity/state management (Snake, Ship, Enemies, Particles, etc.)
  - Island/terrain generator modules with presets and color mapping
- UI abstraction
  - QuickSettings-like API to create panels and add controls
  - Binding helpers to connect UI to sketch state
  - LocalStorage integration for persisting configurations
- Procedural generation modules
  - Noise-based island generator with falloff, center boost, and color palettes
  - Palette-driven terrain coloring
  - Presets for quick exploration of terrain archetypes
- Rendering pipeline
  - p5.js canvas-based rendering
  - Per-entity draw calls (cells, blocks, particles, ships, etc.)
  - Simple collision and AI-like behaviors for games

Usage scenarios and practical examples

- Example 1: Island generator panel
  - Purpose: tweak terrain generation parameters and color palettes in real time
  - Typical code (illustrative):
    - Open IslandGenerator-related HTML wrapper (e.g., IslandGenerator.html)
    - Bindings (via QuickSettings-like API):
      - panel = QuickSettings.create(10, 10, "IslandGenerator", document.body)
      - panel.addRange("noiseScale", 0.001, 0.02, 0.003, 0.001, v => { generator.noiseScale = v })
      - panel.addRange("falloffStrength", 0, 1, 0.5, 0.01, v => { generator.falloffStrength = v })
      - panel.addRange("centerHeightMultiplier", 0.5, 4.0, 1.5, 0.1, v => { generator.centerHeightMultiplier = v })
      - panel.addRange("centerRadius", 0.1, 0.9, 0.4, 0.05, v => { generator.centerRadius = v })
      - panel.addColor("deepOcean", "#123456", v => { generator.colorSettings.deepOcean = v })
      - panel.saveInLocalStorage("island-gen-save")
  - What you get: a live-updating terrain preview as you tweak noise, falloff, and color mapping

- Example 2: Game of Life (cellular automaton) with UI
  - Purpose: adjust grid size, update rules, or initial density and observe evolution
  - Typical usage (illustrative):
    - Open TheGameofLife.html
    - Use QuickSettings-like UI to tweak:
      - panel.addRange("cellSize", 2, 20, 6, 1, v => { ... })
      - panel.addBoolean("wrap", true, v => { ... }) or similar
      - Bind values to grid/state via getValue/setValue helpers
  - Output: evolving grid visuals with configurable cell size and wrap behavior

- Example 3: Flow-field particles
  - Purpose: visualize particle movement along a Perlin/noise-generated vector field
  - Typical usage (illustrative):
    - panel = QuickSettings.create(10, 10, "FlowField", document.body)
    - panel.addRange("scl", 10, 40, 20, 1, v => { scl = v; })
    - panel.addRange("particles", 100, 5000, 1000, 1, v => { resetParticles(v) })
  - Output: particles following a dynamic flow field with real-time parameter control

- Example 4: L-system fractals and trees
  - Purpose: control growth rules, angle, depth, and recursion
  - Typical usage (illustrative):
    - panel.addRange("angle", 5, 45, 25, 1, v => { angle = v; })
    - panel.addRange("depth", 1, 12, 6, 1, v => { maxDepth = v; })
  - Output: evolving branching structures that respond to UI controls

- Example 5: Space Invaders / Snake (classic arcade-style demos)
  - Purpose: tweak speeds, spawn rates, and enemy behavior in real time
  - Typical usage (illustrative):
    - panel.addRange("shipSpeed", 1, 10, 4, 1, v => { ship.speed = v })
    - panel.addRange("enemyFireRate", 1, 60, 15, 1, v => { enemies.fireRate = v })
  - Output: responsive arcade interactions with live parameter changes

API surface highlights (QuickSettings-like utilities)
- Core API (illustrative, consistent across sketches)
  - QuickSettings.create(x, y, title, parent) -> panel object
  - panel.addRange(title, min, max, value, step, callback)
  - panel.addNumber(title, min, max, value, step, callback)
  - panel.addBoolean(title, value, callback)
  - panel.addColor(title, color, callback)
  - panel.addDate(title, date, callback)
  - panel.addTime(title, time, callback)
  - panel.addText(title, text, callback)
  - panel.addTextArea(title, text, callback)
  - panel.addDropDown(title, items, callback)
  - panel.addFileChooser(title, label, filter, callback)
  - panel.addButton(title, callback)
  - panel.addHTML(title, html)
  - panel.addImage(title, imageURL, callback)
  - panel.bindXxx(...) variants to bind values to objects
  - panel.getValuesAsJSON(asString) -> object or JSON string
  - panel.setValuesFromJSON(json) -> populate controls from object/JSON
  - panel.saveInLocalStorage(name) / panel.clearLocalStorage(name)
- Sketch state bindings
  - Bind UI controls directly to sketch properties
  - Callbacks fire on value changes to update visuals immediately
  - LocalStorage for persistence across sessions

Technical stack and architecture (brief)
- Language: JavaScript (ES6+)
- Rendering: p5.js (canvas-based)
- UI: QuickSettings-inspired lightweight UI embedded in sketches
- Data model: grid-based simulations (2D arrays), entity/state objects for games
- Procedural generation: island/terrain presets, color palettes
- Modularity: sketches are organized by feature (Life, Snake, SpaceInvaders, IslandGenerator, FlowField, Fractals, etc.)
- Packaging: Each sketch is standalone with its own HTML wrapper and supporting JS modules
- No backend: fully client-side, browser-based, no server required

File structure (high-level)
- HTML wrappers
  - TheGameofLife.html, Snake.html, SpaceInvaders.html, Sketch.html, IslandGenerator.html, etc.
- JavaScript modules
  - sketch.js (Game of Life)
  - snake.js (Snake)
  - ship.js, enemy.js, drop.js (Space Invaders)
  - IslandGenerator-related modules (NoiseSettings.js, GeneratorSettings.js, color palettes)
  - Flow field, particles, L-systems, fractals, etc.
- Utilities
  - 2D grid helpers (Make2DArray, index calculations)
  - Color utilities and palette mappings
  - LocalStorage helpers for saving/loading UI configurations

How to extend or remix
- Create a new HTML wrapper (e.g., MyExperiment.html) and a corresponding JS module (myExperiment.js)
- Use the QuickSettings-like API to expose parameters
  - Create a panel:
    - const panel = QuickSettings.create(10, 10, "MyExperiment", document.body);
  - Bind parameters to your sketch state:
    - panel.addRange("speed", 0, 10, 2, 0.1, v => { sketchState.speed = v; });
    - panel.addColor("bgColor", "#000000", v => { sketchState.bgColor = v; });
    - panel.saveInLocalStorage("my-experiment");
- Reuse the grid utilities and color palettes from IslandGenerator for grid-based simulations
- Leverage the getValuesAsJSON/setValuesFromJSON for exporting/importing configurations

Technical notes and practical tips
- Open in a modern browser (no server required)
- Use the localStorage features to persist your favorite configurations
- If you add new UI controls, think in terms of:
  - What sketch property does it map to?
  - What callback should trigger redraw or recomputation?
- For performance, keep heavy operations off the UI thread where possible and batch state updates
- The island generator presets (MountainIsland, VolcanicIsland, CoralAtoll, ArcticIsland, etc.) provide quick starting points for terrain exploration

Quickstart tips (minimal)
- Open any HTML wrapper in your browser:
  - TheGameofLife.html
  - IslandGenerator.html
  - The others (Snake.html, SpaceInvaders.html, Sketch.html, etc.)
- Use the on-page UI to tweak parameters and observe changes in real time
- Save your preferred configurations to localStorage and reload later

Limitations and considerations
- Browser-based, client-side only; no server-side persistence beyond localStorage
- Performance depends on canvas size, browser, and device capabilities
- The QuickSettings-like UI is lightweight and intended for educational/exploratory use
- Some older browsers may have limited support for certain input types (date/time). Fallbacks are provided (text inputs) where needed

If you’d like, I can:
- Create a compact, ready-to-run starter example showing how to wire a new sketch to the QuickSettings UI
- Provide a cheat-sheet mapping common UI calls to their effects in the sketches
- Add a catalog of all sketches with one-liner descriptions and quick code snippets for common tweaks

This README emphasizes what the project can do, practical usage, and how the components interact. It’s designed to help you quickly understand capabilities and start experimenting, remixing, or extending the suite.