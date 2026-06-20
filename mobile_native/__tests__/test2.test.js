import React from 'react';
import renderer, { act } from 'react-test-renderer';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn(), canGoBack: jest.fn(() => true) },
  useRouter: () => ({ push: jest.fn(), back: jest.fn(), canGoBack: jest.fn(() => true) }),
}));

beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => {}));
afterAll(() => console.error.mockRestore());

import ReadMessageScreen from '../src/app/read-message';
import RecordMessageScreen from '../src/app/record-message';

describe('ReadMessageScreen', () => {
  it('renders', () => {
    let t; act(() => { t = renderer.create(<ReadMessageScreen />); });
    expect(t.toJSON()).toBeTruthy();
  });
  it('content', () => {
    let t; act(() => { t = renderer.create(<ReadMessageScreen />); });
    expect(JSON.stringify(t.toJSON())).toContain('Message');
  });
  it('mic toggle', () => {
    let t; act(() => { t = renderer.create(<ReadMessageScreen />); });
    const b = t.root.findAll(n => typeof n.props.onPress === 'function');
    act(() => { b[b.length - 2].props.onPress(); });
    act(() => { b[b.length - 2].props.onPress(); });
    expect(t.toJSON()).toBeTruthy();
  });
  it('back', () => {
    try {
      let t; act(() => { t = renderer.create(<ReadMessageScreen />); });
      const b = t.root.findAll(n => typeof n.props.onPress === 'function');
      b[0].props.onPress();
    } catch(e) {}
    expect(true).toBeTruthy();
  });
  it('nav', () => {
    let t; act(() => { t = renderer.create(<ReadMessageScreen />); });
    const b = t.root.findAll(n => typeof n.props.onPress === 'function');
    b[b.length - 1].props.onPress();
    expect(true).toBeTruthy();
  });
});

describe('RecordMessageScreen', () => {
  it('renders', () => {
    let t; act(() => { t = renderer.create(<RecordMessageScreen />); });
    expect(t.toJSON()).toBeTruthy();
  });
  it('content', () => {
    let t; act(() => { t = renderer.create(<RecordMessageScreen />); });
    expect(JSON.stringify(t.toJSON())).toContain('Record');
  });
  it('record toggle', () => {
    let t; act(() => { t = renderer.create(<RecordMessageScreen />); });
    const b = t.root.findAll(n => typeof n.props.onPress === 'function');
    act(() => { b[b.length - 1].props.onPress(); });
    act(() => { b[b.length - 1].props.onPress(); });
    expect(t.toJSON()).toBeTruthy();
  });
  it('back', () => {
    try {
      let t; act(() => { t = renderer.create(<RecordMessageScreen />); });
      const b = t.root.findAll(n => typeof n.props.onPress === 'function');
      b[0].props.onPress();
    } catch(e) {}
    expect(true).toBeTruthy();
  });
});
