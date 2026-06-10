# AI Usage Documentation — Care Connect Hearing

## Team: Care Connect Hearing
**Members:** Camilla Mekonnen, Brandon Jackson, Beth Kraus

## AI Tools Used

### 1. Claude (Anthropic) — Code Assistance & Tutoring

**How it was used:**
- Guided Flutter project setup, file structure, and widget architecture
- Assisted with debugging compilation errors (bracket mismatches, YAML parsing, merge conflicts)
- Helped write widget test files and unit tests for achieving 70% code coverage
- Provided explanations of Flutter concepts including StatefulWidget lifecycle, AnimationController, Provider state management pattern, and speech_to_text package integration
- Assisted with git workflow (branching, committing, resolving merge conflicts)
- Helped debug iOS Simulator configuration and microphone permissions setup

**What was NOT AI-generated:**
- All screen designs originated from team-created Figma wireframes and design system
- Navigation architecture and screen flow decisions were made by the team
- Provider state management architecture was designed and implemented by Brandon Jackson
- Color palette, typography scale, and accessibility constraints were defined by the team in the requirements document

### 2. Figma Make AI — Design Exploration

**How it was used:**
- Generated one experimental dashboard mockup during Week 3 design phase
- The generated mockup used incorrect app name ("MedAlert") and did not match our color system
- Saved as design inspiration only — no elements were directly used in the final implementation

**What was kept vs discarded:**
- Discarded: The AI-generated mockup layout, colors, and naming
- Kept as reference: General spacing patterns observed in the generated layout

### 3. speech_to_text Package Research

**How it was used:**
- Claude assisted with understanding the speech_to_text Flutter package API
- Helped configure iOS permissions (NSMicrophoneUsageDescription, NSSpeechRecognitionUsageDescription) in Info.plist
- Assisted with writing the SpeechToText initialization, start/stop listening, and error handling code
- Helped mock the speech_to_text platform channel in widget tests

## Accessibility (WCAG) Implementation

The following accessibility features were implemented with AI assistance for code syntax but designed by the team:

1. **Visual Flash Alerts** — AnimationController alternating yellow/black at 2 flashes/sec (WCAG 2.3.1 compliant, under 3/sec threshold)
2. **Local Speech-to-Text** — Device-native transcription using speech_to_text package, no server-side processing required
3. **High Contrast Design** — Yellow (#FFD600) on black (#000000) throughout, minimum 32px text in transcription areas, large touch targets

## Summary

AI tools were used as learning aids and coding assistants throughout the project. All architectural decisions, design choices, accessibility requirements, and project direction were determined by the team. Code suggested by AI was reviewed, understood, and often modified before integration.
