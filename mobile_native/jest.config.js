module.exports = {
  preset: 'jest-expo',
  setupFiles: ['./jest.setup.js'],
  fakeTimers: { enableGlobally: true },
  maxWorkers: 1,
  collectCoverageFrom: [
    'src/app/read-message.tsx',
    'src/app/record-message.tsx',
    'src/app/settings.tsx',
  ],
};
