import React, { useReducer, useEffect, useCallback, useState } from 'react';
import type { GradientEditorProps, Stop } from './types';
import { defaultStops, gradientReducer, stopsToCssString, generateId } from './helpers';
import StopRow from './features/StopRow';
import LinearGradientSlider from './features/LinearGradientSlider';
import './GradientEditor.css';

/**
 * GradientEditor - A comprehensive linear gradient editor component
 * @param props - Component props
 * @returns React component
 */
const GradientEditor = ({
  initialStops = defaultStops,
  initialDirection = 90,
  onChange,
}: GradientEditorProps) => {
  const [state, dispatch] = useReducer(gradientReducer, {
    stops: initialStops,
    direction: initialDirection,
  });
  const [selectedStopId, setSelectedStopId] = useState<string | undefined>(undefined);

  // Update state when preset is loaded
  useEffect(() => {
    if (initialStops) {
      dispatch({ type: 'SET_STOPS', stops: initialStops });
    }
    if (initialDirection !== undefined) {
      dispatch({ type: 'SET_DIRECTION', direction: initialDirection });
    }
  }, [initialStops, initialDirection]);

  useEffect(() => {
    onChange?.(state);
  }, [state, onChange]);

  const handleUpdateStop = useCallback(
    (id: string, updates: Partial<Omit<Stop, 'id'>>) => {
      dispatch({ type: 'UPDATE_STOP', id, updates });
    },
    []
  );

  const handleRemoveStop = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_STOP', id });
  }, []);

  const handleAddStop = () => {
    dispatch({ type: 'ADD_STOP' });
  };

  const handleSliderAddStop = useCallback((stop: Omit<Stop, 'id'>) => {
    const newStop: Stop = {
      id: generateId(),
      ...stop
    };
    dispatch({ type: 'SET_STOPS', stops: [...state.stops, newStop] });
    setSelectedStopId(newStop.id);
  }, [state.stops]);

  const handleSliderPositionChange = useCallback((stopId: string, position: number) => {
    dispatch({ type: 'UPDATE_STOP', id: stopId, updates: { position } });
  }, []);

  const handleDirectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    dispatch({ type: 'SET_DIRECTION', direction: value });
  };


  const gradientStyle = {
    background: `linear-gradient(${state.direction}deg, ${stopsToCssString(
      state.stops
    )})`,
  };

  return (
    <div className="gradient-editor">
        <div className="gradient-editor__preview" style={gradientStyle} role="img" aria-label="Gradient preview" />

        <LinearGradientSlider
          stops={state.stops}
          selectedStopId={selectedStopId}
          onStopPositionChange={handleSliderPositionChange}
          onAddStop={handleSliderAddStop}
        />

        <div className="gradient-editor__direction">
          <label className="gradient-editor__direction-label">
            Angle
          </label>
          <div className="gradient-editor__direction-inputs">
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={state.direction}
              onChange={handleDirectionChange}
              className="gradient-editor__direction-slider"
              aria-label="Gradient direction"
            />
            <div className="gradient-editor__direction-value">
              <input
                type="number"
                min="0"
                max="360"
                value={state.direction}
                onChange={handleDirectionChange}
                className="gradient-editor__direction-input"
                aria-label="Gradient direction in degrees"
              />
              <span className="gradient-editor__direction-unit">°</span>
            </div>
          </div>
        </div>

        <div className="gradient-editor__stops">
          <div className="gradient-editor__stops-header">
            <span className="gradient-editor__stops-title">Color Stops</span>
            <button
              onClick={handleAddStop}
              className="gradient-editor__add-stop"
              aria-label="Add color stop"
              title="Add color stop"
            >
              +
            </button>
          </div>
          {state.stops.map((stop) => (
            <StopRow
              key={stop.id}
              stop={stop}
              onUpdate={handleUpdateStop}
              onRemove={handleRemoveStop}
              canRemove={state.stops.length > 2}
            />
          ))}
        </div>
      </div>
  );
};

export default GradientEditor;

