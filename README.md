# @zustbio-ui/design-tools

A modern Figma-style linear gradient editor for React. Create beautiful gradients with an intuitive interface.

## Installation

```bash
npm install @zustbio-ui/design-tools
```

or

```bash
yarn add @zustbio-ui/design-tools
```

## Usage

```tsx
import { GradientEditor } from '@zustbio-ui/design-tools';
import '@zustbio-ui/design-tools/style.css';

function App() {
  return (
    <GradientEditor />
  );
}
```

## Features

- 🎨 Intuitive Figma-style gradient editor
- 🎯 Add, remove, and reorder gradient stops
- 🌈 Color picker with hex, rgb, and hsl support
- 📋 Export to CSS and Tailwind CSS
- ⚡ Built with React and TypeScript
- 📦 Tree-shakeable ES modules

## Live Demo

See this library in action at [CSS Gradient Generator](https://cssgradient.zustbio.com/) - a fully-featured gradient design tool built with this library.

## API

### GradientEditor

The main gradient editor component.

```tsx
import { GradientEditor } from '@zustbio-ui/design-tools';

<GradientEditor />
```

### CodeDisplay

Display gradient code in different formats.

```tsx
import { CodeDisplay } from '@zustbio-ui/design-tools';

<CodeDisplay 
  stops={stops}
  angle={angle}
/>
```

### Utilities

```tsx
import { getCssCode, getTailwindCode } from '@zustbio-ui/design-tools';

// Get CSS gradient code
const cssCode = getCssCode(stops, angle);

// Get Tailwind CSS code
const tailwindCode = getTailwindCode(stops, angle);
```

### Types

```tsx
import type { Stop } from '@zustbio-ui/design-tools';
```

## License

MIT © Saptyadeep Bhattacharjee

