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

