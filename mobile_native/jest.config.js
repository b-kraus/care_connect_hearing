module.exports = {
  preset: 'jest-expo',
  setupFiles: ['./jest.setup.js'],
  fakeTimers: { enableGlobally: true },
  maxWorkers: 1,
  
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-meta/.*|expo-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  
  collectCoverageFrom: [
    'src/app/read-message.tsx',
    'src/app/record-message.tsx',
    'src/app/settings.tsx',
    'src/app/log.tsx', 
  ],
};