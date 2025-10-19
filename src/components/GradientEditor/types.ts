/**
 * Represents a color stop in the gradient
 */
export type Stop = {
  id: string;
  color: string;
  position: number;
  opacity: number;
};

/**
 * Reducer action types for gradient state management
 */
export type Action =
  | { type: 'ADD_STOP' }
  | { type: 'REMOVE_STOP'; id: string }
  | { type: 'UPDATE_STOP'; id: string; updates: Partial<Omit<Stop, 'id'>> }
  | { type: 'SET_DIRECTION'; direction: number }
  | { type: 'SET_STOPS'; stops: Stop[] };

export type GradientState = {
  stops: Stop[];
  direction: number;
};

export type GradientEditorProps = {
  initialStops?: Stop[];
  initialDirection?: number;
  onChange?: (state: { stops: Stop[]; direction: number }) => void;
};

export type StopRowProps = {
  stop: Stop;
  onUpdate: (id: string, updates: Partial<Omit<Stop, 'id'>>) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
};

