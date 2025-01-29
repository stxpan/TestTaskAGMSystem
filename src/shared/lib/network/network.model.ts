import { trackNetworkStatus } from '@withease/web-api';

import { clientStarted } from '../startup';

export const { online, offline, $online, $offline } = trackNetworkStatus({
  setup: clientStarted,
});
