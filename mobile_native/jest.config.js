module.exports = {
  preset: 'jest-expo',
  setupFiles: ['./jest.setup.js'],
  fakeTimers: { enableGlobally: true },
  collectCoverageFrom: [
    'src/app/index.tsx',
    'src/app/read-message.tsx',
    'src/app/record-message.tsx',
    'src/app/settings.tsx',
  ],
};
