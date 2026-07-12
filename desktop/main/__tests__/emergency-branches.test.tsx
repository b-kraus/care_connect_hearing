import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';

jest.mock('lucide-react', () => new Proxy({}, {
  get: (_target, name) => {
    return () => <span>{String(name)}</span>;
  },
}));

import Emergency from '../src/app/screens/Emergency';

describe('Emergency slider branches', () => {
  it('closes from the header close button', () => {
    const onClose = jest.fn();

    render(<Emergency onClose={onClose} />);

    fireEvent.click(
      screen.getByLabelText('Close emergency panel')
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not move before dragging begins', () => {
    render(<Emergency onClose={jest.fn()} />);

    fireEvent.mouseMove(window, {
      clientX: 400,
    });

    expect(screen.getByText('0%')).toBeTruthy();
  });

  it('moves the slider while dragging', () => {
    const { container } = render(
      <Emergency onClose={jest.fn()} />
    );

    const sliderText = screen.getByText(
      'Slide right to send SOS'
    );

    const track = sliderText.parentElement?.parentElement;

    expect(track).toBeTruthy();

    if (!track) {
      throw new Error('Emergency slider track was not found');
    }

    jest.spyOn(track, 'getBoundingClientRect').mockReturnValue({
      width: 700,
      height: 76,
      top: 0,
      right: 700,
      bottom: 76,
      left: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    const dragHandle = container.querySelector(
      '.cursor-grab'
    );

    expect(dragHandle).toBeTruthy();

    if (!dragHandle) {
      throw new Error('Emergency drag handle was not found');
    }

    fireEvent.mouseDown(dragHandle);

    fireEvent.mouseMove(window, {
      clientX: 350,
    });

    expect(screen.queryByText('0%')).toBeNull();
    expect(
      screen.getByText('Send Emergency Alert?')
    ).toBeTruthy();
  });

  it('snaps back when released before completion', () => {
    const { container } = render(
      <Emergency onClose={jest.fn()} />
    );

    const sliderText = screen.getByText(
      'Slide right to send SOS'
    );

    const track = sliderText.parentElement?.parentElement;

    if (!track) {
      throw new Error('Emergency slider track was not found');
    }

    jest.spyOn(track, 'getBoundingClientRect').mockReturnValue({
      width: 700,
      height: 76,
      top: 0,
      right: 700,
      bottom: 76,
      left: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    const dragHandle = container.querySelector(
      '.cursor-grab'
    );

    if (!dragHandle) {
      throw new Error('Emergency drag handle was not found');
    }

    fireEvent.mouseDown(dragHandle);

    fireEvent.mouseMove(window, {
      clientX: 300,
    });

    fireEvent.mouseUp(window);

    expect(screen.getByText('0%')).toBeTruthy();
    expect(
      screen.getByText('Send Emergency Alert?')
    ).toBeTruthy();
  });

  it('sends the alert when dragged to the end', () => {
    const onClose = jest.fn();

    const { container } = render(
      <Emergency onClose={onClose} />
    );

    const sliderText = screen.getByText(
      'Slide right to send SOS'
    );

    const track = sliderText.parentElement?.parentElement;

    if (!track) {
      throw new Error('Emergency slider track was not found');
    }

    jest.spyOn(track, 'getBoundingClientRect').mockReturnValue({
      width: 700,
      height: 76,
      top: 0,
      right: 700,
      bottom: 76,
      left: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    const dragHandle = container.querySelector(
      '.cursor-grab'
    );

    if (!dragHandle) {
      throw new Error('Emergency drag handle was not found');
    }

    fireEvent.mouseDown(dragHandle);

    fireEvent.mouseMove(window, {
      clientX: 700,
    });

    expect(
      screen.getByText('SOS Alert Sent')
    ).toBeTruthy();

    expect(
      screen.getByText('Emergency Active')
    ).toBeTruthy();

    expect(
      screen.getByText(/CONFIRMED/)
    ).toBeTruthy();

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Close',
      })
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});