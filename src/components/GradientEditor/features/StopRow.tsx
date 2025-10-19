import React, { memo } from 'react';
import type { StopRowProps } from '../types';
import { clamp } from '../helpers';

/**
 * Memoized component for rendering a single gradient stop row
 */
const StopRow = memo(({ stop, onUpdate, onRemove, canRemove }: StopRowProps) => {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(stop.id, { color: e.target.value });
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
      onUpdate(stop.id, { color: value });
    }
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = clamp(parseFloat(e.target.value) || 0, 0, 100);
    onUpdate(stop.id, { position: value });
  };

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = clamp(parseFloat(e.target.value) || 0, 0, 1);
    onUpdate(stop.id, { opacity: value });
  };

  return (
    <div className="gradient-editor__stop-row">
      <input
        type="color"
        value={stop.color}
        onChange={handleColorChange}
        className="gradient-editor__color-picker"
        aria-label="Color picker"
      />
      <input
        type="text"
        value={stop.color}
        onChange={handleHexChange}
        className="gradient-editor__hex-input"
        placeholder="#000000"
        aria-label="Hex color value"
      />
      <div className="gradient-editor__input-group">
        <input
          type="number"
          min="0"
          max="100"
          step="1"
          value={stop.position}
          onChange={handlePositionChange}
          className="gradient-editor__number-input"
          aria-label="Stop position"
        />
        <span className="gradient-editor__input-unit">%</span>
      </div>
      <div className="gradient-editor__input-group">
        <input
          type="number"
          min="0"
          max="1"
          step="0.01"
          value={stop.opacity.toFixed(2)}
          onChange={handleOpacityChange}
          className="gradient-editor__number-input"
          aria-label="Stop opacity"
        />
      </div>
      <button
        onClick={() => onRemove(stop.id)}
        disabled={!canRemove}
        className="gradient-editor__stop-remove"
        aria-label="Remove stop"
        title="Remove stop"
      >
        ×
      </button>
    </div>
  );
});

StopRow.displayName = 'StopRow';

export default StopRow;

