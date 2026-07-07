
# Care Connect Hearing — Desktop Application

Electron + React desktop application for hearing-loss users.

## Team Members
- Beth Kraus
- Camilla Mekonnen
- Rashaad Bell

## Dependencies
- Node.js (18+)
- npm
- Electron
- React 19
- Vite
- Jest + React Testing Library

## Setup Instructions

```bash
cd desktop/main
npm install --legacy-peer-deps
npm install react@19 react-dom@19 --force
```

## Running the Application

Terminal 1 — Start dev server:
```bash
npm run dev
```

Terminal 2 — Launch Electron:
```bash
npm run electron
```

## Running Tests

```bash
npx jest --config jest.config.cjs --coverage
```

Result: 49 tests passing, 80.81% coverage

## Packaging for macOS

```bash
npm run build-mac
```

Creates a DMG installer in the dist/ folder.

## Application Screens
- Home Dashboard
- Active Alert
- Alert Logs
- Read Message
- Record Message
- Settings
- Emergency SOS

## Keyboard Shortcuts
See KEYBOARD_SHORTCUTS.md for full mapping.

## Accessibility
See ACCESSIBILITY_NOTES.md for WCAG compliance details.
