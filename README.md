# Sketch Studio: A Client-Side Interactive Sketch Suite

A lightweight, browser-first collection of interactive sketches (Life, Snake, Space Invaders, island/terrain generation, flow fields, L-systems, and more) wrapped in self-contained HTML/JS bundles. It exposes a consistent UI to tweak parameters in real time, bind controls to sketch state, and persist or share configurations without a backend.

What this project can do
- Run multiple interactive demos entirely in the browser with no server required.
- Real-time parameter tweaking via a QuickSettings-like UI to control sketch behavior, visuals, and generation parameters.
- Bind UI controls to sketch state for two-way synchronization and effortless remixing.
- Persist, export, and restore UI configurations using JSON and localStorage for easy sharing and reuse.
- Create and remix procedural content (islands/terrain, flow fields, L-systems, etc.) with configurable presets and color palettes.
- Each demo ships as its own self-contained HTML/JS bundle, enabling quick experimentation and simple embedding.

Technical stack
- JavaScript (ES6+)
- p5.js for rendering and interactivity
- QuickSettings-inspired UI wrapper for lightweight, live controls
- LocalStorage and JSON for state export/import
- Self-contained HTML/JS bundles per demo (no backend required)