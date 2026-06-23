# Care Connect Hearing
## Description: Care Connect Hearing is a mobile, web, and desktop application that is designed to aid care recipients with reduced hearing.  The application features tools like speech to text, captions on health videos, vibration enhancements, and visual enhancements.  Each feature was designed to alleviate the struggles faced by the user on a daily occurrence and to make receiving care easier
## Team Members:
### Beth Kraus
### Brandon Jackson**
### Camilla Mekonnen
### Rashaad Bell
## Link To Charter: https://umuc365-my.sharepoint.com/:w:/r/personal/cmekonnen_student_umgc_edu/_layouts/15/Doc.aspx?sourcedoc=%7B0BEA988E-E81B-49BE-9FA1-F89B24F98A9B%7D&file=Team%20Charter.docx&action=default&mobileredirect=true&DefaultItemOpen=1
## Setup Instructions:

### Clone the repository:

```bash
git clone <https://github.com/b-kraus/care_connect_hearing>
cd care_connect_hearing
```

### Install React Native Dependencies

```bash
cd mobile_native
npm install
```

### Install Flutter Dependencies

```bash
cd mobile/main
flutter pub get
```

## Running Applications

### Flutter Application

Navigate to the Flutter project:

```bash
cd mobile/main
```

Verify Flutter installation:

```bash
flutter doctor
```

Run the application:

```bash
flutter run
```

### React Native (Expo) Application

Navigate to the React Native project:

```bash
cd mobile_native
```

Start Expo:

```bash
npm start
```

Run Android:

```bash
npm run android
```

Run iOS:

```bash
npm run ios
```

Run Web:

```bash
npm run web
```

## Running Tests

### Flutter Tests

```bash
cd mobile/main
flutter test
```

### React Native Tests

```bash
cd mobile_native
npm test
```

### Integration Tests

Flutter integration tests:
```bash
cd mobile/main
flutter test integration_test/app_test.dart
```

React Native integration tests:
```bash
cd mobile_native
npx jest __tests__/AppIntegration.test.tsx
```

### E2E Tests (Maestro)

Install Maestro:
```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

Ensure the React Native app is running on iOS Simulator first, then:
```bash
maestro test mobile_native/e2e/flow_onboarding.yaml
maestro test mobile_native/e2e/flow_alert.yaml
```

Coverage reports are generated in the corresponding coverage directories.

## Accessibility Testing

Accessibility testing was performed using Android TalkBack.

Tested Screens:

* Home
* Messages
* Settings

Tested Components:

* Buttons
* Navigation Controls
* Headings
* Interactive Elements

Results:

* Major controls were announced correctly.
* Navigation items were accessible.
* Buttons were identifiable by screen readers.
* Screen content was readable using TalkBack.

VoiceOver (iOS) — React Native App:
* 9 accessibility labels implemented with accessibilityLabel and accessibilityRole properties
* All interactive controls configured for VoiceOver compatibility across Home, Read Message, and Record Message screens

## Repository Structure

care_connect_hearing/
├── mobile/
│   └── main/                  # Flutter application
│       ├── lib/               # Flutter screens (8 screens)
│       ├── lib/state/         # State management (AlertProvider)
│       ├── test/              # Flutter unit tests (26 tests)
│       ├── integration_test/  # Flutter integration tests
│       └── coverage/          # Flutter coverage reports
├── mobile_native/             # React Native (Expo) application
│   ├── src/app/               # React Native screens (8 screens)
│   ├── __tests__/             # Jest unit + integration tests (18 tests)
│   ├── e2e/                   # Maestro E2E test flows (2 flows)
│   ├── coverage/              # React Native coverage reports
│   └── COMPARISON.md          # Flutter vs React Native comparison
├── desktop/
├── web/
└── README.md

## Dependency Requirements
### Testing Tools
* lcov (for Flutter coverage reports): `brew install lcov`
* Maestro (for E2E tests): `curl -Ls "https://get.maestro.mobile.dev" | bash`
* Java (required by Maestro): `brew install openjdk`
* Xcode (for iOS Simulator)
### General

* Git
* Node.js
* npm
* Android Studio
* Android SDK
* Visual Studio Code

### Flutter Application

* Flutter SDK
* Dart SDK

### React Native Application

* Expo CLI (installed through project dependencies)
* React Native dependencies defined in package.json

