const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'fontnotawesome-assets', 'css');
const webfontsSourceDir = path.join(__dirname, '..', 'fontnotawesome-assets', 'webfonts');
const destDir = path.join(__dirname, '..', 'dist');
const webfontDestDir = path.join(destDir, 'webfonts');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

if (!fs.existsSync(webfontDestDir)) {
  fs.mkdirSync(webfontDestDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.css'));

files.forEach(file => {
  const src = path.join(sourceDir, file);
  const dest = path.join(destDir, file);
  let content = fs.readFileSync(src, 'utf-8');
  content = content.replace(/\.\.\//g, './');
  fs.writeFileSync(dest, content);
  console.log(`Copied and fixed paths: ${file}`);
});

const webfontFiles = fs.readdirSync(webfontsSourceDir).filter(file => file.endsWith('.woff2'));
webfontFiles.forEach(file => {
  const src = path.join(webfontsSourceDir, file);
  const dest = path.join(webfontDestDir, file);
  fs.copyFileSync(src, dest);
  console.log(`Copied webfont: ${file}`);
});

const iconsSourceFile = path.join(__dirname, '..', 'src', 'icons.json');
if (fs.existsSync(iconsSourceFile)) {
  const iconsDest = path.join(destDir, 'icons.json');
  fs.copyFileSync(iconsSourceFile, iconsDest);
  console.log(`Copied icons list`);
}

console.log(`✓ Copied ${files.length} CSS files and ${webfontFiles.length} webfont files to dist/`);
