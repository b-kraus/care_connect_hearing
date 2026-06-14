import React from 'react';
import renderer, { act } from 'react-test-renderer';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn() },
}));

import HomeScreen from '../src/app/home';
import ActiveAlertScreen from '../src/app/active-alert';
import EmergencyAlertScreen from '../src/app/emergency';

describe('HomeScreen', () => {
  it('renders without crashing', () => {
    let tree;
    act(() => {
      tree = renderer.create(<HomeScreen />);
    });
    expect(tree.toJSON()).toBeTruthy();
  });

  it('contains greeting', () => {
    let tree;
    act(() => {
      tree = renderer.create(<HomeScreen />);
    });
    const json = JSON.stringify(tree.toJSON());
    expect(json).toContain('Good afternoon');
  });

  it('contains emergency', () => {
    let tree;
    act(() => {
      tree = renderer.create(<HomeScreen />);
    });
    const json = JSON.stringify(tree.toJSON());
    expect(json).toContain('EMERGENCY');
  });

  it('contains demo button', () => {
    let tree;
    act(() => {
      tree = renderer.create(<HomeScreen />);
    });
    const json = JSON.stringify(tree.toJSON());
    expect(json).toContain('Demo Alert');
  });
});

describe('ActiveAlertScreen', () => {
  it('renders without crashing', () => {
    let tree;
    act(() => {
      tree = renderer.create(<ActiveAlertScreen />);
      jest.advanceTimersByTime(1000);
    });
    expect(tree.toJSON()).toBeTruthy();
  });
});

describe('EmergencyAlertScreen', () => {
  it('renders without crashing', () => {
    let tree;
    act(() => {
      tree = renderer.create(<EmergencyAlertScreen />);
    });
    expect(tree.toJSON()).toBeTruthy();
  });

  it('contains title', () => {
    let tree;
    act(() => {
      tree = renderer.create(<EmergencyAlertScreen />);
    });
    const json = JSON.stringify(tree.toJSON());
    expect(json).toContain('Emergency Alert');
  });
});
