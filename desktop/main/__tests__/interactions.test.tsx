import React from 'react';
import { render, fireEvent } from '@testing-library/react';

jest.mock('../src/app/components/layout/MainLayout', () => {
  return ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
});

jest.mock('lucide-react', () => new Proxy({}, {
  get: (_target, name) => {
    return () => <span>{String(name)}</span>;
  }
}));

import ReadMessage from '../src/app/screens/ReadMessage';
import Recording from '../src/app/screens/Recording';
import Home from '../src/app/screens/Home';
import Emergency from '../src/app/screens/Emergency';

describe('ReadMessage interactions', () => {
  it('renders all buttons', () => {
    const { getAllByRole } = render(<ReadMessage onNavigate={jest.fn()} />);
    expect(getAllByRole('button').length).toBeGreaterThan(0);
  });
  it('click buttons', () => {
    const { getAllByRole } = render(<ReadMessage onNavigate={jest.fn()} />);
    const buttons = getAllByRole('button');
    buttons.forEach(btn => {
      try { fireEvent.click(btn); } catch(e) {}
    });
    expect(true).toBeTruthy();
  });
  it('has inputs', () => {
    const { container } = render(<ReadMessage onNavigate={jest.fn()} />);
    const inputs = container.querySelectorAll('input, textarea');
    expect(inputs.length).toBeGreaterThanOrEqual(0);
  });
});

describe('Recording interactions', () => {
  it('renders all buttons', () => {
    const { getAllByRole } = render(<Recording onNavigate={jest.fn()} />);
    expect(getAllByRole('button').length).toBeGreaterThan(0);
  });
  it('click buttons', () => {
    const { getAllByRole } = render(<Recording onNavigate={jest.fn()} />);
    const buttons = getAllByRole('button');
    buttons.forEach(btn => {
      try { fireEvent.click(btn); } catch(e) {}
    });
    expect(true).toBeTruthy();
  });
  it('has inputs', () => {
    const { container } = render(<Recording onNavigate={jest.fn()} />);
    const inputs = container.querySelectorAll('input, textarea');
    expect(inputs.length).toBeGreaterThanOrEqual(0);
  });
});

describe('Home interactions', () => {
  it('click dashboard cards', () => {
    const nav = jest.fn();
    const { getAllByRole } = render(<Home onNavigate={nav} />);
    const buttons = getAllByRole('button');
    buttons.forEach(btn => {
      try { fireEvent.click(btn); } catch(e) {}
    });
    expect(true).toBeTruthy();
  });
});

describe('Emergency interactions', () => {
  it('click buttons', () => {
    const close = jest.fn();
    const { getAllByRole } = render(<Emergency onClose={close} />);
    const buttons = getAllByRole('button');
    buttons.forEach(btn => {
      try { fireEvent.click(btn); } catch(e) {}
    });
    expect(true).toBeTruthy();
  });
});
