# fontnotawesome - Setup Guide

## Project Structure

```
fontnotawesome/
├── src/
│   ├── Icon.tsx          # Main React Icon component
│   ├── useIcon.ts        # Hook for icon classes
│   ├── utils.ts          # Utilities and types
│   └── index.tsx         # Export file
├── example/
│   └── App.tsx           # Example usage
├── scripts/
│   └── copy-styles.js    # Build script for CSS files
├── fontnotawesome-assets/     # fontnotawesome assets (CSS, fonts, SVGs, etc.)
├── dist/                 # Compiled output
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── README.md
└── LICENSE
```

## Available Commands

**Build the library:**
```bash
npm run build
```
Compiles TypeScript and copies CSS files to `dist/`

**Type checking:**
```bash
npm run typecheck
```

**Linting:**
```bash
npm run lint
```

**Development mode (watch TypeScript):**
```bash
npm run dev
```

## What's Included

✅ **Icon Component** - Render fontnotawesome icons as React components
✅ **useIcon Hook** - Get icon classes for custom elements
✅ **Type Safety** - Full TypeScript support with proper types
✅ **Multiple Weights** - Thin, Light, Regular, Solid
✅ **Multiple Families** - Classic and Sharp styles
✅ **Size Control** - 10 different size options
✅ **38+ CSS Files** - All fontnotawesome style variants
✅ **Webfonts** - All necessary font files

## Publishing to NPM

1. Create an account on [npmjs.com](https://www.npmjs.com)
2. Login in terminal: `npm login`
3. Update version in `package.json` and `package.json` author field
4. Publish: `npm publish`

To make it a scoped package (private or org):
- Rename in `package.json` to `@yourscope/fontnotawesome`
- Publish with: `npm publish --access=public` (for public scoped packages)

## Usage Example

```tsx
import { Icon } from 'fontnotawesome';
import 'fontnotawesome/css/all.css';

function MyComponent() {
  return (
    <div>
      <Icon icon="heart" size="2x" style={{ color: 'red' }} />
      <Icon icon="light:star" size="lg" />
      <Icon icon="spinner" className="fa-spin" />
    </div>
  );
}
```

## Features

- **Lightweight**: Only includes what you need
- **TypeScript**: Fully typed exports
- **Flexible**: Works with inline styles and CSS classes
- **Composable**: Combine with animations and styling libraries
- **CSS Imports**: Import specific CSS files as needed

## Build Output

The build process creates:
- **TypeScript files**: `Icon.js`, `useIcon.js`, `utils.js` with `.d.ts` files
- **CSS files**: All 38 fontnotawesome CSS variant files
- **Source maps**: For debugging in development

## Next Steps

1. ✅ Project is ready to build and publish
2. Update author/repository info in `package.json`
3. Build: `npm run build`
4. Test in a React project
5. Publish to npm when ready
