import 'package:flutter/material.dart';
import 'alert_model.dart';
import 'home_screen.dart';
import 'log_screen.dart';
import 'settings_screen.dart';

class MainNavigationShell extends StatefulWidget {
  const MainNavigationShell({super.key});

  @override
  State<MainNavigationShell> createState() => _MainNavigationShellState();
}

class _MainNavigationShellState extends State<MainNavigationShell> {
  int _currentIndex = 0;

  // Master live alert database state shared across screens
  late final List<AlertItem> _liveAlerts;

  @override
  void initState() {
    super.initState();
    _liveAlerts = [
      AlertItem(
        id: '1',
        title: 'Take blue pill',
        time: '6:00 PM',
        dateSection: 'TODAY',
        setterName: 'Sarah',
      ),
      AlertItem(
        id: '2',
        title: 'Blood pressure check',
        time: '5:30 PM',
        dateSection: 'TODAY',
        setterName: 'Sarah',
      ),
      AlertItem(
        id: '3',
        title: 'Physical therapy session',
        time: '2:00 PM',
        dateSection: 'TODAY',
        setterName: 'Sarah',
        isMissed: true, // Marked as missed out of the gate
      ),
    ];
  }

  // Callback action to modify alert records from the dashboard cards
  void _toggleAlertConfirmation(String id) {
    setState(() {
      final alert = _liveAlerts.firstWhere((item) => item.id == id);
      alert.isConfirmed = !alert.isConfirmed;
      if (alert.isConfirmed) {
        alert.isMissed = false; // A confirmed item cannot simultaneously remain missed
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    // Dynamic generation array passing tracking references Downstream
    final List<Widget> screens = [
      HomeScreen(
        alerts: _liveAlerts,
        onConfirmToggle: _toggleAlertConfirmation,
      ),
      const Center(child: Text('Messages Screen', style: TextStyle(color: Colors.white, fontSize: 18))),
      LogScreen(alerts: _liveAlerts), // Feeds live elements down to history canvas directly
      const SettingsScreen(),
    ];

    return Scaffold(
      backgroundColor: const Color(0xFF000000),
      body: screens[_currentIndex],
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          border: Border(top: BorderSide(color: Color(0xFF2C2C2E), width: 1)),
        ),
        child: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: (index) => setState(() => _currentIndex = index),
          type: BottomNavigationBarType.fixed,
          backgroundColor: const Color(0xFF161616),
          selectedItemColor: const Color(0xFFFFD600),
          unselectedItemColor: Colors.grey.shade500,
          selectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
          unselectedLabelStyle: const TextStyle(fontSize: 12),
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
            BottomNavigationBarItem(icon: Icon(Icons.chat_bubble), label: 'Messages'),
            BottomNavigationBarItem(icon: Icon(Icons.assignment), label: 'Log'),
            BottomNavigationBarItem(icon: Icon(Icons.settings), label: 'Settings'),
          ],
        ),
      ),
    );
  }
}