import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Stop } from '../types';
import { stopsToCssString, hexToRgba, interpolateColorAtPosition, interpolateOpacityAtPosition } from '../helpers';
import styles from './LinearGradientSlider.module.css';

interface LinearGradientSliderProps {
  stops: Stop[];
  selectedStopId?: string;
  onStopPositionChange?: (stopId: string, position: number) => void;
  onAddStop?: (stop: Omit<Stop, 'id'>) => void;
}

const LinearGradientSlider: React.FC<LinearGradientSliderProps> = ({
  stops,
  selectedStopId,
  onStopPositionChange,
  onAddStop,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [draggingStopId, setDraggingStopId] = useState<string | null>(null);
  const dragOccurredRef = useRef<boolean>(false);

  // Calculate gradient CSS string at 0 degrees (left to right)
  const gradientString = `linear-gradient(90deg, ${stopsToCssString(stops)})`;

  // Handle mouse down on a marker to initiate drag
  const handleMarkerMouseDown = useCallback(
    (e: React.MouseEvent, stopId: string) => {
      e.preventDefault();
      e.stopPropagation();
      setDraggingStopId(stopId);
      dragOccurredRef.current = false; // Reset drag flag
    },
    []
  );

  // Handle mouse move during drag
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!draggingStopId || !sliderRef.current || !onStopPositionChange) return;

      dragOccurredRef.current = true; // Mark that dragging occurred
      
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      
      onStopPositionChange(draggingStopId, Math.round(percentage));
    },
    [draggingStopId, onStopPositionChange]
  );

  // Handle mouse up to end drag
  const handleMouseUp = useCallback(() => {
    setDraggingStopId(null);
  }, []);

  // Handle click on bar to add a new stop
  const handleBarClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Don't add stop if we just finished dragging, are currently dragging, or if no callback provided
      if (dragOccurredRef.current || draggingStopId || !onAddStop || !sliderRef.current) {
        // Reset the drag flag for next interaction
        dragOccurredRef.current = false;
        return;
      }

      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const roundedPosition = Math.round(position);

      // Interpolate color and opacity at the clicked position
      const color = interpolateColorAtPosition(stops, roundedPosition);
      const opacity = interpolateOpacityAtPosition(stops, roundedPosition);

      // Call the callback with the new stop data
      onAddStop({
        color,
        position: roundedPosition,
        opacity,
      });
    },
    [draggingStopId, onAddStop, stops]
  );

  // Attach/detach window event listeners when dragging
  useEffect(() => {
    if (draggingStopId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggingStopId, handleMouseMove, handleMouseUp]);

  return (
    <div className={styles.slider}>
      <div
        ref={sliderRef}
        className={styles.bar}
        style={{ background: gradientString }}
        onClick={handleBarClick}
      >
        {stops.map((stop) => {
          const isSelected = stop.id === selectedStopId;
          const isDragging = stop.id === draggingStopId;
          
          return (
            <div
              key={stop.id}
              className={`${styles.marker} ${isSelected ? styles.markerSelected : ''} ${isDragging ? styles.markerDragging : ''}`}
              style={{
                left: `${stop.position}%`,
              }}
              onMouseDown={(e) => handleMarkerMouseDown(e, stop.id)}
            >
              <div
                className={styles.markerColor}
                style={{
                  backgroundColor: hexToRgba(stop.color, stop.opacity),
                }}
              />
              <div className={styles.markerPointer} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LinearGradientSlider;