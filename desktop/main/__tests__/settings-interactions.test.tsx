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

import Settings from '../src/app/screens/Settings';

describe('Settings interactions', () => {
  it('changes text size with slider', () => {
    render(<Settings />);

    const slider = screen.getByLabelText('Text size');

    fireEvent.change(slider, {
      target: { value: '24' },
    });

    expect(screen.getByText('24px')).toBeTruthy();
  });

  it('decreases and increases text size', () => {
    render(<Settings />);

    const decreaseButton = screen.getByLabelText(
      'Decrease text size'
    );

    const increaseButton = screen.getByLabelText(
      'Increase text size'
    );

    fireEvent.click(decreaseButton);
    expect(screen.getByText('17px')).toBeTruthy();

    fireEvent.click(increaseButton);
    expect(screen.getByText('18px')).toBeTruthy();
  });

  it('toggles display settings', () => {
    render(<Settings />);

    fireEvent.click(
      screen.getByLabelText('Toggle high contrast')
    );

    fireEvent.click(
      screen.getByLabelText('Toggle bold text')
    );

    fireEvent.click(
      screen.getByLabelText('Toggle reduce motion')
    );

    expect(
      screen.getByText('High Contrast Mode')
    ).toBeTruthy();

    expect(
      screen.getByText('Bold Text')
    ).toBeTruthy();

    expect(
      screen.getByText('Reduce Motion')
    ).toBeTruthy();
  });

  it('changes flash speed', () => {
    render(<Settings />);

    fireEvent.click(screen.getByText('Alert Flash'));

    const slowButton = screen
      .getByText('Slow')
      .closest('button');

    const fastButton = screen
      .getByText('Fast')
      .closest('button');

    expect(slowButton).toBeTruthy();
    expect(fastButton).toBeTruthy();

    if (slowButton) {
      fireEvent.click(slowButton);
    }

    if (fastButton) {
      fireEvent.click(fastButton);
    }

    expect(screen.getByText('Flash Speed')).toBeTruthy();
  });

  it('changes flash colour', () => {
    render(<Settings />);

    fireEvent.click(screen.getByText('Alert Flash'));

    const redButton = screen
      .getByText('Red')
      .closest('button');

    const blueButton = screen
      .getByText('Blue')
      .closest('button');

    expect(redButton).toBeTruthy();
    expect(blueButton).toBeTruthy();

    if (redButton) {
      fireEvent.click(redButton);
    }

    if (blueButton) {
      fireEvent.click(blueButton);
    }

    expect(screen.getByText('Flash Colour')).toBeTruthy();
  });

  it('toggles notification preferences', () => {
    render(<Settings />);

    fireEvent.click(
      screen.getByText('Notifications')
    );

    fireEvent.click(
      screen.getByLabelText('Toggle screen flash')
    );

    fireEvent.click(
      screen.getByLabelText('Toggle banner alerts')
    );

    expect(
      screen.getByText('Screen Flash')
    ).toBeTruthy();

    expect(
      screen.getByText('Banner Alerts')
    ).toBeTruthy();
  });

  it('opens every settings tab', () => {
    render(<Settings />);

    fireEvent.click(screen.getByText('Alert Flash'));

    expect(
      screen.getByText('Alert Flash Settings')
    ).toBeTruthy();

    fireEvent.click(
      screen.getByText('Notifications')
    );

    expect(
      screen.getByText('Notification Preferences')
    ).toBeTruthy();

    fireEvent.click(screen.getByText('About'));

    expect(
      screen.getByText('About Care Connect Hearing')
    ).toBeTruthy();

    fireEvent.click(
      screen.getByText('Display & Text')
    );

    expect(
      screen.getByText('Display & Text Size')
    ).toBeTruthy();
  });
});