import { Lines } from '../types/lines';
import { RoadCros } from '../types/roadCros';
import { Semaphores } from '../types/semaphores';
import linesData from './line.json';
import roadCrosData from './road_cros.json';
import semaphoresData from './semaphores.json';

export const semaphores = semaphoresData as Semaphores;
export const lines = linesData as Lines;
export const roadCros = roadCrosData as RoadCros;
