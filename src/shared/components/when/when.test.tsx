import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/shared/lib/testing';

import { When } from '.';

describe('When Component', () => {
  it('should render children when condition is truthy', async () => {
    renderWithProviders(<When condition={true}>1</When>);

    const case1 = screen.queryByText('1');

    expect(case1).toBeInTheDocument();
  });

  it('should not render children when condition is falsy', async () => {
    renderWithProviders(<When condition={false}>1</When>);

    const case1 = screen.queryByText('1');

    expect(case1).not.toBeInTheDocument();
  });
});
