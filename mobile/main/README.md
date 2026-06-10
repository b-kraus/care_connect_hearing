# Welcome to Care Connect Mobile Application

# Care Connect Hearing — Flutter App
 
A healthcare coordination application designed for users with hearing loss. This Flutter implementation is part of the broader Care Connect Hearing project (mobile, web, and desktop builds).
 
## About the App
 
Care Connect Hearing helps caregivers, patients, and family members communicate, manage appointments, and track medication reminders. The app is customized to compensate for reduced hearing through:
- High-contrast visual themes (yellow on black by default)
- Persistent on-screen alerts that stay until acknowledged
- Flash and vibration notifications instead of sound-only alerts
- Large, readable text and touch-friendly buttons
 
## Screens Implemented
 
- **Onboarding** — Welcome screen with accessible defaults already enabled and a guided setup option
- **Home / Dashboard** — Daily home base showing alerts grouped by status, with bottom navigation
- **Active Alert Screen** - Daily alert screen that appears to the user 
- **Emergency Alert Screen** - When the user hits the emergency alert button on the home screen, this screen appears with two buttons allowing them to contact emergency services
- **Log Screen** - A log of all alerts that appear to the user for future reference
- **Read Message Screen** - the screen that appears when the user is reading the message that appears after speech to text
- **Record Message Screen** - The screen that appears when the user is using the record side of the speech to text
Navigation between screens is implemented. Tapping "Start Guided Setup" or "Use Default Settings" on Onboarding navigates to the Home screen. The back arrow on Home returns to Onboarding.
 
## Prerequisites
 
Make sure you have these installed:
- Flutter SDK (https://docs.flutter.dev/get-started/install)
- VS Code or Android Studio
- Google Chrome (for web target) — easiest option
- Optional: iOS Simulator (Mac only) or Android emulator
 
To verify your Flutter setup, run:
 
    flutter doctor
 
Resolve any issues it reports before continuing.
 
## How to Run
 
### 1. Clone the repository
 
    git clone https://github.com/b-kraus/care_connect_hearing.git
 
### 2. Navigate into the Flutter folder
 
    cd care_connect_hearing/mobile/main
 
### 3. Install dependencies
 
    flutter pub get
 
### 4. Run the app
 
For Chrome (easiest):
 
    flutter run -d chrome
 
For iOS Simulator (Mac with Xcode):
 
    flutter run -d ios
 
The app will compile and open automatically (1–2 minutes the first time).
 
## Using the App
 
Once the app is running, you'll see the **Welcome to Care Connect Hearing** screen.
 
- Click **"Start Guided Setup"** or **"Use Default Settings"** to navigate to the Home/Dashboard screen
- On the Home screen, use the back arrow (top-left) to return to Onboarding
 
## Helpful Commands While Running
 
While Flutter is running in the terminal:
- `r` — hot reload (apply code changes)
- `R` — hot restart (full rebuild)
- `q` — quit the app
 
## Troubleshooting
 
- **"No client connected"** — Press `q` to quit, then run `flutter run -d chrome` again
- **Chrome doesn't open automatically** — Look for a `localhost:` URL in the terminal output and open it manually in Chrome
- **Other issues** — Run `flutter doctor` and resolve any reported problems
 
## Design System
 
The app follows our team's Care Connect Hearing design system:
- **Colors:** Yellow #FFD600, Black #000000, Blue #1565C0, Red #D32F2F, Green #2E7D32, Orange #FF9800
- **Typography:** Inter, with sizes ranging from 14px (Caption) to 40px (Display Bold)
- **Touch targets:** Minimum 48×48 dp (WCAG 2.5.5)
- **Contrast:** Minimum 4.5:1 (WCAG 1.4.3)
 
See the Figma design system file for the full reference.
