import 'package:flutter/material.dart';

class AlertProvider extends ChangeNotifier {
  // This is the single source of truth for the logs
  final List<String> _logs = [];

  // Other screens will use this to read the logs
  List<String> get logs => _logs;

  // Screens will call this function to add a new log
  void addLog(String message) {
    final timestamp = DateTime.now().toLocal().toString().split('.')[0];
    _logs.add('[$timestamp] $message');
    
    // This tells the UI to refresh wherever logs are displayed
    notifyListeners(); 
  }
}