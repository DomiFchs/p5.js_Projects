// === GENERATOR SETTINGS CLASS ===
class GeneratorSettings {
  constructor() {
    // Noise parameters
    this.noiseScale = 0.004;
    this.noiseSpeed = 0.002;
    this.noiseOctaves = 6;
    this.noisePersistence = 0.55;
    this.noiseLacunarity = 2.1;
    this.noiseTimeScale = 0.5;
    this.noiseAmplitude = 1.8;
    this.noiseSeed = 10;
    
    // Falloff parameters
    this.falloffStrength = 0.5;
    this.falloffRadius = 0.9;
    
    // Center height parameters
    this.centerHeightMultiplier = 1.5;
    this.centerRadius = 0.4;
    this.centerFalloffPower = 2.0;
    
    // Color settings
    this.colorSettings = new ColorSettings();
  }
  
  // Apply a preset configuration
  applyPreset(presetName) {
    const preset = ISLAND_PRESETS[presetName];
    if (preset) {
      Object.assign(this, preset.settings);
      if (preset.colors) {
        this.colorSettings = new ColorSettings(preset.colors);
      }
    }
  }
  
  // Get list of available presets
  getPresetNames() {
    return Object.keys(ISLAND_PRESETS);
  }
}

// === COLOR SETTINGS CLASS ===
class ColorSettings {
  constructor(colors = null) {
    if (colors) {
      Object.assign(this, colors);
    } else {
      // Default temperate island colors
      this.deepOcean = [20, 50, 120];
      this.shallowWater = [50, 100, 180];
      this.beach = [194, 178, 128];
      this.lowlands = [85, 140, 60];
      this.hills = [60, 100, 40];
      this.mountains = [120, 100, 80];
      this.peaks = [220, 220, 220];
    }
  }
  
  getColor(noiseValue) {
    if (noiseValue < 0.2) {
      return this.deepOcean;
    } else if (noiseValue < 0.24) {
      return this.shallowWater;
    } else if (noiseValue < 0.28) {
      return this.beach;
    } else if (noiseValue < 0.45) {
      return this.lowlands;
    } else if (noiseValue < 0.7) {
      return this.hills;
    } else if (noiseValue < 0.9) {
      return this.mountains;
    } else {
      return this.peaks;
    }
  }
}

