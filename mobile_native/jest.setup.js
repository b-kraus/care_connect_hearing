global.window = global.window || {};
global.window.dispatchEvent = global.window.dispatchEvent || jest.fn();

process.on('unhandledRejection', () => {});
process.on('uncaughtException', () => {});
