import { LinesProperties } from './types/lines';
import { RoadCrosProperties } from './types/roadCros';
import { SemaphoreProperties } from './types/semaphores';

export const isSemaphoreProperties = (
  properties: SemaphoreProperties | RoadCrosProperties | LinesProperties,
): properties is SemaphoreProperties => {
  return 'vertical_order' in properties;
};

export const isLinesProperties = (
  properties: SemaphoreProperties | RoadCrosProperties | LinesProperties,
): properties is LinesProperties => {
  return 'km_end' in properties;
};

export const isRoadCrosProperties = (
  properties: SemaphoreProperties | RoadCrosProperties | LinesProperties,
): properties is RoadCrosProperties => {
  return 'k_s025_1' in properties;
};
