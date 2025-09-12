let generator;
let timeOffset = 0;
let currentPreset = "Mountain Island";
let currentPresetIndex = 0;

function setup() {
  createCanvas(1400, 600);
  pixelDensity(1);
  generator = new GeneratorSettings();
  generator.applyPreset(currentPreset);
  
  // Create preset selection dropdown
  createPresetSelector();
}

function createPresetSelector() {
  let selector = createSelect();
  selector.position(10, 10);
  selector.style('font-size', '16px');
  selector.style('padding', '5px');
  
  // Add all presets to dropdown
  let presets = generator.getPresetNames();
  for (let preset of presets) {
    selector.option(preset);
  }
  selector.selected(currentPreset);
  
  selector.changed(() => {
    currentPreset = selector.value();
    generator.applyPreset(currentPreset);
  });
}

function draw() {
  loadPixels();
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      
      // Calculate noise coordinates
      let xoff = x * generator.noiseScale;
      let yoff = y * generator.noiseScale;
      let zoff = timeOffset * generator.noiseTimeScale;
      
      // Multi-octave noise (fractal noise)
      let noiseValue = 0;
      let amplitude = generator.noiseAmplitude;
      let frequency = 1;
      let maxValue = 0;
      
      for (let i = 0; i < generator.noiseOctaves; i++) {
        noiseValue += noise(
          xoff * frequency + generator.noiseSeed, 
          yoff * frequency + generator.noiseSeed, 
          zoff * frequency
        ) * amplitude;
        maxValue += amplitude;
        amplitude *= generator.noisePersistence;
        frequency *= generator.noiseLacunarity;
      }
      
      // Normalize noise value (0 to 1)
      noiseValue /= maxValue;

      // Calculate distance from center for both falloff and height boost
      let centerX = width / 2;
      let centerY = height / 2;
      let normalizedX = (x - centerX) / (width / 2); 
      let normalizedY = (y - centerY) / (height / 2); 
      let distance = sqrt(normalizedX * normalizedX + normalizedY * normalizedY);
      
      // Original falloff for island shape
      let falloff = 1 - pow(distance / generator.falloffRadius, generator.falloffStrength);
      falloff = max(0, falloff);

      // Center height multiplier - strongest at center, fades out
      let centerBoost = 1 - pow(distance / generator.centerRadius, generator.centerFalloffPower);
      centerBoost = max(0, centerBoost);
      centerBoost = 1 + (generator.centerHeightMultiplier - 1) * centerBoost;

      // Apply both falloff and center boost
      noiseValue = noiseValue * 0.1 + (noiseValue * falloff * centerBoost) * 2;
      
      // Get colors from color settings
      let colors = generator.colorSettings.getColor(noiseValue);
      
      // Set pixel values
      pixels[index + 0] = colors[0];  // Red
      pixels[index + 1] = colors[1];  // Green
      pixels[index + 2] = colors[2];  // Blue
      pixels[index + 3] = 255;        // Alpha
    }
  }
  
  updatePixels();
  //timeOffset += generator.noiseSpeed;
  
  // Display current preset name
  fill(255);
  stroke(0);
  strokeWeight(1);
  textAlign(LEFT);
  textSize(18);
  text(`Current Preset: ${currentPreset}`, 10, height - 20);
}

function keyPressed() {
  // Press SPACE to cycle through presets
  if (key === ' ') {
    let presets = generator.getPresetNames();
    currentPresetIndex = (currentPresetIndex + 1) % presets.length;
    currentPreset = presets[currentPresetIndex];
    generator.applyPreset(currentPreset);
    
    // Update dropdown selection
    let selector = select('select');
    if (selector) {
      selector.selected(currentPreset);
    }
  }
  
  // Press 'R' to randomize the current preset's seed
  if (key === 'r' || key === 'R') {
    generator.noiseSeed = random(1, 1000);
  }
}