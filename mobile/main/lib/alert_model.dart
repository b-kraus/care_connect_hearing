import 'package:flutter/material.dart';

class AlertItem {
  final String id;
  final String title;
  final String time;
  final String dateSection; // e.g., 'TODAY', 'YESTERDAY'
  final String setterName;
  bool isConfirmed;
  bool isMissed;

  AlertItem({
    required this.id,
    required this.title,
    required this.time,
    required this.dateSection,
    required this.setterName,
    this.isConfirmed = false,
    this.isMissed = false,
  });
}