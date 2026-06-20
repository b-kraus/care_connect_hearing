import 'package:flutter_test/flutter_test.dart';
import 'package:care_connect_hearing/log_screen.dart';

void main() {
  group('AlertLogItem', () {
    test('creates confirmed item', () {
      const item = AlertLogItem(
        title: 'Take pill',
        time: '8:00 AM',
        dateSection: 'TODAY',
        isConfirmed: true,
      );
      expect(item.title, 'Take pill');
      expect(item.time, '8:00 AM');
      expect(item.dateSection, 'TODAY');
      expect(item.isConfirmed, true);
    });

    test('creates missed item', () {
      const item = AlertLogItem(
        title: 'Walk',
        time: '7:00 AM',
        dateSection: 'YESTERDAY',
        isConfirmed: false,
      );
      expect(item.title, 'Walk');
      expect(item.isConfirmed, false);
    });
  });
}
