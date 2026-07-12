import React from 'react';
import {
  render,
  fireEvent,
  screen,
  act,
} from '@testing-library/react';

jest.mock('../src/app/components/layout/MainLayout', () => {
  return ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
});

jest.mock('lucide-react', () => new Proxy({}, {
  get: (_target, name) => {
    return () => <span>{String(name)}</span>;
  },
}));

import Recording from '../src/app/screens/Recording';

describe('Recording branch coverage', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('navigates home with the Home button', () => {
    const onNavigate = jest.fn();

    render(<Recording onNavigate={onNavigate} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Return to Home',
      })
    );

    expect(onNavigate).toHaveBeenCalledWith('home');
  });

  it('renders safely without onNavigate', () => {
    render(<Recording />);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Return to Home',
      })
    );

    fireEvent.keyDown(window, {
      key: 'Escape',
    });

    fireEvent.keyDown(window, {
      key: 'h',
      altKey: true,
    });

    expect(
      screen.getByText('Record Message')
    ).toBeTruthy();
  });

  it('starts and stops recording with buttons', () => {
    render(<Recording onNavigate={jest.fn()} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: /Start Recording/i,
      })
    );

    expect(screen.getByText('Recording')).toBeTruthy();

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Stop Recording',
      })
    );

    expect(screen.getByText('Ready')).toBeTruthy();
  });

  it('increments the recording timer', () => {
    jest.useFakeTimers();

    render(<Recording onNavigate={jest.fn()} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: /Start Recording/i,
      })
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByText('00:03')).toBeTruthy();
  });

  it('stops recording with Escape', () => {
    const onNavigate = jest.fn();

    render(<Recording onNavigate={onNavigate} />);

    fireEvent.keyDown(window, {
      key: 'r',
      ctrlKey: true,
    });

    expect(screen.getByText('Recording')).toBeTruthy();

    fireEvent.keyDown(window, {
      key: 'Escape',
    });

    expect(screen.getByText('Ready')).toBeTruthy();
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('uses Escape to navigate home when not recording', () => {
    const onNavigate = jest.fn();

    render(<Recording onNavigate={onNavigate} />);

    fireEvent.keyDown(window, {
      key: 'Escape',
    });

    expect(onNavigate).toHaveBeenCalledWith('home');
  });

  it('uses Alt H to navigate home', () => {
    const onNavigate = jest.fn();

    render(<Recording onNavigate={onNavigate} />);

    fireEvent.keyDown(window, {
      key: 'h',
      altKey: true,
    });

    expect(onNavigate).toHaveBeenCalledWith('home');
  });

  it('handles Ctrl R and Ctrl S shortcuts', () => {
    render(<Recording onNavigate={jest.fn()} />);

    fireEvent.keyDown(window, {
      key: 'r',
      ctrlKey: true,
    });

    expect(screen.getByText('Recording')).toBeTruthy();

    fireEvent.keyDown(window, {
      key: 's',
      ctrlKey: true,
    });

    expect(screen.getByText('Ready')).toBeTruthy();
  });

  it('starts a new message with Ctrl N', () => {
    render(<Recording onNavigate={jest.fn()} />);

    const messageBox = screen.getByLabelText(
      'Message text'
    ) as HTMLTextAreaElement;

    expect(messageBox.value.length).toBeGreaterThan(0);

    fireEvent.keyDown(window, {
      key: 'n',
      ctrlKey: true,
    });

    expect(messageBox.value).toBe('');
    expect(screen.getByText('0 chars')).toBeTruthy();
    expect(screen.getByText('00:00')).toBeTruthy();
  });

  it('creates a new message with the New Message button', () => {
    render(<Recording onNavigate={jest.fn()} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: '+ New Message',
      })
    );

    const messageBox = screen.getByLabelText(
      'Message text'
    ) as HTMLTextAreaElement;

    expect(messageBox.value).toBe('');
    expect(screen.getByText('0 chars')).toBeTruthy();
  });

  it('clears the current message', () => {
    render(<Recording onNavigate={jest.fn()} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: /Clear/i,
      })
    );

    const messageBox = screen.getByLabelText(
      'Message text'
    ) as HTMLTextAreaElement;

    expect(messageBox.value).toBe('');
    expect(screen.getByText('0 chars')).toBeTruthy();
  });

  it('sends the message and stops recording', () => {
    render(<Recording onNavigate={jest.fn()} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: /Start Recording/i,
      })
    );

    expect(screen.getByText('Recording')).toBeTruthy();

    fireEvent.click(
      screen.getByRole('button', {
        name: /Send/i,
      })
    );

    expect(screen.getByText('Ready')).toBeTruthy();
  });

  it('changes the message text', () => {
    render(<Recording onNavigate={jest.fn()} />);

    const messageBox = screen.getByLabelText(
      'Message text'
    );

    fireEvent.change(messageBox, {
      target: {
        value: 'Testing recording message',
      },
    });

    expect(
      screen.getByText('25 chars')
    ).toBeTruthy();
  });

  it('selects a recent message by clicking', () => {
  render(<Recording onNavigate={jest.fn()} />);

    const momOption = screen.getByRole('option', {
        name: /Mom/i,
    });

    fireEvent.click(momOption);

    expect(
        momOption.getAttribute('aria-selected')
    ).toBe('true');
});

  it('navigates recent messages with ArrowDown and ArrowUp', () => {
    render(<Recording onNavigate={jest.fn()} />);

    fireEvent.keyDown(window, {
      key: 'ArrowDown',
    });

    const momOption = screen.getByRole('option', {
      name: /Mom/i,
    });

    expect(
      momOption.getAttribute('aria-selected')
    ).toBe('true');

    fireEvent.keyDown(window, {
      key: 'ArrowUp',
    });

    const doctorOption = screen.getByRole('option', {
      name: /Dr\. Sarah Chen/i,
    });

    expect(
      doctorOption.getAttribute('aria-selected')
    ).toBe('true');
  });

  it('does not move above the first recent message', () => {
    render(<Recording onNavigate={jest.fn()} />);

    fireEvent.keyDown(window, {
      key: 'ArrowUp',
    });

    const doctorOption = screen.getByRole('option', {
      name: /Dr\. Sarah Chen/i,
    });

    expect(
      doctorOption.getAttribute('aria-selected')
    ).toBe('true');
  });

  it('does not move below the last recent message', () => {
    render(<Recording onNavigate={jest.fn()} />);

    for (let index = 0; index < 10; index += 1) {
      fireEvent.keyDown(window, {
        key: 'ArrowDown',
      });
    }

    const transitOption = screen.getByRole('option', {
      name: /Transit Authority/i,
    });

    expect(
      transitOption.getAttribute('aria-selected')
    ).toBe('true');

    fireEvent.keyDown(window, {
      key: 'ArrowDown',
    });

    expect(
      transitOption.getAttribute('aria-selected')
    ).toBe('true');
  });
});