import React, { useRef, useState, useCallback } from 'react';
import { Stop } from '../types';
import { stopsToCssString, clamp, hexToRgba } from '../helpers';

interface LinearGradientSliderProps {
  stops: Stop[];
  selectedStopId?: string;
  onStopSelect?: (stopId: string) => void;
  onStopPositionChange?: (stopId: string, position: number) => void;
  onStopAdd?: (position: number) => void;
}

const LinearGradientSlider: React.FC<LinearGradientSliderProps> = ({
  stops,
  selectedStopId,
  onStopSelect,
  onStopPositionChange,
  onStopAdd,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [draggingStopId, setDraggingStopId] = useState<string | null>(null);

  // Calculate gradient CSS string
  const gradientString = `linear-gradient(90deg, ${stopsToCssString(stops)})`;

  // Handle mouse down on a stop marker
  const handleMarkerMouseDown = useCallback(
    (e: React.MouseEvent, stopId: string) => {
      e.preventDefault();
      e.stopPropagation();
      setDraggingStopId(stopId);
      onStopSelect?.(stopId);
    },
    [onStopSelect]
  );

  // Handle mouse move (dragging)
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!draggingStopId || !sliderRef.current || !onStopPositionChange) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = clamp((x / rect.width) * 100, 0, 100);
      
      onStopPositionChange(draggingStopId, Math.round(percentage));
    },
    [draggingStopId, onStopPositionChange]
  );

  // Handle mouse up (stop dragging)
  const handleMouseUp = useCallback(() => {
    setDraggingStopId(null);
  }, []);

  // Add event listeners for dragging
  React.useEffect(() => {
    if (draggingStopId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggingStopId, handleMouseMove, handleMouseUp]);

  // Handle click on gradient bar to add new stop
  const handleBarClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!sliderRef.current || !onStopAdd) return;
      
      // Don't add if clicked on a marker
      if ((e.target as HTMLElement).classList.contains('gradient-slider__marker')) {
        return;
      }

      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = clamp((x / rect.width) * 100, 0, 100);
      
      onStopAdd(Math.round(percentage));
    },
    [onStopAdd]
  );

  return (
    <div className="gradient-slider">
      <div
        ref={sliderRef}
        className="gradient-slider__bar"
        style={{ background: gradientString }}
        onClick={handleBarClick}
      >
        {stops.map((stop) => {
          const isSelected = stop.id === selectedStopId;
          const isDragging = stop.id === draggingStopId;
          
          return (
            <div
              key={stop.id}
              className={`gradient-slider__marker ${isSelected ? 'gradient-slider__marker--selected' : ''} ${isDragging ? 'gradient-slider__marker--dragging' : ''}`}
              style={{
                left: `${stop.position}%`,
              }}
              onMouseDown={(e) => handleMarkerMouseDown(e, stop.id)}
              onClick={(e) => {
                e.stopPropagation();
                onStopSelect?.(stop.id);
              }}
            >
              <div
                className="gradient-slider__marker-color"
                style={{
                  backgroundColor: hexToRgba(stop.color, stop.opacity),
                }}
              />
              <div className="gradient-slider__marker-pointer" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LinearGradientSlider;