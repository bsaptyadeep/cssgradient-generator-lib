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
    <GradientEditor
      onChange={(state) => {
        console.log('Gradient updated:', state);
      }}
    />
  );
}
```

## Features

- 🎨 Intuitive Figma-style gradient editor
- 🎯 Add, remove, and reorder gradient stops
- 🖱️ **Interactive gradient slider** - drag markers to adjust positions, click anywhere on the bar to add new stops with interpolated colors
- 🌈 Color picker with hex input and opacity support
- 📐 Adjustable gradient angle (0-360°)
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

<GradientEditor
  initialStops={[
    { id: '1', color: '#ff0000', position: 0, opacity: 1 },
    { id: '2', color: '#0000ff', position: 100, opacity: 1 },
  ]}
  initialDirection={90}
  onChange={(state) => console.log(state)}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialStops` | `Stop[]` | Default gradient | Initial color stops for the gradient |
| `initialDirection` | `number` | `90` | Initial gradient angle in degrees (0-360) |
| `onChange` | `(state: GradientState) => void` | - | Callback fired when gradient changes |

### CodeDisplay

Display gradient code in different formats with CSS/Tailwind tabs and copy functionality.

```tsx
import { CodeDisplay } from '@zustbio-ui/design-tools';
import { getCssCode, getTailwindCode } from '@zustbio-ui/design-tools';

<CodeDisplay
  cssCode={getCssCode(stops, angle)}
  tailwindCode={getTailwindCode(stops, angle)}
  onCopy={() => console.log('Copied!')}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cssCode` | `string` | - | CSS gradient code to display |
| `tailwindCode` | `string` | - | Tailwind CSS code to display |
| `onCopy` | `() => void` | - | Callback fired when code is copied |

### Utilities

```tsx
import { getCssCode, getTailwindCode } from '@zustbio-ui/design-tools';

// Get CSS gradient code
const cssCode = getCssCode(stops, angle);
// => "background: linear-gradient(90deg, #ff0000 0%, #0000ff 100%);"

// Get Tailwind CSS code
const tailwindCode = getTailwindCode(stops, angle);
// => "bg-[linear-gradient(90deg,#ff0000_0%,#0000ff_100%)]"
```

### Types

```tsx
import type { Stop } from '@zustbio-ui/design-tools';

// Stop type definition
type Stop = {
  id: string;
  color: string;      // Hex color (e.g., "#ff0000")
  position: number;   // Position in percentage (0-100)
  opacity: number;    // Opacity value (0-1)
};

// GradientState returned by onChange
type GradientState = {
  stops: Stop[];
  direction: number;  // Angle in degrees (0-360)
};
```

## License

MIT © Saptyadeep Bhattacharjee

