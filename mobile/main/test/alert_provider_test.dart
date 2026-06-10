import 'package:flutter_test/flutter_test.dart';
import 'package:care_connect_hearing/state/alert_provider.dart';

void main() {
  group('AlertProvider', () {
    late AlertProvider provider;

    setUp(() {
      provider = AlertProvider();
    });

    test('initial logs list is empty', () {
      expect(provider.logs, isEmpty);
    });

    test('addLog adds a timestamped entry', () {
      provider.addLog('Test message');
      expect(provider.logs.length, 1);
      expect(provider.logs.first, contains('Test message'));
    });

    test('addLog includes timestamp in brackets', () {
      provider.addLog('SOS Alert');
      expect(provider.logs.first, matches(RegExp(r'^\[.*\] SOS Alert$')));
    });

    test('multiple logs accumulate', () {
      provider.addLog('First');
      provider.addLog('Second');
      provider.addLog('Third');
      expect(provider.logs.length, 3);
    });

    test('notifyListeners is called on addLog', () {
      int callCount = 0;
      provider.addListener(() => callCount++);
      provider.addLog('Test');
      expect(callCount, 1);
    });
  });
}
