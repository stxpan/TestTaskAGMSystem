import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider as EffectorProvider } from 'effector-react';

export const renderWithProviders = (ui: React.ReactNode, scope?: Scope): RenderResult =>
  render(<EffectorProvider value={scope ?? fork({})}>{ui}</EffectorProvider>);
