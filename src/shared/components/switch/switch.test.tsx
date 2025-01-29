import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/shared/lib/testing';

import { Case, Default, Switch } from '.';

describe('Switch Component', () => {
  it('should render only first matching case', async () => {
    renderWithProviders(
      <Switch>
        <Case condition={true}>1</Case>
        <Case condition={true}>2</Case>
        <Default>default</Default>
      </Switch>,
    );

    const case1 = screen.queryByText('1');
    const case2 = screen.queryByText('2');

    expect(case1).toBeInTheDocument();
    expect(case2).not.toBeInTheDocument();
  });

  it('should render matching case', async () => {
    renderWithProviders(
      <Switch>
        <Case condition={false}>1</Case>
        <Case condition={true}>2</Case>
        <Default>default</Default>
      </Switch>,
    );

    const case1 = screen.queryByText('1');
    const case2 = screen.queryByText('2');

    expect(case1).not.toBeInTheDocument();
    expect(case2).toBeInTheDocument();
  });

  it('should render default case if there is no matching case', async () => {
    renderWithProviders(
      <Switch>
        <Case condition={false}>1</Case>
        <Case condition={false}>2</Case>
        <Default>default</Default>
      </Switch>,
    );

    const case1 = screen.queryByText('1');
    const case2 = screen.queryByText('2');
    const defaultCase = screen.queryByText('default');

    expect(case1).not.toBeInTheDocument();
    expect(case2).not.toBeInTheDocument();
    expect(defaultCase).toBeInTheDocument();
  });

  it('should render nothing if there is no matching case and no default case', async () => {
    renderWithProviders(
      <Switch>
        <Case condition={false}>1</Case>
        <Case condition={false}>2</Case>
      </Switch>,
    );

    const case1 = screen.queryByText('1');
    const case2 = screen.queryByText('2');

    expect(case1).not.toBeInTheDocument();
    expect(case2).not.toBeInTheDocument();
  });
});
