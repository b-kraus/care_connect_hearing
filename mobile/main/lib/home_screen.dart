import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'state/alert_provider.dart';
import 'active_alert_screen.dart';
import 'emergency_alert_screen.dart';
import 'read_message_screen.dart';   // <--- Path to your messages design
import 'log_screen.dart';        // <--- Path to your log history design
import 'settings_screen.dart';   // <--- Path to your settings design

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentNavIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF000000),
      // Keeping the navigation bar safely locked at the bottom
      body: SafeArea(
        child: _buildDynamicBodyContent(),
      ),
      bottomNavigationBar: _buildGlobalBottomNavigationBar(),
    );
  }

  // --- DYNAMIC VIEW BODY ROUTER ---
  Widget _buildDynamicBodyContent() {
    switch (_currentNavIndex) {
      case 1:
        // Returns your exact original messages design completely intact
        return   const ReadMessageScreen(); 
      case 2:
        // Returns your exact original log history design completely intact
        return const LogScreen();      
      case 3:
        // Returns your exact original settings design completely intact
        return const SettingsScreen(); 
      case 0:
      default:
        // Returns the main home dashboard tab page
        return _buildMainDashboardPage();
    }
  }

  // =========================================================================
  // HOME TAB: ORIGINAL LIVE DASHBOARD (Header + Dynamic Alert Grid)
  // =========================================================================
  Widget _buildMainDashboardPage() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20.0),
      child: Consumer<AlertProvider>(
        builder: (context, alertProvider, child) {
          final activeAlerts = alertProvider.activeHomeAlerts;

          final activeNowAlerts = activeAlerts.where((a) => !(a['isMissed'] ?? false)).toList();
          final missedAlerts = activeAlerts.where((a) => (a['isMissed'] ?? false)).toList();

          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Care Connect Hearing',
                style: TextStyle(
                  color: Color(0xFFFFD600),
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  letterSpacing: 0.5,
                ),
              ),
              const SizedBox(height: 24),

              // Marcus Dashboard Header Row
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Good evening, Marcus',
                        style: TextStyle(
                          color: Color(0xFFFFD600),
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        'Tuesday, June 9',
                        style: TextStyle(
                          color: Colors.grey.shade400,
                          fontSize: 16,
                        ),
                      ),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: () {
                          final tempId = DateTime.now().millisecondsSinceEpoch.toString();
                          alertProvider.addAlert(tempId, 'Take blue pill');
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF0D47A1),
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
                        ),
                        child: const Text('Demo Alert Overlay'),
                      ),
                    ],
                  ),
                  
                  // Emergency Active Trigger Node Link
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => const EmergencyAlertScreen()),
                      );
                    },
                    child: Container(
                      width: 110,
                      height: 110,
                      decoration: const BoxDecoration(
                        color: Color(0xFFC62828),
                        shape: BoxShape.circle,
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: const [
                          Icon(Icons.warning_amber_rounded, color: Colors.white, size: 32),
                          SizedBox(height: 4),
                          Text(
                            'Emergency',
                            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 32),

              // Alert Grid Layout Component
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _buildSectionHeader('Active Now', const Color(0xFFFFD600)),
                        const SizedBox(height: 12),
                        if (activeNowAlerts.isEmpty)
                          _buildEmptyPlaceholder('No active items')
                        else
                          ...activeNowAlerts.map((alert) => _buildDashboardCard(
                                context: context,
                                id: alert['id'],
                                title: alert['title'],
                                time: '6:00 PM',
                                badgeText: 'Active Now',
                                badgeColor: const Color(0xFF2E7D32),
                                isMissed: false,
                              )),
                      ],
                    ),
                  ),
                  const SizedBox(width: 16),

                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _buildSectionHeader('Missed', const Color(0xFFFFD600)),
                        const SizedBox(height: 12),
                        if (missedAlerts.isEmpty)
                          _buildEmptyPlaceholder('No missed alerts')
                        else
                          ...missedAlerts.map((alert) => _buildDashboardCard(
                                context: context,
                                id: alert['id'],
                                title: alert['title'],
                                time: '2:00 PM',
                                badgeText: 'Missed',
                                badgeColor: const Color(0xFFC62828),
                                isMissed: true,
                              )),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 28),

              _buildSectionHeader('Awaiting Confirmation', const Color(0xFFFFD600)),
              const SizedBox(height: 12),
              _buildStaticFallbackCard('Blood pressure check', '5:30 PM', 'Awaiting Confirmation', const Color(0xFFE65100)),
              
              const SizedBox(height: 28),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  _buildSectionHeader('Completed Today (2)', const Color(0xFFFFD600)),
                  const Icon(Icons.add, color: Color(0xFFFFD600), size: 20),
                ],
              ),
              
              const SizedBox(height: 40),
              _buildDevTimeoutBar(alertProvider),
            ],
          );
        },
      ),
    );
  }

  // --- PERSISTENT BOTTOM NAVIGATION COMPONENT ---
  Widget _buildGlobalBottomNavigationBar() {
    return BottomNavigationBar(
      backgroundColor: const Color(0xFF000000),
      selectedItemColor: const Color(0xFFFFD600),
      unselectedItemColor: Colors.grey.shade600,
      currentIndex: _currentNavIndex,
      type: BottomNavigationBarType.fixed,
      items: const [
        BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
        BottomNavigationBarItem(icon: Icon(Icons.chat_bubble_outline), label: 'Messages'),
        BottomNavigationBarItem(icon: Icon(Icons.assignment_outlined), label: 'Log'),
        BottomNavigationBarItem(icon: Icon(Icons.settings), label: 'Settings'),
      ],
      onTap: (index) {
        setState(() {
          _currentNavIndex = index;
        });
      },
    );
  }

  // --- REUSABLE CARD & LABEL WIDGETS FOR HOME TAB ---
  Widget _buildSectionHeader(String text, Color color) {
    return Text(text, style: TextStyle(color: color, fontSize: 20, fontWeight: FontWeight.bold));
  }

  Widget _buildEmptyPlaceholder(String message) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(color: const Color(0xFF121212), borderRadius: BorderRadius.circular(8)),
      child: Text(message, style: const TextStyle(color: Colors.grey, fontSize: 14)),
    );
  }

  Widget _buildDashboardCard({
    required BuildContext context,
    required String id,
    required String title,
    required String time,
    required String badgeText,
    required Color badgeColor,
    required bool isMissed,
  }) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => ActiveAlertScreen(
              alertId: id,
              alertTitle: title,
              alertTime: time,
              isMissedInitialState: isMissed,
            ),
          ),
        );
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: const Color(0xFF1C1C1E),
          borderRadius: BorderRadius.circular(8),
          border: Border(left: BorderSide(color: badgeColor, width: 4)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(color: Color(0xFFFFD600), fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(height: 4),
            Text(time, style: const TextStyle(color: Colors.white70, fontSize: 14)),
            const SizedBox(height: 12),
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(color: badgeColor, borderRadius: BorderRadius.circular(4)),
                  child: Text(badgeText, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
                ),
                const SizedBox(width: 6),
                Text('Set by Sarah', style: TextStyle(color: Colors.grey.shade500, fontSize: 12)),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStaticFallbackCard(String title, String time, String badgeText, Color badgeColor) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1C1C1E),
        borderRadius: BorderRadius.circular(8),
        border: Border(left: BorderSide(color: badgeColor, width: 4)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(color: Color(0xFFFFD600), fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 4),
          Text(time, style: const TextStyle(color: Colors.white70, fontSize: 14)),
          const SizedBox(height: 12),
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(color: badgeColor, borderRadius: BorderRadius.circular(4)),
                child: Text(badgeText, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
              ),
              const SizedBox(width: 6),
              Text('Set by Sarah', style: TextStyle(color: Colors.grey.shade500, fontSize: 12)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDevTimeoutBar(AlertProvider provider) {
    return Row(
      children: [
        Expanded(
          child: OutlinedButton(
            style: OutlinedButton.styleFrom(
              foregroundColor: const Color(0xFFC62828),
              side: const BorderSide(color: Color(0xFFC62828)),
            ),
            onPressed: () {
              final activeNowAlerts = provider.activeHomeAlerts
                  .where((a) => !(a['isMissed'] ?? false))
                  .toList();

              if (activeNowAlerts.isNotEmpty) {
                final targetId = activeNowAlerts.last['id'];
                provider.flagAlertAsMissed(targetId);
              }
            },
            child: const Text('Dev Tools: Timeout Active Alert', style: TextStyle(fontSize: 12)),
          ),
        ),
      ],
    );
  }
}