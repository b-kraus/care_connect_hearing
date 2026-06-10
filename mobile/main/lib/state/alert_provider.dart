import 'package:flutter/material.dart';

class AlertLogEntry {
  final String id;
  final String title;
  final String status; // 'Active', 'Confirmed', 'Missed', 'Acknowledged'

  AlertLogEntry({required this.id, required this.title, required this.status});
}

class AlertProvider extends ChangeNotifier {
  final List<String> _logs = [];
  final List<Map<String, dynamic>> _activeHomeAlerts = [];

  List<String> get logs => List.unmodifiable(_logs);
  List<Map<String, dynamic>> get activeHomeAlerts => _activeHomeAlerts;

  /// Trigger a brand new alert onto the home screen system
  void addAlert(String id, String title) {
    _activeHomeAlerts.add({
      'id': id,
      'title': title,
      'isMissed': false,
    });
    _logs.add('Active: $title');
    notifyListeners();
  }

  /// 1. CONFIRM: Logs the event, then completely removes it from the home screen
  void logConfirmedAlert(String id, String alertDetails) {
    _logs.add('Confirmed: $alertDetails');
    _activeHomeAlerts.removeWhere((item) => item['id'] == id); 
    notifyListeners(); 
  }

  /// 2. SYSTEM TIMEOUT: Flags an active alert as MISSED on the home screen
  void flagAlertAsMissed(String id) {
    final index = _activeHomeAlerts.indexWhere((item) => item['id'] == id);
    if (index != -1) {
      _activeHomeAlerts[index]['isMissed'] = true;
      _logs.add('Missed: ${_activeHomeAlerts[index]['title']}');
      notifyListeners();
    }
  }

  /// 3. ACKNOWLEDGE MISSED: Removes it from home view, but history retains the 'Missed' log
  void acknowledgeMissedAlert(String id) {
    _activeHomeAlerts.removeWhere((item) => item['id'] == id);
    notifyListeners();
  }

  void clearLogs() {
    _logs.clear();
    _activeHomeAlerts.clear();
    notifyListeners();
  }
}