# Sketch Studio: A Client-Side Interactive Sketch Suite

A lightweight, client-side collection of interactive sketches (Game of Life, Snake, Space Invaders, island/terrain generation, flow fields, and more) wrapped in self-contained HTML/JS bundles. Each demo runs entirely in the browser with no backend, and exposes a consistent UI to tweak parameters in real time.

What this project can do
- Real-time parameter tweaking across multiple sketches via a QuickSettings-like UI
- Bind UI controls (sliders, color pickers, dropdowns, checkboxes, etc.) to sketch state for two-way synchronization
- Persist UI state locally with JSON export/import and localStorage
- Easily remix and combine demos (Life, islands, flow fields, L-systems, etc.) using a common API
- Each demo ships as its own HTML/JS bundle for quick experimentation
- Procedural content generation with configurable presets and color palettes

Usage scenarios
- Wire a new island/terrain generator to the UI
  - Example (island generator panel)
  - 
 ```javascript
const panel = QuickSettings.create(10, 10, "IslandGenerator", document.body);
panel.addRange("noiseScale", 0.001, 0.02, 0.003, 0.001, v => { generator.noiseScale = v; });
panel.addRange("falloffStrength", 0, 1, 0.5, 0.01, v => { generator.falloffStrength = v; });
panel.addColor("deepOcean", "#123456", v => { generator.colorSettings.deepOcean = v; });
panel.saveInLocalStorage("island-gen-save");
```

- Bind a Game of Life cell size and wrapping behavior to the UI
  - 
  ```javascript
const panel = QuickSettings.create(10, 10, "Life", document.body);
panel.addRange("cellSize", 2, 20, 6, 1, v => { grid.cellSize = v; redraw = true; });
panel.addBoolean("wrap", true, v => { wrap = v; redraw = true; });
```

- Persist and restore UI configurations
  - 
  ```javascript
panel.saveInLocalStorage("my-ui-save");
const saved = localStorage.getItem("my-ui-save");
panel.setValuesFromJSON(saved);
```

Technical stack
- JavaScript (ES6+)
- p5.js for rendering
- Lightweight QuickSettings-inspired UI wrapper
- Procedural island/terrain generation with noise, falloff, and color palettes
- LocalStorage and JSON-based state export/import
- Self-contained HTML/JS wrappers per demo (no servers required)

Notes
- Demos are modular: wrap each sketch in its own HTML/JS bundle while sharing a common UI API
- Focused on rapid experimentation, remixing, and visual feedback from parameter tweaks
- Browser-first and educational in scope, with easy extensibility for new sketches