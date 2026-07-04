import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../src/app/components/layout/MainLayout', () => {
  return ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
});

jest.mock('lucide-react', () => new Proxy({}, {
  get: (_target, name) => {
    return () => <span>{String(name)}</span>;
  }
}));

import Home from '../src/app/screens/Home';
import Emergency from '../src/app/screens/Emergency';

describe('Home', () => {
  it('renders welcome', () => {
    const { getByText } = render(<Home />);
    expect(getByText(/Welcome/)).toBeTruthy();
  });
  it('renders back', () => {
    const { getByText } = render(<Home />);
    expect(getByText(/Back/)).toBeTruthy();
  });
  it('renders alert card', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Active Alert')).toBeTruthy();
  });
});

describe('Emergency', () => {
  it('renders', () => {
    const { getByText } = render(<Emergency onClose={jest.fn()} />);
    expect(getByText('Send Emergency Alert?')).toBeTruthy();
  });
  it('has cancel', () => {
    const { getByText } = render(<Emergency onClose={jest.fn()} />);
    expect(getByText(/Cancel/)).toBeTruthy();
  });
});
