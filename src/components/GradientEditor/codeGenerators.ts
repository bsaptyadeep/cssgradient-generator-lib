import type { Stop } from './types';
import { stopsToCssString } from './helpers';

/**
 * Generates CSS code for a linear gradient
 * @param stops - Array of gradient stops
 * @param direction - Gradient angle in degrees (0-360)
 * @returns CSS background property string
 */
export const getCssCode = (stops: Stop[], direction: number): string => {
  return `background: linear-gradient(${direction}deg, ${stopsToCssString(stops)});`;
};

/**
 * Generates Tailwind CSS code for a linear gradient
 * @param stops - Array of gradient stops
 * @param direction - Gradient angle in degrees (0-360)
 * @returns Tailwind arbitrary value class string
 */
export const getTailwindCode = (stops: Stop[], direction: number): string => {
  return `bg-[linear-gradient(${direction}deg,${stopsToCssString(stops).replace(/ /g, '')})]`;
};

