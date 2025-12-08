import React, { useState } from 'react';
import GradientEditor from './components/GradientEditor';
import CodeDisplay from './components/GradientEditor/features/CodeDisplay';
import { GradientState } from './components/GradientEditor/types';
import { getCssCode, getTailwindCode } from './components/GradientEditor/codeGenerators';

export default function App() {
    const [gradientState, setGradientState] = useState<GradientState>({
      stops: [],
      direction: 90
    });

    return (
        <div className="app-root">
            <header className="app-header">
                <h1>Vite + React + TypeScript + CSS</h1>
                <p className="subtitle">A tiny starter app — edit <code>src/App.tsx</code> to begin.</p>
            </header>
            <main className="app-main">
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ width: '300px', flexShrink: 0 }}>
                <GradientEditor
                  onChange={(state) => {
                    console.log('Gradient updated:', state);
                    setGradientState(state);
                  }}
                />
              </div>
              {gradientState.stops.length > 0 && (
                <div style={{ flex: 1 }}>
                  <CodeDisplay
                    cssCode={getCssCode(gradientState.stops, gradientState.direction)}
                    tailwindCode={getTailwindCode(gradientState.stops, gradientState.direction)}
                    onCopy={() => console.log('Code copied!')}
                  />
                </div>
              )}
            </div>
            </main>
            <footer className="app-footer">
                <small>Built with ❤️ and Vite</small>
            </footer>
        </div>
    )
}