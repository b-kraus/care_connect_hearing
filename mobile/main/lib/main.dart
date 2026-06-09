import 'package:flutter/material.dart';
import 'package:provider/provider.dart'; 
import 'onboarding_screen.dart'; // Import the onboarding screen script
import 'state/alert_provider.dart';

void main() {
  runApp(
  
    ChangeNotifierProvider(
      create: (context) => AlertProvider(),
      child: const CareConnectApp(),
    ),
  );
}

class CareConnectApp extends StatelessWidget {
  const CareConnectApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Care Connect Hearing',
      debugShowCheckedModeBanner: false, // Optional: Removes the debug banner
      home: const OnboardingScreen(), // Points directly to the onboarding file
    );
  }
}