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

import Logs from '../src/app/screens/Logs';
import ReadMessage from '../src/app/screens/ReadMessage';
import Recording from '../src/app/screens/Recording';

describe('Logs', () => {
  it('renders', () => {
    const { container } = render(<Logs onNavigate={jest.fn()} onEmergency={jest.fn()} />);
    expect(container).toBeTruthy();
  });
  it('has content', () => {
    const { getAllByText } = render(<Logs onNavigate={jest.fn()} onEmergency={jest.fn()} />);
    expect(getAllByText(/Alert/).length).toBeGreaterThan(0);
  });
});

describe('ReadMessage', () => {
  it('renders', () => {
    const { container } = render(<ReadMessage onNavigate={jest.fn()} />);
    expect(container).toBeTruthy();
  });
  it('has content', () => {
    const { getAllByText } = render(<ReadMessage onNavigate={jest.fn()} />);
    expect(getAllByText(/Message/).length).toBeGreaterThan(0);
  });
});

describe('Recording', () => {
  it('renders', () => {
    const { container } = render(<Recording onNavigate={jest.fn()} />);
    expect(container).toBeTruthy();
  });
  it('has content', () => {
    const { getAllByText } = render(<Recording onNavigate={jest.fn()} />);
    expect(getAllByText(/Record/).length).toBeGreaterThan(0);
  });
});
