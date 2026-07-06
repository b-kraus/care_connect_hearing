import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';

jest.mock('../src/app/components/layout/MainLayout', () => {
  return ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
});

import ActiveAlert from '../src/app/screens/ActiveAlert';

describe('ActiveAlert', () => {
  it('renders the active alert screen', () => {
    render(<ActiveAlert />);

    expect(document.body.textContent).toBeTruthy();
  });

  it('renders buttons', () => {
    render(<ActiveAlert />);

    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toBeGreaterThan(0);
  });

  it('clicks all available buttons', () => {
    render(<ActiveAlert />);

    const buttons = screen.getAllByRole('button');

    buttons.forEach((button) => {
      fireEvent.click(button);
    });

    expect(buttons.length).toBeGreaterThan(0);
  });
});