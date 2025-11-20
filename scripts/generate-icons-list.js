const fs = require('fs');
const path = require('path');

const svgsDir = path.join(__dirname, '..', 'fontnotawesome-assets', 'svgs');
const destFile = path.join(__dirname, '..', 'src', 'icons.json');

const iconToFamilies = new Map();

function walkSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  files.forEach(file => {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      walkSync(fullPath);
    } else if (file.name.endsWith('.svg')) {
      const relPath = path.relative(svgsDir, fullPath);
      const parts = relPath.split(path.sep);
      
      if (parts.length >= 2) {
        const family = parts[0];
        const iconName = path.basename(file.name, '.svg');
        
        if (!iconToFamilies.has(iconName)) {
          iconToFamilies.set(iconName, []);
        }
        
        const families = iconToFamilies.get(iconName);
        if (!families.includes(family)) {
          families.push(family);
        }
      }
    }
  });
}

walkSync(svgsDir);

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

iconToFamilies.forEach((families, iconName) => {
  const familiesWithPriority = families.map(family => ({
    family,
    priority: familyPriority[family] !== undefined ? familyPriority[family] : -100
  }));
  
  const sortedFamilies = familiesWithPriority
    .sort((a, b) => b.priority - a.priority)
    .map(item => item.family);
  
  iconFamilies[iconName] = sortedFamilies.length > 0 ? sortedFamilies : ['classic'];
});

const icons = Array.from(iconToFamilies.keys()).sort();

fs.writeFileSync(destFile, JSON.stringify({ icons, iconFamilies }, null, 2));
console.log(`✓ Generated ${icons.length} icons to ${destFile}`);
