![fontnotawesome Logo](./img/fontnotawesome-logo.png)

# fontnotawesome

A lightweight React component library for **fontnotawesome** icons. Provides an easy-to-use component and utilities to integrate fontnotawesome icons into your React applications with full TypeScript support.

## Features

- 🎨 **5000+ Icons** - Access a vast library of icons
- ⚡ **Lightweight** - Minimal bundle size impact
- 🎯 **TypeScript** - Full TypeScript support with type definitions
- 🎪 **Multiple Families** - Classic and Sharp variants
- 🎨 **Font Weights** - Thin, Light, Regular, and Solid weights
- 🪝 **React Hooks** - `useIcon` hook for flexible implementations
- 📦 **Tree-shakeable** - Import only what you need

## Quick Start

### Installation

```bash
npm install fontnotawesome
```

### Basic Usage

Import the Icon component and CSS:

```tsx
import { Icon } from 'fontnotawesome';
import 'fontnotawesome/css/all.css';

export function App() {
  return (
    <div>
      <Icon icon="heart" />
      <Icon icon="star" size="2x" />
      <Icon icon="spinner" className="fa-spin" />
    </div>
  );
}
```

## Usage Guide

### Icon Component Props

The `Icon` component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | string | required | The icon name (e.g., "heart", "star", "spinner") |
| `size` | string | - | Size: 'xs', 'sm', 'lg', 'xl', '2xl', '1x', '2x', '3x', '5x', '7x', '10x' |
| `weight` | string | 'solid' | Font weight: 'thin', 'light', 'regular', 'solid' |
| `family` | string | 'classic' | Font family: 'classic', 'sharp' |
| `variant` | string | - | Variant: 'duotone', 'fill' (optional) |
| `className` | string | - | Additional CSS classes |
| `style` | object | - | Inline styles |

### Examples

#### Different Sizes

```tsx
<Icon icon="heart" size="sm" />
<Icon icon="heart" size="2x" />
<Icon icon="heart" size="5x" />
```

#### Font Weights

```tsx
<Icon icon="heart" weight="thin" />
<Icon icon="heart" weight="light" />
<Icon icon="heart" weight="regular" />
<Icon icon="heart" weight="solid" />
```

#### Weight Shorthand

You can specify weight directly in the icon name using a colon:

```tsx
<Icon icon="light:heart" />
<Icon icon="thin:star" size="lg" />
<Icon icon="solid:spinner" />
```

#### Font Families

```tsx
<Icon icon="heart" family="classic" />
<Icon icon="heart" family="sharp" />
```

#### With Custom Styling

```tsx
<Icon 
  icon="heart" 
  size="2x"
  style={{ color: 'red' }}
  className="hover:scale-110"
/>
```

#### Animations

```tsx
<Icon icon="spinner" className="fa-spin" />
<Icon icon="circle-notch" className="fa-pulse" />
```

### Using the useIcon Hook

For more flexible implementations, use the `useIcon` hook:

```tsx
import { useIcon } from 'fontnotawesome';

export function CustomIcon() {
  const { className } = useIcon({ 
    icon: 'heart', 
    size: '2x',
    weight: 'solid'
  });
  
  return <i className={className} />;
}
```

### Utility Functions

Parse icon names and get CSS classes programmatically:

```tsx
import { parseIconName, getIconClass } from 'fontnotawesome';

// Parse icon name with optional weight
const { name, customWeight } = parseIconName('light:heart');
// { name: 'heart', customWeight: 'light' }

// Get CSS class string
const classes = getIconClass('heart', 'solid', 'classic');
// 'fa fa-heart'
```

## CSS Imports

All fontnotawesome CSS files are available for import. Choose based on your needs:

```tsx
// Import all icons
import 'fontnotawesome/css/all.css';

// Or import specific subsets
import 'fontnotawesome/css/solid.css';   // Solid weight only
import 'fontnotawesome/css/light.css';   // Light weight only
import 'fontnotawesome/css/regular.css'; // Regular weight only
import 'fontnotawesome/css/thin.css';    // Thin weight only
import 'fontnotawesome/css/brands.css';  // Brand icons
```

## Styling

Icons inherit text color and size from their parent elements:

```tsx
// Using inline styles
<Icon 
  icon="heart" 
  style={{ color: 'red', fontSize: '32px' }}
/>

// Using CSS classes (Tailwind example)
<Icon 
  icon="star" 
  className="text-yellow-400 text-2xl hover:scale-110 transition-transform"
/>
```

## Building from Source

### Prerequisites

- Node.js 14 or higher
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/fontnotawesome.git
cd fontnotawesome
npm install
```

### Build Process

The build process automatically handles downloading the fontnotawesome assets if needed:

```bash
# Build the library
npm run build

# Run TypeScript type checking
npm run typecheck

# Run ESLint
npm run lint

# Watch mode for development
npm run dev

# Download assets only (if needed)
npm run download-assets
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript and copy CSS files |
| `npm run build:styles` | Copy CSS and font files to dist |
| `npm run dev` | Watch mode for development |
| `npm run download-assets` | Download and extract fontnotawesome assets |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Run ESLint on source files |

### Assets

The `fontnotawesome-assets` folder is not included in the repository. It will be automatically downloaded when you run `npm run build`. If needed, you can manually download it:

```bash
npm run download-assets
```

The script will:
- Check if `fontnotawesome-assets` exists
- Ask if you want to redownload it (if it exists)
- Automatically download and extract the assets if missing

### Project Structure

```
fontnotawesome/
├── src/              # TypeScript source files
│   ├── Icon.tsx      # Icon component
│   ├── useIcon.ts    # useIcon hook
│   ├── utils.ts      # Utility functions
│   └── index.ts      # Main exports
├── scripts/          # Build scripts
│   ├── download-assets.js
│   ├── generate-icons-list.js
│   └── copy-styles.js
├── dist/             # Compiled output (generated)
├── example/          # Example application
└── package.json      # Project configuration
```

## Package.json Exports

The library exports are configured for both CommonJS and ES modules:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.js"
    },
    "./icons": "./dist/icons.json",
    "./css/all.css": "./dist/all.css",
    "./css/solid.css": "./dist/solid.css",
    "./css/brands.css": "./dist/brands.css"
  }
}
```

## Peer Dependencies

- React >= 16.8.0
- React DOM >= 16.8.0

## License

MIT - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
