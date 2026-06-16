# Flutter vs React Native Comparison

## Team: Care Connect Hearing

## Setup

**Flutter:** Required Flutter SDK, Dart, Xcode, CocoaPods. Ran on iOS Simulator with flutter run -d "iPhone 17".

**React Native (Expo):** Required Node.js and npm. Created project with npx create-expo-app. Ran on iOS Simulator with npx expo start --ios. Faster initial setup.

## Language

**Flutter (Dart):** Class-based widgets, nested widget trees, inline styling.

**React Native (JavaScript):** Function components, JSX syntax, styles in StyleSheet.create(). Shorter syntax.

## Navigation

**Flutter:** Manual Navigator.push() with MaterialPageRoute.

**React Native:** File-based routing with Expo Router. Much simpler.

## State Management

**Flutter:** Provider with ChangeNotifier. Separate state class required.

**React Native:** Built-in useState hook. No extra packages needed.

## Animation

**Flutter:** AnimationController with ColorTween. Complex setup.

**React Native:** useState with useEffect and setInterval. Simpler code, same result.

## Testing

**Flutter:** flutter_test, achieved 70% coverage.

**React Native:** Jest with react-test-renderer, achieved 66% coverage.

## Summary

| Aspect | Flutter | React Native |
|--------|---------|--------------|
| Setup | Slower | Faster |
| Syntax | Verbose | Concise |
| Navigation | Manual | File-based |
| State | Provider | useState |
| Coverage | 70% | 66% |
