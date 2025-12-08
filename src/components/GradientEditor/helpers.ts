import type { Stop, Action, GradientState } from './types';

/**
 * Converts a hex color and alpha value to rgba string
 * @param hex - Hex color code (e.g., "#ff0000")
 * @param alpha - Opacity value between 0 and 1
 * @returns RGBA color string
 */
export const hexToRgba = (hex: string, alpha: number): string => {
  const cleaned = hex.replace('#', '');
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Converts stops array to CSS gradient string
 * @param stops - Array of gradient stops
 * @returns CSS color stops string
 */
export const stopsToCssString = (stops: Stop[]): string => {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  return sorted
    .map((stop) => `${hexToRgba(stop.color, stop.opacity)} ${stop.position}%`)
    .join(', ');
};

/**
 * Clamps a number between min and max values
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Generates a unique ID for stops
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Finds the midpoint for a new stop
 */
export const findMidpoint = (stops: Stop[]): number => {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  if (sorted.length === 0) return 50;
  if (sorted.length === 1) return sorted[0].position < 50 ? 75 : 25;
  
  let maxGap = 0;
  let midpoint = 50;
  
  for (let i = 0; i < sorted.length - 1; i++) {
    const gap = sorted[i + 1].position - sorted[i].position;
    if (gap > maxGap) {
      maxGap = gap;
      midpoint = sorted[i].position + gap / 2;
    }
  }
  
  return Math.round(midpoint);
};

export const defaultStops: Stop[] = [
  { id: '1', color: '#ff0000', position: 0, opacity: 1 },
  { id: '2', color: '#0000ff', position: 100, opacity: 1 },
];

/**
 * Interpolates color at a specific position between gradient stops
 * @param stops - Array of gradient stops
 * @param position - Position percentage (0-100) where color should be interpolated
 * @returns Interpolated hex color string
 */
export const interpolateColorAtPosition = (stops: Stop[], position: number): string => {
  if (stops.length === 0) return '#808080';
  
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  
  // If position is before or at first stop
  if (position <= sorted[0].position) {
    return sorted[0].color;
  }
  
  // If position is after or at last stop
  if (position >= sorted[sorted.length - 1].position) {
    return sorted[sorted.length - 1].color;
  }
  
  // Find the two stops that bracket the position
  let leftStop = sorted[0];
  let rightStop = sorted[sorted.length - 1];
  
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i].position <= position && sorted[i + 1].position >= position) {
      leftStop = sorted[i];
      rightStop = sorted[i + 1];
      break;
    }
  }
  
  // Calculate interpolation factor
  const range = rightStop.position - leftStop.position;
  const factor = range === 0 ? 0 : (position - leftStop.position) / range;
  
  // Parse hex colors to RGB
  const leftRgb = {
    r: parseInt(leftStop.color.substring(1, 3), 16),
    g: parseInt(leftStop.color.substring(3, 5), 16),
    b: parseInt(leftStop.color.substring(5, 7), 16),
  };
  
  const rightRgb = {
    r: parseInt(rightStop.color.substring(1, 3), 16),
    g: parseInt(rightStop.color.substring(3, 5), 16),
    b: parseInt(rightStop.color.substring(5, 7), 16),
  };
  
  // Interpolate RGB values
  const r = Math.round(leftRgb.r + (rightRgb.r - leftRgb.r) * factor);
  const g = Math.round(leftRgb.g + (rightRgb.g - leftRgb.g) * factor);
  const b = Math.round(leftRgb.b + (rightRgb.b - leftRgb.b) * factor);
  
  // Convert back to hex
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Interpolates opacity at a specific position between gradient stops
 * @param stops - Array of gradient stops
 * @param position - Position percentage (0-100) where opacity should be interpolated
 * @returns Interpolated opacity value (0-1)
 */
export const interpolateOpacityAtPosition = (stops: Stop[], position: number): number => {
  if (stops.length === 0) return 1;
  
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  
  // If position is before or at first stop
  if (position <= sorted[0].position) {
    return sorted[0].opacity;
  }
  
  // If position is after or at last stop
  if (position >= sorted[sorted.length - 1].position) {
    return sorted[sorted.length - 1].opacity;
  }
  
  // Find the two stops that bracket the position
  let leftStop = sorted[0];
  let rightStop = sorted[sorted.length - 1];
  
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i].position <= position && sorted[i + 1].position >= position) {
      leftStop = sorted[i];
      rightStop = sorted[i + 1];
      break;
    }
  }
  
  // Calculate interpolation factor
  const range = rightStop.position - leftStop.position;
  const factor = range === 0 ? 0 : (position - leftStop.position) / range;
  
  // Interpolate opacity
  return leftStop.opacity + (rightStop.opacity - leftStop.opacity) * factor;
};

export const gradientReducer = (state: GradientState, action: Action): GradientState => {
  switch (action.type) {
    case 'ADD_STOP': {
      const midpoint = findMidpoint(state.stops);
      const newStop: Stop = {
        id: generateId(),
        color: '#808080',
        position: midpoint,
        opacity: 1,
      };
      return { ...state, stops: [...state.stops, newStop] };
    }
    case 'REMOVE_STOP': {
      if (state.stops.length <= 2) return state;
      return {
        ...state,
        stops: state.stops.filter((stop) => stop.id !== action.id),
      };
    }
    case 'UPDATE_STOP': {
      return {
        ...state,
        stops: state.stops.map((stop) =>
          stop.id === action.id ? { ...stop, ...action.updates } : stop
        ),
      };
    }
    case 'SET_DIRECTION': {
      return { ...state, direction: clamp(action.direction, 0, 360) };
    }
    case 'SET_STOPS': {
      return { ...state, stops: action.stops };
    }
    default:
      return state;
  }
};

