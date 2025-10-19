import React, { useState } from 'react';
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

    // const handleStopPositionChange = (stopId: string, position: number) => {
    //   // Update the gradient state with new position
    //   setGradientState(prev => ({
    //     ...prev,
    //     stops: prev.stops.map(stop => 
    //       stop.id === stopId ? { ...stop, position } : stop
    //     )
    //   }));
    // };

    // const handleStopAdd = (position: number) => {
    //   // Calculate the color at the clicked position by interpolating between stops
    //   const sortedStops = [...gradientState.stops].sort((a, b) => a.position - b.position);
      
    //   let interpolatedColor = '#808080';
    //   for (let i = 0; i < sortedStops.length - 1; i++) {
    //     if (position >= sortedStops[i].position && position <= sortedStops[i + 1].position) {
    //       // Simple interpolation - just pick the closer color
    //       const distToLeft = position - sortedStops[i].position;
    //       const distToRight = sortedStops[i + 1].position - position;
    //       interpolatedColor = distToLeft < distToRight ? sortedStops[i].color : sortedStops[i + 1].color;
    //       break;
    //     }
    //   }

    //   const newStop: Stop = {
    //     id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    //     color: interpolatedColor,
    //     position,
    //     opacity: 1,
    //   };

    //   setGradientState(prev => ({
    //     ...prev,
    //     stops: [...prev.stops, newStop]
    //   }));
      
    //   // Auto-select the newly added stop
    //   setSelectedStopId(newStop.id);
    // };

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
                
                {/* {gradientState.stops.length > 0 && (
                  <div style={{ marginTop: '20px' }}>
                    <LinearGradientSlider 
                      stops={gradientState.stops}
                      selectedStopId={selectedStopId}
                      onStopSelect={setSelectedStopId}
                      onStopPositionChange={handleStopPositionChange}
                      onStopAdd={handleStopAdd}
                    />
                  </div>
                )} */}
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