import React from 'react';
import { render, fireEvent } from '@testing-library/react';

jest.mock('../src/app/components/layout/MainLayout', () => {
  return ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
});

import Settings from '../src/app/screens/Settings';

describe('Settings', () => {
  it('renders title', () => {
    const { getByText } = render(<Settings />);
    expect(getByText('Settings')).toBeTruthy();
  });

  it('renders display text controls by default', () => {
    const { getByText, getByLabelText } = render(<Settings />);
    expect(getByText('Text Size')).toBeTruthy();
    expect(getByText('High Contrast Mode')).toBeTruthy();
    expect(getByLabelText('Text size')).toBeTruthy();
    expect(getByLabelText('Toggle high contrast')).toBeTruthy();
  });

  it('opens alert flash tab', () => {
    const { getByText } = render(<Settings />);
    fireEvent.click(getByText('Alert Flash'));

    expect(getByText('Flash Speed')).toBeTruthy();
    expect(getByText(/WCAG 2.3.1/)).toBeTruthy();
  });

  it('opens notifications tab', () => {
    const { getByText } = render(<Settings />);
    fireEvent.click(getByText('Notifications'));

    expect(getByText('Notification Preferences')).toBeTruthy();
    expect(getByText('Screen Flash')).toBeTruthy();
    expect(getByText('Banner Alerts')).toBeTruthy();
  });

  it('opens about tab', () => {
    const { getByText } = render(<Settings />);
    fireEvent.click(getByText('About'));

    expect(getByText('About Care Connect Hearing')).toBeTruthy();
    expect(getByText(/Version 2.4.1/)).toBeTruthy();
  });
});