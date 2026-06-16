import React from 'react';
import renderer, { act } from 'react-test-renderer';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn() },
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
}));

import ReadMessageScreen from '../src/app/read-message';
import RecordMessageScreen from '../src/app/record-message';

describe('ReadMessageScreen', () => {
  it('renders', () => {
    let t; act(() => { t = renderer.create(<ReadMessageScreen />); });
    expect(t.toJSON()).toBeTruthy();
  });
  it('has title', () => {
    let t; act(() => { t = renderer.create(<ReadMessageScreen />); });
    expect(JSON.stringify(t.toJSON())).toContain('Message');
  });
  it('has button', () => {
    let t; act(() => { t = renderer.create(<ReadMessageScreen />); });
    expect(JSON.stringify(t.toJSON())).toContain('LISTENING');
  });
});

describe('RecordMessageScreen', () => {
  it('renders', () => {
    let t; act(() => { t = renderer.create(<RecordMessageScreen />); });
    expect(t.toJSON()).toBeTruthy();
  });
  it('has title', () => {
    let t; act(() => { t = renderer.create(<RecordMessageScreen />); });
    expect(JSON.stringify(t.toJSON())).toContain('Record');
  });
  it('has recipient', () => {
    let t; act(() => { t = renderer.create(<RecordMessageScreen />); });
    expect(JSON.stringify(t.toJSON())).toContain('To:');
  });
});

describe('ReadMessage interactions', () => {
  it('press mic button', () => {
    let t; act(() => { t = renderer.create(<ReadMessageScreen />); });
    const btns = t.root.findAll(n => typeof n.props.onPress === 'function');
    act(() => { btns[btns.length - 2].props.onPress(); });
    expect(t.toJSON()).toBeTruthy();
  });
});

describe('RecordMessage interactions', () => {
  it('press record button', () => {
    let t; act(() => { t = renderer.create(<RecordMessageScreen />); });
    const btns = t.root.findAll(n => typeof n.props.onPress === 'function');
    act(() => { btns[btns.length - 1].props.onPress(); });
    expect(t.toJSON()).toBeTruthy();
  });
});
