module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx', types: ['jest', '@testing-library/jest-dom'], esModuleInterop: true } }],
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'src/app/screens/*.tsx',
  ],
};
