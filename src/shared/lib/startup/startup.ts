import { createEvent } from 'effector';
import { once } from 'patronum';

import { setup } from '../effector/router/model';
import { logger } from '../logger';

/**
 * This Event will be used to trigger the start of the app.
 */
export const appStarted = createEvent();

/**
 * This event will be used to trigger the start of the app in browser. Mostly used to work with browser api.
 */
export const clientStarted = once(setup.map(() => {}));

appStarted.watch(() => logger.debug('App started'));
clientStarted.watch(() => logger.debug('App started in browser'));
