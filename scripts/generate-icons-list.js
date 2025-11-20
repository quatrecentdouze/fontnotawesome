const fs = require('fs');
const path = require('path');

let sourceDir = path.join(__dirname, '..', 'fontnotawesome-assets', 'css');
if (!fs.existsSync(sourceDir)) {
  sourceDir = path.join(__dirname, '..', 'dist');
}

const destFile = path.join(__dirname, '..', 'src', 'icons.json');

// Read all CSS files and map their families
const cssFiles = fs.readdirSync(sourceDir).filter(file => file.endsWith('.css') && !file.includes('v4') && !file.includes('svg-with-js'));

// Parse each CSS file and store which icons are in which files
const iconToFiles = new Map();

cssFiles.forEach(file => {
  const src = path.join(sourceDir, file);
  const content = fs.readFileSync(src, 'utf-8');
  
  const regex = /\.fa-([a-z0-9-]+)(?:\s*[{:,]|$)/gi;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    const iconName = match[1];
    const excludedPrefixes = ['fw', 'sharp', 'brands', 'light', 'regular', 'solid', 'thin', 'duotone', 'fill'];
    const isSizeModifier = /^(\d+x|xs|sm|md|lg|xl|2xl|2xs)$/i.test(iconName);
    
    if (iconName && !excludedPrefixes.includes(iconName) && !isSizeModifier) {
      if (!iconToFiles.has(iconName)) {
        iconToFiles.set(iconName, []);
      }
      iconToFiles.get(iconName).push(file);
    }
  }
});

// Map families to icons
const iconFamilies = {};
const familyPriority = {
  'brands': 10,
  'sharp': 9,
  'chisel': 8,
  'etch': 7,
  'jelly-duo': 6,
  'jelly-fill': 5,
  'jelly': 4,
  'notdog-duo': 3,
  'notdog': 2,
  'slab-press': 1.5,
  'slab': 1,
  'thumbprint': 0.5,
  'utility-duo': -0.5,
  'utility-fill': -1,
  'utility': -1.5,
  'whiteboard': -2,
  'duotone': -3,
  'all': -10,
  'fontawesome': -10,
  'svg': -10,
  'solid': -11,
  'regular': -12,
  'light': -13,
  'thin': -14
};

iconToFiles.forEach((files, iconName) => {
  const families = new Map();
  
  files.forEach(file => {
    // Find which family this file belongs to
    for (const [family, priority] of Object.entries(familyPriority)) {
      if (file.includes(family)) {
        const displayFamily = family === 'svg' || family === 'fontawesome' || family === 'all' ? 'classic' : family;
        if (!families.has(displayFamily)) {
          families.set(displayFamily, priority);
        } else {
          families.set(displayFamily, Math.max(families.get(displayFamily), priority));
        }
        break;
      }
    }
  });
  
  const familiesArray = Array.from(families.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([family]) => family);
  
  iconFamilies[iconName] = familiesArray.length > 0 ? familiesArray : ['classic'];
});

const icons = Array.from(iconToFiles.keys()).sort();

fs.writeFileSync(destFile, JSON.stringify({ icons, iconFamilies }, null, 2));
console.log(`✓ Generated ${icons.length} icons to ${destFile}`);
