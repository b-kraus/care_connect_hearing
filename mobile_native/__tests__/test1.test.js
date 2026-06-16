import React from 'react';
import renderer, { act } from 'react-test-renderer';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn() },
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
}));
jest.mock('@react-native-community/slider', () => 'Slider');

import OnboardingScreen from '../src/app/index';
import SettingsScreen from '../src/app/settings';

describe('OnboardingScreen', () => {
  it('renders', () => {
    let t; act(() => { t = renderer.create(<OnboardingScreen />); });
    expect(t.toJSON()).toBeTruthy();
  });
  it('has welcome', () => {
    let t; act(() => { t = renderer.create(<OnboardingScreen />); });
    expect(JSON.stringify(t.toJSON())).toContain('Welcome');
  });
  it('has button', () => {
    let t; act(() => { t = renderer.create(<OnboardingScreen />); });
    expect(JSON.stringify(t.toJSON())).toContain('Start Guided Setup');
  });
});

describe('SettingsScreen', () => {
  it('renders', () => {
    let t; act(() => { t = renderer.create(<SettingsScreen />); });
    expect(t.toJSON()).toBeTruthy();
  });
  it('has title', () => {
    let t; act(() => { t = renderer.create(<SettingsScreen />); });
    expect(JSON.stringify(t.toJSON())).toContain('Settings');
  });
  it('has WCAG', () => {
    let t; act(() => { t = renderer.create(<SettingsScreen />); });
    expect(JSON.stringify(t.toJSON())).toContain('WCAG');
  });
});
