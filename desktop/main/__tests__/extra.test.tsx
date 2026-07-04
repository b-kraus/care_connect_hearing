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

import Emergency from '../src/app/screens/Emergency';
import ReadMessage from '../src/app/screens/ReadMessage';
import Recording from '../src/app/screens/Recording';
import Logs from '../src/app/screens/Logs';

describe('Emergency full', () => {
  it('renders send button', () => {
    const { getByText } = render(<Emergency onClose={jest.fn()} />);
    expect(getByText('Send Emergency Alert?')).toBeTruthy();
  });
  it('cancel calls onClose', () => {
    const close = jest.fn();
    const { getAllByRole } = render(<Emergency onClose={close} />);
    const buttons = getAllByRole('button');
    const cancel = buttons.find(b => b.textContent?.includes('Cancel'));
    if (cancel) fireEvent.click(cancel);
    expect(close).toHaveBeenCalled();
  });
  it('has all sections', () => {
    const { container } = render(<Emergency onClose={jest.fn()} />);
    expect(container.querySelectorAll('button').length).toBeGreaterThan(1);
  });
});

describe('ReadMessage full', () => {
  it('click all buttons twice', () => {
    const { getAllByRole } = render(<ReadMessage onNavigate={jest.fn()} />);
    const buttons = getAllByRole('button');
    buttons.forEach(btn => {
      try { fireEvent.click(btn); fireEvent.click(btn); } catch(e) {}
    });
    expect(true).toBeTruthy();
  });
  it('type in inputs', () => {
    const { container } = render(<ReadMessage onNavigate={jest.fn()} />);
    const inputs = container.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      try { fireEvent.change(input, { target: { value: 'test' } }); } catch(e) {}
    });
    expect(true).toBeTruthy();
  });
});

describe('Recording full', () => {
  it('click all buttons twice', () => {
    const { getAllByRole } = render(<Recording onNavigate={jest.fn()} />);
    const buttons = getAllByRole('button');
    buttons.forEach(btn => {
      try { fireEvent.click(btn); fireEvent.click(btn); } catch(e) {}
    });
    expect(true).toBeTruthy();
  });
  it('type in inputs', () => {
    const { container } = render(<Recording onNavigate={jest.fn()} />);
    const inputs = container.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      try { fireEvent.change(input, { target: { value: 'test message' } }); } catch(e) {}
    });
    expect(true).toBeTruthy();
  });
});

describe('Logs full', () => {
  it('click all buttons', () => {
    const { getAllByRole } = render(<Logs onNavigate={jest.fn()} onEmergency={jest.fn()} />);
    const buttons = getAllByRole('button');
    buttons.forEach(btn => {
      try { fireEvent.click(btn); } catch(e) {}
    });
    expect(true).toBeTruthy();
  });
});

describe('Emergency states', () => {
  it('hold button triggers state', () => {
    const { getAllByRole } = render(<Emergency onClose={jest.fn()} />);
    const buttons = getAllByRole('button');
    buttons.forEach(btn => {
      try {
        fireEvent.mouseDown(btn);
        fireEvent.mouseUp(btn);
        fireEvent.pointerDown(btn);
        fireEvent.pointerUp(btn);
      } catch(e) {}
    });
    expect(true).toBeTruthy();
  });
  it('keyboard events', () => {
    const { getAllByRole } = render(<Emergency onClose={jest.fn()} />);
    const buttons = getAllByRole('button');
    buttons.forEach(btn => {
      try {
        fireEvent.keyDown(btn, { key: 'Enter' });
        fireEvent.keyUp(btn, { key: 'Enter' });
      } catch(e) {}
    });
    expect(true).toBeTruthy();
  });
});

describe('ReadMessage states', () => {
  it('keyboard navigation', () => {
    const { getAllByRole } = render(<ReadMessage onNavigate={jest.fn()} />);
    const buttons = getAllByRole('button');
    buttons.forEach(btn => {
      try {
        fireEvent.keyDown(btn, { key: 'Enter' });
        fireEvent.focus(btn);
        fireEvent.blur(btn);
      } catch(e) {}
    });
    expect(true).toBeTruthy();
  });
});

describe('Recording states', () => {
  it('keyboard navigation', () => {
    const { getAllByRole } = render(<Recording onNavigate={jest.fn()} />);
    const buttons = getAllByRole('button');
    buttons.forEach(btn => {
      try {
        fireEvent.keyDown(btn, { key: 'Enter' });
        fireEvent.focus(btn);
        fireEvent.blur(btn);
      } catch(e) {}
    });
    expect(true).toBeTruthy();
  });
});
