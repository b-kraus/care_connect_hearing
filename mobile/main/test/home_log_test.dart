import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:care_connect_hearing/log_screen.dart';
import 'package:care_connect_hearing/state/alert_provider.dart';

Widget wrapWithProvider(Widget child) {
  return ChangeNotifierProvider(
    create: (_) => AlertProvider(),
    child: MaterialApp(home: child),
  );
}

void main() {
  group('LogScreen', () {
    testWidgets('renders alert history title', (tester) async {
      await tester.pumpWidget(wrapWithProvider(const LogScreen()));
      await tester.pumpAndSettle();
      expect(find.text('Alert History'), findsOneWidget);
    });

    testWidgets('renders filter chips', (tester) async {
      await tester.pumpWidget(wrapWithProvider(const LogScreen()));
      await tester.pumpAndSettle();
      expect(find.text('All'), findsOneWidget);
      expect(find.text('Confirmed'), findsOneWidget);
      expect(find.text('Missed'), findsOneWidget);
    });

    testWidgets('renders toggle header', (tester) async {
      await tester.pumpWidget(wrapWithProvider(const LogScreen()));
      await tester.pumpAndSettle();
      expect(find.text('My History'), findsOneWidget);
      expect(find.text('Mine'), findsOneWidget);
      expect(find.text('Family'), findsOneWidget);
    });

    testWidgets('renders alert items', (tester) async {
      await tester.pumpWidget(wrapWithProvider(const LogScreen()));
      await tester.pumpAndSettle();
      expect(find.text('Take blue pill'), findsWidgets);
      expect(find.text('Morning walk'), findsOneWidget);
    });

    testWidgets('renders latest activity banner', (tester) async {
      await tester.pumpWidget(wrapWithProvider(const LogScreen()));
      await tester.pumpAndSettle();
      expect(find.textContaining('live events'), findsOneWidget);
    });

    testWidgets('filter confirmed works', (tester) async {
      await tester.pumpWidget(wrapWithProvider(const LogScreen()));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Confirmed'));
      await tester.pumpAndSettle();
      expect(find.text('Morning walk'), findsNothing);
    });

    testWidgets('filter missed works', (tester) async {
      await tester.pumpWidget(wrapWithProvider(const LogScreen()));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Missed'));
      await tester.pumpAndSettle();
      expect(find.text('Morning walk'), findsOneWidget);
    });

    testWidgets('renders section headers', (tester) async {
      await tester.pumpWidget(wrapWithProvider(const LogScreen()));
      await tester.pumpAndSettle();
      expect(find.text('TODAY'), findsOneWidget);
    });

    testWidgets('renders switch', (tester) async {
      await tester.pumpWidget(wrapWithProvider(const LogScreen()));
      await tester.pumpAndSettle();
      expect(find.byType(Switch), findsOneWidget);
    });

    testWidgets('renders status indicators', (tester) async {
      await tester.pumpWidget(wrapWithProvider(const LogScreen()));
      await tester.pumpAndSettle();
      expect(find.text('CONFIRMED'), findsWidgets);
      expect(find.text('MISSED'), findsWidgets);
    });

    testWidgets('renders scrollbar', (tester) async {
      await tester.pumpWidget(wrapWithProvider(const LogScreen()));
      await tester.pumpAndSettle();
      expect(find.byType(Scrollbar), findsOneWidget);
    });
  });
}