// === ISLAND PRESETS ===
const ISLAND_PRESETS = {
  // Original mountain island
  "Mountain Island": {
    settings: {
      noiseScale: 0.004,
      noiseSpeed: 0.002,
      noiseOctaves: 6,
      noisePersistence: 0.55,
      noiseLacunarity: 2.1,
      noiseTimeScale: 0.5,
      noiseAmplitude: 1.8,
      noiseSeed: 10,
      falloffStrength: 0.5,
      falloffRadius: 0.9,
      centerHeightMultiplier: 1.5,
      centerRadius: 0.4,
      centerFalloffPower: 2.0
    }
  },
  
  // Volcanic island with steep slopes
  "Volcanic Island": {
    settings: {
      noiseScale: 0.003,
      noiseSpeed: 0.001,
      noiseOctaves: 8,
      noisePersistence: 0.6,
      noiseLacunarity: 2.3,
      noiseTimeScale: 0.3,
      noiseAmplitude: 2.2,
      noiseSeed: 42,
      falloffStrength: 0.8,
      falloffRadius: 0.85,
      centerHeightMultiplier: 3.0,
      centerRadius: 0.25,
      centerFalloffPower: 1.5
    },
    colors: {
      deepOcean: [15, 25, 80],
      shallowWater: [30, 60, 140],
      beach: [40, 30, 25],
      lowlands: [60, 80, 30],
      hills: [80, 60, 40],
      mountains: [100, 50, 30],
      peaks: [200, 80, 60]
    }
  },
  
  // Flat coral atoll
  "Coral Atoll": {
    settings: {
      noiseScale: 0.008,
      noiseSpeed: 0.003,
      noiseOctaves: 4,
      noisePersistence: 0.4,
      noiseLacunarity: 1.8,
      noiseTimeScale: 0.8,
      noiseAmplitude: 0.8,
      noiseSeed: 73,
      falloffStrength: 0.3,
      falloffRadius: 0.95,
      centerHeightMultiplier: 0.8,
      centerRadius: 0.7,
      centerFalloffPower: 4.0
    },
    colors: {
      deepOcean: [0, 40, 120],
      shallowWater: [20, 150, 200],
      beach: [255, 250, 200],
      lowlands: [100, 200, 80],
      hills: [80, 180, 70],
      mountains: [60, 160, 60],
      peaks: [255, 255, 255]
    }
  },
  
  // Arctic frozen island
  "Arctic Island": {
    settings: {
      noiseScale: 0.005,
      noiseSpeed: 0.001,
      noiseOctaves: 7,
      noisePersistence: 0.5,
      noiseLacunarity: 2.0,
      noiseTimeScale: 0.2,
      noiseAmplitude: 1.5,
      noiseSeed: 99,
      falloffStrength: 0.6,
      falloffRadius: 0.88,
      centerHeightMultiplier: 2.0,
      centerRadius: 0.5,
      centerFalloffPower: 2.5
    },
    colors: {
      deepOcean: [20, 30, 60],
      shallowWater: [40, 60, 100],
      beach: [200, 220, 240],
      lowlands: [220, 230, 250],
      hills: [200, 210, 230],
      mountains: [180, 190, 210],
      peaks: [255, 255, 255]
    }
  },
  
  // Desert island
  "Desert Island": {
    settings: {
      noiseScale: 0.006,
      noiseSpeed: 0.0015,
      noiseOctaves: 5,
      noisePersistence: 0.45,
      noiseLacunarity: 1.9,
      noiseTimeScale: 0.6,
      noiseAmplitude: 1.3,
      noiseSeed: 156,
      falloffStrength: 0.7,
      falloffRadius: 0.92,
      centerHeightMultiplier: 1.8,
      centerRadius: 0.6,
      centerFalloffPower: 3.0
    },
    colors: {
      deepOcean: [20, 50, 120],
      shallowWater: [50, 100, 180],
      beach: [240, 220, 180],
      lowlands: [200, 180, 120],
      hills: [180, 150, 100],
      mountains: [160, 130, 90],
      peaks: [140, 110, 80]
    }
  },
  
  // Archipelago (multiple small peaks)
  "Archipelago": {
    settings: {
      noiseScale: 0.012,
      noiseSpeed: 0.004,
      noiseOctaves: 6,
      noisePersistence: 0.7,
      noiseLacunarity: 2.5,
      noiseTimeScale: 1.0,
      noiseAmplitude: 2.5,
      noiseSeed: 234,
      falloffStrength: 0.2,
      falloffRadius: 0.98,
      centerHeightMultiplier: 1.2,
      centerRadius: 0.8,
      centerFalloffPower: 6.0
    }
  },
  
  // Plateau island (flat top)
  "Plateau Island": {
    settings: {
      noiseScale: 0.003,
      noiseSpeed: 0.001,
      noiseOctaves: 4,
      noisePersistence: 0.3,
      noiseLacunarity: 1.7,
      noiseTimeScale: 0.3,
      noiseAmplitude: 1.0,
      noiseSeed: 321,
      falloffStrength: 1.2,
      falloffRadius: 0.75,
      centerHeightMultiplier: 4.0,
      centerRadius: 0.3,
      centerFalloffPower: 0.5
    },
    colors: {
      deepOcean: [20, 50, 120],
      shallowWater: [50, 100, 180],
      beach: [194, 178, 128],
      lowlands: [120, 180, 80],
      hills: [100, 160, 70],
      mountains: [140, 120, 100],
      peaks: [160, 140, 120]
    }
  },
  
  // Jungle island (lush and green)
  "Jungle Island": {
    settings: {
      noiseScale: 0.007,
      noiseSpeed: 0.005,
      noiseOctaves: 8,
      noisePersistence: 0.65,
      noiseLacunarity: 2.2,
      noiseTimeScale: 1.2,
      noiseAmplitude: 2.0,
      noiseSeed: 445,
      falloffStrength: 0.4,
      falloffRadius: 0.93,
      centerHeightMultiplier: 1.6,
      centerRadius: 0.5,
      centerFalloffPower: 2.2
    },
    colors: {
      deepOcean: [10, 40, 100],
      shallowWater: [30, 80, 150],
      beach: [240, 220, 160],
      lowlands: [40, 120, 40],
      hills: [30, 100, 30],
      mountains: [20, 80, 20],
      peaks: [60, 140, 60]
    }
  },
  
  // Rocky highlands
  "Rocky Highlands": {
    settings: {
      noiseScale: 0.002,
      noiseSpeed: 0.001,
      noiseOctaves: 9,
      noisePersistence: 0.8,
      noiseLacunarity: 2.7,
      noiseTimeScale: 0.2,
      noiseAmplitude: 2.8,
      noiseSeed: 567,
      falloffStrength: 0.9,
      falloffRadius: 0.8,
      centerHeightMultiplier: 2.5,
      centerRadius: 0.4,
      centerFalloffPower: 1.8
    },
    colors: {
      deepOcean: [20, 50, 120],
      shallowWater: [50, 100, 180],
      beach: [120, 100, 80],
      lowlands: [100, 120, 80],
      hills: [120, 100, 80],
      mountains: [100, 80, 60],
      peaks: [140, 120, 100]
    }
  },
  
  // Gentle hills (rolling landscape)
  "Gentle Hills": {
    settings: {
      noiseScale: 0.008,
      noiseSpeed: 0.003,
      noiseOctaves: 4,
      noisePersistence: 0.4,
      noiseLacunarity: 1.6,
      noiseTimeScale: 0.7,
      noiseAmplitude: 1.2,
      noiseSeed: 678,
      falloffStrength: 0.3,
      falloffRadius: 0.95,
      centerHeightMultiplier: 1.1,
      centerRadius: 0.7,
      centerFalloffPower: 4.0
    },
    colors: {
      deepOcean: [20, 50, 120],
      shallowWater: [50, 100, 180],
      beach: [220, 200, 160],
      lowlands: [120, 180, 100],
      hills: [100, 160, 80],
      mountains: [80, 140, 60],
      peaks: [200, 220, 180]
    }
  },
  
  // Canyon mesa with deep valleys
  "Canyon Mesa": {
    settings: {
      noiseScale: 0.005,
      noiseSpeed: 0.002,
      noiseOctaves: 7,
      noisePersistence: 0.75,
      noiseLacunarity: 3.0,
      noiseTimeScale: 0.4,
      noiseAmplitude: 3.5,
      noiseSeed: 789,
      falloffStrength: 1.5,
      falloffRadius: 0.85,
      centerHeightMultiplier: 2.8,
      centerRadius: 0.35,
      centerFalloffPower: 1.2
    },
    colors: {
      deepOcean: [20, 50, 120],
      shallowWater: [50, 100, 180],
      beach: [180, 140, 100],
      lowlands: [200, 150, 100],
      hills: [180, 120, 80],
      mountains: [160, 100, 60],
      peaks: [140, 80, 40]
    }
  },
  
  // Swamp island with low wetlands
  "Swamp Island": {
    settings: {
      noiseScale: 0.009,
      noiseSpeed: 0.004,
      noiseOctaves: 5,
      noisePersistence: 0.35,
      noiseLacunarity: 1.7,
      noiseTimeScale: 1.0,
      noiseAmplitude: 0.9,
      noiseSeed: 890,
      falloffStrength: 0.25,
      falloffRadius: 0.96,
      centerHeightMultiplier: 0.9,
      centerRadius: 0.8,
      centerFalloffPower: 5.0
    },
    colors: {
      deepOcean: [10, 30, 60],
      shallowWater: [40, 70, 50],
      beach: [80, 60, 40],
      lowlands: [60, 80, 40],
      hills: [50, 70, 30],
      mountains: [40, 60, 20],
      peaks: [80, 100, 60]
    }
  },
  
  // Alien crystal formations
  "Crystal Formations": {
    settings: {
      noiseScale: 0.006,
      noiseSpeed: 0.002,
      noiseOctaves: 10,
      noisePersistence: 0.9,
      noiseLacunarity: 3.5,
      noiseTimeScale: 0.3,
      noiseAmplitude: 4.0,
      noiseSeed: 991,
      falloffStrength: 0.7,
      falloffRadius: 0.88,
      centerHeightMultiplier: 2.2,
      centerRadius: 0.45,
      centerFalloffPower: 1.8
    },
    colors: {
      deepOcean: [5, 0, 40],
      shallowWater: [20, 10, 80],
      beach: [60, 40, 120],
      lowlands: [100, 60, 180],
      hills: [140, 80, 200],
      mountains: [180, 120, 220],
      peaks: [220, 180, 255]
    }
  },
  
  // Mushroom forest island
  "Mushroom Forest": {
    settings: {
      noiseScale: 0.010,
      noiseSpeed: 0.003,
      noiseOctaves: 6,
      noisePersistence: 0.55,
      noiseLacunarity: 2.4,
      noiseTimeScale: 0.8,
      noiseAmplitude: 1.8,
      noiseSeed: 1092,
      falloffStrength: 0.4,
      falloffRadius: 0.92,
      centerHeightMultiplier: 1.4,
      centerRadius: 0.6,
      centerFalloffPower: 2.8
    },
    colors: {
      deepOcean: [20, 50, 120],
      shallowWater: [50, 100, 180],
      beach: [160, 140, 120],
      lowlands: [120, 60, 40],
      hills: [140, 80, 60],
      mountains: [160, 100, 80],
      peaks: [200, 140, 120]
    }
  },
  
  // Floating sky island
  "Sky Island": {
    settings: {
      noiseScale: 0.004,
      noiseSpeed: 0.001,
      noiseOctaves: 8,
      noisePersistence: 0.6,
      noiseLacunarity: 2.2,
      noiseTimeScale: 0.2,
      noiseAmplitude: 2.5,
      noiseSeed: 1193,
      falloffStrength: 1.8,
      falloffRadius: 0.65,
      centerHeightMultiplier: 3.5,
      centerRadius: 0.3,
      centerFalloffPower: 1.0
    },
    colors: {
      deepOcean: [180, 220, 255],
      shallowWater: [200, 230, 255],
      beach: [240, 240, 220],
      lowlands: [160, 200, 140],
      hills: [140, 180, 120],
      mountains: [120, 160, 100],
      peaks: [255, 255, 255]
    }
  },
  
  // Badlands with eroded terrain
  "Badlands": {
    settings: {
      noiseScale: 0.007,
      noiseSpeed: 0.002,
      noiseOctaves: 8,
      noisePersistence: 0.8,
      noiseLacunarity: 2.8,
      noiseTimeScale: 0.5,
      noiseAmplitude: 2.0,
      noiseSeed: 1294,
      falloffStrength: 0.6,
      falloffRadius: 0.9,
      centerHeightMultiplier: 1.7,
      centerRadius: 0.55,
      centerFalloffPower: 2.5
    },
    colors: {
      deepOcean: [20, 50, 120],
      shallowWater: [50, 100, 180],
      beach: [200, 160, 120],
      lowlands: [180, 130, 90],
      hills: [160, 110, 70],
      mountains: [140, 90, 50],
      peaks: [120, 70, 30]
    }
  },
  
  // Lava fields with obsidian
  "Lava Fields": {
    settings: {
      noiseScale: 0.005,
      noiseSpeed: 0.001,
      noiseOctaves: 7,
      noisePersistence: 0.7,
      noiseLacunarity: 2.5,
      noiseTimeScale: 0.3,
      noiseAmplitude: 2.8,
      noiseSeed: 1395,
      falloffStrength: 0.9,
      falloffRadius: 0.82,
      centerHeightMultiplier: 2.5,
      centerRadius: 0.4,
      centerFalloffPower: 1.5
    },
    colors: {
      deepOcean: [20, 50, 120],
      shallowWater: [50, 100, 180],
      beach: [30, 20, 15],
      lowlands: [60, 40, 30],
      hills: [80, 30, 20],
      mountains: [120, 40, 20],
      peaks: [200, 60, 30]
    }
  },
  
  // Frozen tundra with ice spikes
  "Ice Spikes": {
    settings: {
      noiseScale: 0.003,
      noiseSpeed: 0.001,
      noiseOctaves: 9,
      noisePersistence: 0.85,
      noiseLacunarity: 3.2,
      noiseTimeScale: 0.2,
      noiseAmplitude: 3.2,
      noiseSeed: 1496,
      falloffStrength: 0.8,
      falloffRadius: 0.86,
      centerHeightMultiplier: 2.8,
      centerRadius: 0.4,
      centerFalloffPower: 1.6
    },
    colors: {
      deepOcean: [10, 20, 50],
      shallowWater: [30, 50, 100],
      beach: [180, 200, 220],
      lowlands: [200, 220, 240],
      hills: [220, 230, 250],
      mountains: [240, 245, 255],
      peaks: [255, 255, 255]
    }
  },
  
  // Ancient ruins with terraced levels
  "Ancient Terraces": {
    settings: {
      noiseScale: 0.004,
      noiseSpeed: 0.002,
      noiseOctaves: 6,
      noisePersistence: 0.4,
      noiseLacunarity: 1.8,
      noiseTimeScale: 0.4,
      noiseAmplitude: 1.5,
      noiseSeed: 1597,
      falloffStrength: 0.7,
      falloffRadius: 0.88,
      centerHeightMultiplier: 3.0,
      centerRadius: 0.35,
      centerFalloffPower: 0.8
    },
    colors: {
      deepOcean: [20, 50, 120],
      shallowWater: [50, 100, 180],
      beach: [160, 140, 100],
      lowlands: [140, 120, 80],
      hills: [120, 100, 60],
      mountains: [100, 80, 40],
      peaks: [180, 160, 120]
    }
  },
  
  // Bioluminescent alien world
  "Bioluminescent": {
    settings: {
      noiseScale: 0.008,
      noiseSpeed: 0.003,
      noiseOctaves: 7,
      noisePersistence: 0.6,
      noiseLacunarity: 2.3,
      noiseTimeScale: 0.9,
      noiseAmplitude: 2.1,
      noiseSeed: 1698,
      falloffStrength: 0.5,
      falloffRadius: 0.91,
      centerHeightMultiplier: 1.8,
      centerRadius: 0.5,
      centerFalloffPower: 2.4
    },
    colors: {
      deepOcean: [0, 20, 40],
      shallowWater: [0, 40, 80],
      beach: [20, 40, 20],
      lowlands: [40, 80, 40],
      hills: [60, 120, 60],
      mountains: [80, 160, 80],
      peaks: [120, 255, 120]
    }
  }
};