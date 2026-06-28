# Care Connect Hearing — Desktop Accessibility Notes

## Target Users
Users with hearing loss who need visual and haptic alternatives to audio-based notifications and communication.

## WCAG 2.1 AA Compliance

### 1.4.3 — Color Contrast
- Primary: #FFD600 (yellow) on #121212 (dark) = 13.8:1 ratio
- Secondary: #FFFFFF on #121212 = 17.4:1 ratio
- Both exceed WCAG AA minimum of 4.5:1

### 1.4.1 — Use of Color
- Alert status uses color AND text labels (Active Now, Missed, Confirmed)
- Recording status uses color AND text (Ready, Recording, Idle)
- No meaning conveyed by color alone

### 2.1.1 — Keyboard Accessible
- All interactive elements reachable via Tab / Shift+Tab
- All actions triggerable via Enter or Space
- See KEYBOARD_SHORTCUTS.md for full mapping

### 2.4.3 — Focus Order
Focus follows logical reading order on each screen:
1. Menu bar (File, Edit, View, Help)
2. Toolbar buttons (left to right)
3. Left sidebar (top to bottom)
4. Main content area (top to bottom)
5. Action buttons (left to right)
6. Status bar

### 2.4.7 — Focus Visible
- 2px yellow #FFD600 outline on all focused elements
- High contrast against dark background
- Focus indicator never hidden or obscured

### 2.3.1 — Three Flashes or Below Threshold
- Alert flash rate: 2 flashes per second (below 3/sec threshold)
- Flash uses yellow/black alternation for maximum visibility

### 3.2.3 — Consistent Navigation
- Menu bar position and order identical across all screens
- Sidebar navigation consistent across all screens
- Toolbar actions in same position on every screen

## Screen Reader Support
- All buttons include accessible labels
- All icons include semantic descriptions
- Heading hierarchy follows H1 > H2 > H3 structure
- ARIA roles applied to interactive components

## Hearing-Loss Specific Features
- Visual flash alerts replace audio notifications
- Speech-to-text transcription with 32px large text
- Vibration feedback as alternative to sound
- High contrast dark theme for readability
- All communication available in text format
