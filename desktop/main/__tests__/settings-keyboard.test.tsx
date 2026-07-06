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

describe('Settings keyboard navigation', () => {
  it('moves focus through sidebar and activates tabs', () => {
    render(<Settings />);

    const displayTab = screen.getByRole('tab', {
      name: 'Display & Text',
    });

    const alertTab = screen.getByRole('tab', {
      name: 'Alert Flash',
    });

    const notificationsTab = screen.getByRole('tab', {
      name: 'Notifications',
    });

    const aboutTab = screen.getByRole('tab', {
      name: 'About',
    });

    displayTab.focus();

    fireEvent.keyDown(displayTab, {
      key: 'ArrowDown',
    });

    expect(document.activeElement).toBe(alertTab);

    fireEvent.keyDown(alertTab, {
      key: 'Enter',
    });

    expect(
      screen.getByText('Alert Flash Settings')
    ).toBeTruthy();

    fireEvent.keyDown(alertTab, {
      key: 'ArrowDown',
    });

    expect(document.activeElement).toBe(
      notificationsTab
    );

    fireEvent.keyDown(notificationsTab, {
      key: ' ',
    });

    expect(
      screen.getByText('Notification Preferences')
    ).toBeTruthy();

    fireEvent.keyDown(notificationsTab, {
      key: 'ArrowDown',
    });

    expect(document.activeElement).toBe(aboutTab);

    fireEvent.keyDown(aboutTab, {
      key: 'Enter',
    });

    expect(
      screen.getByText('About Care Connect Hearing')
    ).toBeTruthy();
  });

  it('supports Home and End keys', () => {
    render(<Settings />);

    const displayTab = screen.getByRole('tab', {
      name: 'Display & Text',
    });

    const aboutTab = screen.getByRole('tab', {
      name: 'About',
    });

    displayTab.focus();

    fireEvent.keyDown(displayTab, {
      key: 'End',
    });

    expect(document.activeElement).toBe(aboutTab);

    fireEvent.keyDown(aboutTab, {
      key: 'Home',
    });

    expect(document.activeElement).toBe(displayTab);
  });

  it('supports ArrowUp navigation', () => {
    render(<Settings />);

    const displayTab = screen.getByRole('tab', {
      name: 'Display & Text',
    });

    const notificationsTab = screen.getByRole('tab', {
      name: 'Notifications',
    });

    const aboutTab = screen.getByRole('tab', {
      name: 'About',
    });

    displayTab.focus();

    fireEvent.keyDown(displayTab, {
      key: 'ArrowUp',
    });

    expect(document.activeElement).toBe(aboutTab);

    fireEvent.keyDown(aboutTab, {
      key: 'ArrowUp',
    });

    expect(document.activeElement).toBe(
      notificationsTab
    );
  });
});