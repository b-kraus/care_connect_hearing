import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../src/app/components/layout/MainLayout', () => {
  return ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
});

import Settings from '../src/app/screens/Settings';
import ActiveAlert from '../src/app/screens/ActiveAlert';

describe('Settings', () => {
  it('renders title', () => {
    const { getByText } = render(<Settings />);
    expect(getByText('Settings')).toBeTruthy();
  });
  it('renders flash speed', () => {
    const { getByText } = render(<Settings />);
    expect(getByText('Flash Speed')).toBeTruthy();
  });
  it('renders text size', () => {
    const { getByText } = render(<Settings />);
    expect(getByText('Text Size')).toBeTruthy();
  });
  it('renders high contrast', () => {
    const { getByText } = render(<Settings />);
    expect(getByText('High Contrast')).toBeTruthy();
  });
  it('renders save button', () => {
    const { getByText } = render(<Settings />);
    expect(getByText('Save Changes')).toBeTruthy();
  });
  it('has flash slider', () => {
    const { getByLabelText } = render(<Settings />);
    expect(getByLabelText('Flash speed')).toBeTruthy();
  });
  it('has contrast checkbox', () => {
    const { getByLabelText } = render(<Settings />);
    expect(getByLabelText('Toggle high contrast')).toBeTruthy();
  });
});

describe('ActiveAlert', () => {
  it('renders title', () => {
    const { getByText } = render(<ActiveAlert />);
    expect(getByText('Active Alert')).toBeTruthy();
  });
  it('renders alert name', () => {
    const { getByText } = render(<ActiveAlert />);
    expect(getByText('Take blue pill')).toBeTruthy();
  });
  it('renders confirm', () => {
    const { getByText } = render(<ActiveAlert />);
    expect(getByText('CONFIRM')).toBeTruthy();
  });
  it('has WCAG note', () => {
    const { getByText } = render(<Settings />);
    expect(getByText(/WCAG 2.3.1/)).toBeTruthy();
  });
});
