import React from 'react';
import renderer, { act } from 'react-test-renderer';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn() },
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
}));
jest.mock('@react-native-community/slider', () => 'Slider');

beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => {}));
afterAll(() => console.error.mockRestore());

import SettingsScreen from '../src/app/settings';

describe('SettingsScreen', () => {
  it('renders', () => {
    let t; act(() => { t = renderer.create(<SettingsScreen />); });
    expect(t.toJSON()).toBeTruthy();
  });
  it('title', () => {
    let t; act(() => { t = renderer.create(<SettingsScreen />); });
    expect(JSON.stringify(t.toJSON())).toContain('Settings');
  });
  it('WCAG', () => {
    let t; act(() => { t = renderer.create(<SettingsScreen />); });
    expect(JSON.stringify(t.toJSON())).toContain('WCAG');
  });
});
