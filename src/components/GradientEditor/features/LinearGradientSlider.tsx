import React from 'react';
import { Stop } from '../types';
import { stopsToCssString, hexToRgba } from '../helpers';

interface LinearGradientSliderProps {
  stops: Stop[];
  selectedStopId?: string;
}

const LinearGradientSlider: React.FC<LinearGradientSliderProps> = ({
  stops,
  selectedStopId,
}) => {
  // Calculate gradient CSS string at 0 degrees (left to right)
  const gradientString = `linear-gradient(90deg, ${stopsToCssString(stops)})`;

  return (
    <div className="gradient-slider">
      <div
        className="gradient-slider__bar"
        style={{ background: gradientString }}
      >
        {stops.map((stop) => {
          const isSelected = stop.id === selectedStopId;
          
          return (
            <div
              key={stop.id}
              className={`gradient-slider__marker ${isSelected ? 'gradient-slider__marker--selected' : ''}`}
              style={{
                left: `${stop.position}%`,
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