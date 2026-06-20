import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:care_connect_hearing/onboarding_screen.dart';
import 'package:care_connect_hearing/settings_screen.dart';
import 'package:care_connect_hearing/emergency_alert_screen.dart';
import 'package:care_connect_hearing/active_alert_screen.dart';
import 'package:care_connect_hearing/state/alert_provider.dart';

Widget wrapWithMaterial(Widget child) {
  return MaterialApp(home: child);
}

Widget wrapWithProvider(Widget child) {
  return ChangeNotifierProvider(
    create: (_) => AlertProvider(),
    child: MaterialApp(home: child),
  );
}

void main() {
  group('OnboardingScreen', () {
    testWidgets('renders welcome text', (tester) async {
      await tester.pumpWidget(wrapWithMaterial(const OnboardingScreen()));
      expect(find.textContaining('Welcome'), findsWidgets);
    });

    testWidgets('renders setup button', (tester) async {
      await tester.pumpWidget(wrapWithMaterial(const OnboardingScreen()));
      expect(find.textContaining('Start'), findsWidgets);
    });
  });

  group('SettingsScreen', () {
    testWidgets('renders settings screen', (tester) async {
      await tester.pumpWidget(wrapWithMaterial(const SettingsScreen()));
      await tester.pumpAndSettle();
      expect(find.byType(Slider), findsWidgets);
    });

    testWidgets('renders WCAG label', (tester) async {
      await tester.pumpWidget(wrapWithMaterial(const SettingsScreen()));
      await tester.pumpAndSettle();
      expect(find.textContaining('WCAG'), findsWidgets);
    });
  });

  group('EmergencyAlertScreen', () {
    testWidgets('renders emergency title', (tester) async {
      await tester.pumpWidget(wrapWithProvider(const EmergencyAlertScreen()));
      expect(find.textContaining('Emergency'), findsWidgets);
    });

    testWidgets('renders SOS slider', (tester) async {
      await tester.pumpWidget(wrapWithProvider(const EmergencyAlertScreen()));
      expect(find.textContaining('Slide'), findsWidgets);
    });

    testWidgets('renders cancel button', (tester) async {
      await tester.pumpWidget(wrapWithProvider(const EmergencyAlertScreen()));
      expect(find.textContaining('Cancel'), findsWidgets);
    });
  });

  group('ActiveAlertScreen', () {
    testWidgets('renders alert title', (tester) async {
      await tester.pumpWidget(wrapWithProvider(ActiveAlertScreen(alertId: '1', alertTitle: 'Test Alert', alertTime: '6:00 PM')));
      await tester.pump(const Duration(milliseconds: 500));
      expect(find.text('Test Alert'), findsOneWidget);
    });


  });
}
