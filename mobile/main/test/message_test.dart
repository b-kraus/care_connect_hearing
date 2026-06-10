import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:care_connect_hearing/read_message_screen.dart';
import 'package:care_connect_hearing/record_message_screen.dart';

void main() {
  setUp(() {
    TestWidgetsFlutterBinding.ensureInitialized();
    const channel = MethodChannel('plugin.csdcorp.com/speech_to_text');
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMethodCallHandler(channel, (MethodCall methodCall) async {
      if (methodCall.method == 'initialize') return false;
      if (methodCall.method == 'has_permission') return false;
      if (methodCall.method == 'cancel') return null;
      if (methodCall.method == 'stop') return null;
      return null;
    });
  });

  group('ReadMessageScreen', () {
    testWidgets('renders title', (tester) async {
      await tester.pumpWidget(const MaterialApp(home: ReadMessageScreen()));
      await tester.pump(const Duration(seconds: 1));
      expect(find.text('Read Message'), findsOneWidget);
    });

    testWidgets('renders mic button', (tester) async {
      await tester.pumpWidget(const MaterialApp(home: ReadMessageScreen()));
      await tester.pump(const Duration(seconds: 1));
      expect(find.byIcon(Icons.mic), findsWidgets);
    });

    testWidgets('renders placeholder text', (tester) async {
      await tester.pumpWidget(const MaterialApp(home: ReadMessageScreen()));
      await tester.pump(const Duration(seconds: 1));
      expect(find.textContaining('Transcribed text'), findsOneWidget);
    });

    testWidgets('renders WCAG note', (tester) async {
      await tester.pumpWidget(const MaterialApp(home: ReadMessageScreen()));
      await tester.pump(const Duration(seconds: 1));
      expect(find.textContaining('WCAG'), findsOneWidget);
    });
  });

  group('RecordMessageScreen', () {
    testWidgets('renders title', (tester) async {
      await tester.pumpWidget(const MaterialApp(home: RecordMessageScreen()));
      await tester.pump(const Duration(seconds: 1));
      expect(find.text('Record Message'), findsOneWidget);
    });

    testWidgets('renders recipient field', (tester) async {
      await tester.pumpWidget(const MaterialApp(home: RecordMessageScreen()));
      await tester.pump(const Duration(seconds: 1));
      expect(find.text('To:'), findsOneWidget);
    });

    testWidgets('renders default recipient', (tester) async {
      await tester.pumpWidget(const MaterialApp(home: RecordMessageScreen()));
      await tester.pump(const Duration(seconds: 1));
      expect(find.text('Sarah'), findsOneWidget);
    });

    testWidgets('renders placeholder text', (tester) async {
      await tester.pumpWidget(const MaterialApp(home: RecordMessageScreen()));
      await tester.pump(const Duration(seconds: 1));
      expect(find.textContaining('Your message'), findsOneWidget);
    });
  });
}
