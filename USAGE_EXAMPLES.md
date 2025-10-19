# Usage Examples for @zustbio-ui/design-tools

This document shows how to use the `@zustbio-ui/design-tools` package in your projects.

## Example 1: Basic Usage

```tsx
// App.tsx
import { GradientEditor } from '@zustbio-ui/design-tools';
import '@zustbio-ui/design-tools/style.css';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Gradient Editor Demo</h1>
      <GradientEditor />
    </div>
  );
}

export default App;
```

## Example 2: With onChange Handler

```tsx
// App.tsx
import { useState } from 'react';
import { GradientEditor } from '@zustbio-ui/design-tools';
import type { Stop } from '@zustbio-ui/design-tools';
import '@zustbio-ui/design-tools/style.css';

interface GradientState {
  stops: Stop[];
  direction: number;
}

function App() {
  const [gradient, setGradient] = useState<GradientState>({
    stops: [],
    direction: 90
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gradient Editor Demo</h1>
      
      <GradientEditor 
        onChange={(state) => {
          console.log('Gradient changed:', state);
          setGradient(state);
        }}
      />
      
      {gradient.stops.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Preview:</h2>
          <div 
            style={{ 
              height: '200px',
              background: `linear-gradient(${gradient.direction}deg, ${
                gradient.stops.map(s => `${s.color} ${s.position}%`).join(', ')
              })`
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
```

## Example 3: Complete App with Code Display

```tsx
// App.tsx
import { useState } from 'react';
import { 
  GradientEditor, 
  CodeDisplay,
  getCssCode,
  getTailwindCode 
} from '@zustbio-ui/design-tools';
import type { Stop } from '@zustbio-ui/design-tools';
import '@zustbio-ui/design-tools/style.css';

interface GradientState {
  stops: Stop[];
  direction: number;
}

function App() {
  const [gradient, setGradient] = useState<GradientState>({
    stops: [],
    direction: 90
  });
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 2000);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <header>
        <h1>Gradient Editor</h1>
        <p>Create beautiful gradients with ease</p>
      </header>

      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        {/* Editor */}
        <div style={{ width: '300px' }}>
          <GradientEditor 
            onChange={(state) => setGradient(state)}
          />
        </div>

        {/* Code Display */}
        {gradient.stops.length > 0 && (
          <div style={{ flex: 1 }}>
            <CodeDisplay
              cssCode={getCssCode(gradient.stops, gradient.direction)}
              tailwindCode={getTailwindCode(gradient.stops, gradient.direction)}
              onCopy={() => showToast('Code copied to clipboard!')}
            />
            
            {/* Preview */}
            <div style={{ marginTop: '20px' }}>
              <h3>Preview:</h3>
              <div 
                style={{ 
                  height: '200px',
                  borderRadius: '8px',
                  background: getCssCode(gradient.stops, gradient.direction)
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Toast notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#333',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '4px'
        }}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;
```

## Example 4: Using Utility Functions Only

```tsx
// MyComponent.tsx
import { getCssCode, getTailwindCode } from '@zustbio-ui/design-tools';
import type { Stop } from '@zustbio-ui/design-tools';

function MyComponent() {
  const stops: Stop[] = [
    { color: '#667eea', position: 0 },
    { color: '#764ba2', position: 100 }
  ];
  const angle = 135;

  const cssGradient = getCssCode(stops, angle);
  const tailwindGradient = getTailwindCode(stops, angle);

  return (
    <div>
      <h2>Purple Gradient</h2>
      
      {/* Use in inline styles */}
      <div style={{ 
        background: cssGradient,
        height: '300px',
        borderRadius: '8px'
      }} />

      {/* Display the code */}
      <div style={{ marginTop: '20px' }}>
        <h3>CSS Code:</h3>
        <code>{cssGradient}</code>
        
        <h3>Tailwind Code:</h3>
        <code>{tailwindGradient}</code>
      </div>
    </div>
  );
}

export default MyComponent;
```

## Example 5: With Initial Values

```tsx
// App.tsx
import { GradientEditor } from '@zustbio-ui/design-tools';
import type { Stop } from '@zustbio-ui/design-tools';
import '@zustbio-ui/design-tools/style.css';

function App() {
  const initialStops: Stop[] = [
    { color: '#ff0080', position: 0 },
    { color: '#ff8c00', position: 50 },
    { color: '#40e0d0', position: 100 }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gradient Editor with Presets</h1>
      
      <GradientEditor 
        initialStops={initialStops}
        initialDirection={45}
        onChange={(state) => console.log('Gradient:', state)}
      />
    </div>
  );
}

export default App;
```

## Example 6: Next.js Usage

```tsx
// app/page.tsx
'use client';

import { useState } from 'react';
import { GradientEditor } from '@zustbio-ui/design-tools';
import '@zustbio-ui/design-tools/style.css';

export default function Home() {
  const [gradient, setGradient] = useState({ stops: [], direction: 90 });

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Next.js + Gradient Editor</h1>
      <GradientEditor onChange={setGradient} />
    </main>
  );
}
```

## Example 7: Vite + React

```tsx
// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@zustbio-ui/design-tools/style.css'; // Import styles here

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```tsx
// App.tsx
import { GradientEditor } from '@zustbio-ui/design-tools';

function App() {
  return (
    <div className="app">
      <GradientEditor />
    </div>
  );
}

export default App;
```

## TypeScript Types

```tsx
import type { Stop, GradientState } from '@zustbio-ui/design-tools';

// Stop type
const stop: Stop = {
  color: '#ff0000',  // hex color string
  position: 50        // 0-100
};

// GradientState type
const state: GradientState = {
  stops: [
    { color: '#ff0000', position: 0 },
    { color: '#0000ff', position: 100 }
  ],
  direction: 90  // angle in degrees
};
```

## Installation

```bash
npm install @zustbio-ui/design-tools
# or
yarn add @zustbio-ui/design-tools
# or
pnpm add @zustbio-ui/design-tools
```

## Important Notes

1. **Always import the CSS file** - The component needs its styles to work properly
2. **TypeScript support** - Full TypeScript definitions included
3. **Tree-shakeable** - Only import what you need
4. **React 18+** - Compatible with React 18 and React 19

