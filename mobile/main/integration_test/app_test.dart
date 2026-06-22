import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:care_connect_hearing/main.dart' as app; 

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('Care Connect Hearing - Full Application E2E Test Suite', () {
    testWidgets('Navigate through onboarding and verify all navigation tabs with accessibility', 
      (WidgetTester tester) async {
        
        // 1. Boot up the application
        app.main();
        await tester.pumpAndSettle();

        // Enable the Semantics handle for accessibility testing
        final SemanticsHandle semantics = tester.ensureSemantics();

        // ---------------------------------------------------------------------
        // SCREEN 1: Onboarding Screen
        // ---------------------------------------------------------------------
        expect(find.text('Welcome to Care\nConnect Hearing'), findsOneWidget);
        
        // Verify Accessibility on Onboarding using the correct matchers
        await expectLater(tester, meetsGuideline(textContrastGuideline));
        await expectLater(tester, meetsGuideline(androidTapTargetGuideline));

        // Advance past onboarding to Home Screen
        final Finder useDefaultButton = find.widgetWithText(OutlinedButton, 'Use Default Settings');
        await tester.tap(useDefaultButton);
        await tester.pumpAndSettle(); 

        // ---------------------------------------------------------------------
        // SCREEN 2: Home Dashboard Screen (Tab index 0)
        // ---------------------------------------------------------------------
        expect(find.text('Care Connect Hearing'), findsOneWidget);
        expect(find.text('Good evening, Marcus'), findsOneWidget);
        
        // Verify Accessibility on Dashboard Home
        await expectLater(tester, meetsGuideline(textContrastGuideline));
        await expectLater(tester, meetsGuideline(androidTapTargetGuideline));

        // Helper finder to extract buttons cleanly from the global bottom navbar
        final Finder navBar = find.byType(BottomNavigationBar);

        // ---------------------------------------------------------------------
        // SCREEN 3: Messages Screen (Tab index 1)
        // ---------------------------------------------------------------------
        final Finder messagesTabButton = find.descendant(
          of: navBar,
          matching: find.byIcon(Icons.chat_bubble_outline),
        );
        
        await tester.tap(messagesTabButton);
        await tester.pumpAndSettle();
        
        // Run accessibility evaluation on messages layout
        await expectLater(tester, meetsGuideline(textContrastGuideline));

        // ---------------------------------------------------------------------
        // SCREEN 4: Log Screen (Tab index 2)
        // ---------------------------------------------------------------------
        final Finder logTabButton = find.descendant(
          of: navBar,
          matching: find.byIcon(Icons.assignment_outlined),
        );
        
        await tester.tap(logTabButton);
        await tester.pumpAndSettle();
        
        // Run accessibility evaluation on logs layout
        await expectLater(tester, meetsGuideline(textContrastGuideline));

        // ---------------------------------------------------------------------
        // SCREEN 5: Settings Screen (Tab index 3)
        // ---------------------------------------------------------------------
        final Finder settingsTabButton = find.descendant(
          of: navBar,
          matching: find.byIcon(Icons.settings),
        );
        
        await tester.tap(settingsTabButton);
        await tester.pumpAndSettle();
        
        // Verify Settings heading page loaded without strict ambiguity collisions
        expect(find.text('Settings').first, findsOneWidget);
        
        // Final screen accessibility sweep
        await expectLater(tester, meetsGuideline(textContrastGuideline));

        // Always clean up the semantics handle at the very end of your test block
        semantics.dispose();
    });
  });
}