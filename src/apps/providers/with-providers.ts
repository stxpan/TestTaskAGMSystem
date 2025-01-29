import compose from 'compose-function';

import { withBalancer } from './with-balancer';
import { withEffector } from './with-effector';
import { withFresnel } from './with-fresnel';
import { withTheme } from './with-theme';

export const withProviders = compose(withEffector, withTheme, withFresnel, withBalancer);
