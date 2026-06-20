import 'package:flutter_test/flutter_test.dart';
import 'package:care_connect_hearing/state/alert_provider.dart';

void main() {
  group('AlertProvider', () {
    late AlertProvider provider;
    setUp(() { provider = AlertProvider(); });

    test('initial state empty', () {
      expect(provider.logs, isEmpty);
      expect(provider.activeHomeAlerts, isEmpty);
    });

    test('addLog adds entry', () {
      provider.addLog('Test');
      expect(provider.logs.length, 1);
    });

    test('addAlert adds to both', () {
      provider.addAlert('1', 'Pill');
      expect(provider.activeHomeAlerts.length, 1);
      expect(provider.logs.last, contains('Pill'));
    });

    test('logConfirmedAlert removes', () {
      provider.addAlert('1', 'Pill');
      provider.logConfirmedAlert('1', 'Pill');
      expect(provider.activeHomeAlerts, isEmpty);
      expect(provider.logs.last, contains('Confirmed'));
    });

    test('flagAlertAsMissed', () {
      provider.addAlert('1', 'Pill');
      provider.flagAlertAsMissed('1');
      expect(provider.activeHomeAlerts.first['isMissed'], true);
      expect(provider.logs.last, contains('Missed'));
    });

    test('flagAlertAsMissed bad id', () {
      provider.addAlert('1', 'Pill');
      provider.flagAlertAsMissed('999');
      expect(provider.activeHomeAlerts.first['isMissed'], false);
    });

    test('acknowledgeMissedAlert', () {
      provider.addAlert('1', 'Pill');
      provider.acknowledgeMissedAlert('1');
      expect(provider.activeHomeAlerts, isEmpty);
    });

    test('clearLogs', () {
      provider.addLog('X');
      provider.addAlert('1', 'Y');
      provider.clearLogs();
      expect(provider.logs, isEmpty);
      expect(provider.activeHomeAlerts, isEmpty);
    });

    test('multiple alerts', () {
      provider.addAlert('1', 'A');
      provider.addAlert('2', 'B');
      expect(provider.activeHomeAlerts.length, 2);
    });

    test('notifyListeners fires', () {
      int c = 0;
      provider.addListener(() => c++);
      provider.addLog('X');
      provider.addAlert('1', 'Y');
      provider.clearLogs();
      expect(c, 3);
    });
  });
}
