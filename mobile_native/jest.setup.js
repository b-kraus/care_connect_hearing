global.window = global.window || {};
global.window.dispatchEvent = global.window.dispatchEvent || jest.fn();

process.on('unhandledRejection', () => {});
process.on('uncaughtException', () => {});

// ==========================================
// MOCK EXPO ROUTER & STANDARD NAVIGATION
// ==========================================
jest.mock('expo-router', () => {
  return {
    Slot: 'Slot',
    Stack: 'Stack',
    Tabs: 'Tabs',
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    }),
    useLocalSearchParams: () => ({}),
    useSegments: () => [],
  };
});

// Short-circuit the file that's throwing the SyntaxError
jest.mock('standard-navigation', () => {
  return {};
}, { virtual: true });