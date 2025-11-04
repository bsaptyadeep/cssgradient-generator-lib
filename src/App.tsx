import React, { useState, useCallback } from 'react';
import GradientEditor from './components/GradientEditor';
import CodeDisplay from './components/GradientEditor/features/CodeDisplay';
import { Stop, GradientState } from './components/GradientEditor/types';
import { getCssCode, getTailwindCode } from './components/GradientEditor/codeGenerators';
import LinearGradientSlider from './components/GradientEditor/features/LinearGradientSlider';

export default function App() {
    const [presetStops, setPresetStops] = useState<Stop[] | undefined>(undefined);
    const [presetDirection, setPresetDirection] = useState<number | undefined>(undefined);
    const [gradientState, setGradientState] = useState<GradientState>({
      stops: [],
      direction: 90
    });
    const [selectedStopId, setSelectedStopId] = useState<string | undefined>(undefined);

    const handleStopPositionChange = useCallback((stopId: string, position: number) => {
      setGradientState(prev => {
        const updatedStops = prev.stops.map(stop => 
          stop.id === stopId ? { ...stop, position } : stop
        );
        setPresetStops(updatedStops);
        return {
          ...prev,
          stops: updatedStops
        };
      });
    }, []);

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
                  initialStops={presetStops}
                  initialDirection={presetDirection}
                  onChange={(state) => {
                    console.log('Gradient updated:', state);
                    setGradientState(state);
                  }}
                />
                
                {gradientState.stops.length > 0 && (
                  <div style={{ marginTop: '20px' }}>
                    <LinearGradientSlider 
                      stops={gradientState.stops}
                      selectedStopId={selectedStopId}
                      onStopPositionChange={handleStopPositionChange}
                    />
                  </div>
                )}
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