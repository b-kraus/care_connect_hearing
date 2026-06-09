import 'package:care_connect_hearing/settings_screen.dart';
import 'package:flutter/material.dart';
import 'log_screen.dart'; 
import 'emergency_alert_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  // List of screens to display based on the selected bottom navigation tab
  late final List<Widget> _screens;

  @override
  void initState() {
    super.initState();
    _screens = [
      _buildHomeDashboard(),                       // Tab 0: Home Dashboard
      _buildPlaceholderScreen('Messages Screen'),   // Tab 1: Messages Placeholder
      const LogScreen(),                           // Tab 2: Your updated Log Screen
      const SettingsScreen(),   // Tab 3: Settings Placeholder
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF000000),
      // Displays the active screen from our navigation array
      body: _screens[_currentIndex],
      
      // ============================================
      // SYSTEM BOTTOM NAVIGATION BAR
      // ============================================
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          border: Border(
            top: BorderSide(color: Color(0xFF2C2C2E), width: 1), // Subtle top divider rule
          ),
        ),
        child: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: (index) {
            setState(() {
              _currentIndex = index;
            });
          },
          type: BottomNavigationBarType.fixed,
          backgroundColor: const Color(0xFF161616),
          selectedItemColor: const Color(0xFFFFD600), // App accent yellow for active tab
          unselectedItemColor: Colors.grey.shade500,  // Dim grey for inactive tabs
          selectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
          unselectedLabelStyle: const TextStyle(fontSize: 12),
          items: const [
            BottomNavigationBarItem(
              icon: Padding(
                padding: EdgeInsets.only(bottom: 4),
                child: Icon(Icons.home_outlined),
              ),
              activeIcon: Padding(
                padding: EdgeInsets.only(bottom: 4),
                child: Icon(Icons.home),
              ),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Padding(
                padding: EdgeInsets.only(bottom: 4),
                child: Icon(Icons.chat_bubble_outline),
              ),
              activeIcon: Padding(
                padding: EdgeInsets.only(bottom: 4),
                child: Icon(Icons.chat_bubble),
              ),
              label: 'Messages',
            ),
            BottomNavigationBarItem(
              icon: Padding(
                padding: EdgeInsets.only(bottom: 4),
                child: Icon(Icons.assignment_outlined),
              ),
              activeIcon: Padding(
                padding: EdgeInsets.only(bottom: 4),
                child: Icon(Icons.assignment),
              ),
              label: 'Log',
            ),
            BottomNavigationBarItem(
              icon: Padding(
                padding: EdgeInsets.only(bottom: 4),
                child: Icon(Icons.settings_outlined),
              ),
              activeIcon: Padding(
                padding: EdgeInsets.only(bottom: 4),
                child: Icon(Icons.settings),
              ),
              label: 'Settings',
            ),
          ],
        ),
      ),
    );
  }

  // Sub-Layout Module: Houses the dashboard grid view code
  Widget _buildHomeDashboard() {
    return Scaffold(
      backgroundColor: const Color(0xFF000000),
      appBar: AppBar(
        backgroundColor: const Color(0xFF161616),
        elevation: 0,
        automaticallyImplyLeading: false,
        title: const Text(
          'Care Connect Hearing',
          style: TextStyle(
            color: Color(0xFFFFD600),
            fontSize: 22,
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings, color: Color(0xFFFFD600)),
            onPressed: () {
              // Directly jumps to Settings tab index
              setState(() => _currentIndex = 3);
            },
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // TOP BANNER: GREETINGS & EMERGENCY BADGE
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Good afternoon, Marcus',
                        style: TextStyle(
                          color: Color(0xFFFFD600),
                          fontSize: 32,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        'Saturday, June 6',
                        style: TextStyle(
                          color: Colors.grey.shade400,
                          fontSize: 16,
                        ),
                      ),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF1565C0),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(6),
                          ),
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        ),
                        child: const Text(
                          'Demo Alert Overlay',
                          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                ),
                
                // Red Floating Emergency Contact Node
                GestureDetector(
                  onTap: () {
                    print('Red button clicked!');
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const EmergencyAlertScreen()),
                    );
                  },
                  child: Container(
                    width: 130,
                    height: 130,
                    decoration: const BoxDecoration(
                      color: Color(0xFFC62828),
                      shape: BoxShape.circle,
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.warning_amber_rounded, color: Colors.white, size: 36),
                        const SizedBox(height: 4),
                        Text(
                          'Emergency'.toUpperCase(),
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 13,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            
            const SizedBox(height: 40),

            // SPLIT COLUMN ALERT WORKSPACE GRID
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // LEFT GRID SIDE
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _buildSectionHeader('Active Now'),
                      _buildDashboardCard(
                        title: 'Take blue pill',
                        time: '6:00 PM',
                        statusLabel: 'Active Now',
                        statusColor: const Color(0xFF2E7D32),
                        setterName: 'Sarah',
                      ),
                      const SizedBox(height: 24),
                      _buildSectionHeader('Awaiting Confirmation'),
                      _buildDashboardCard(
                        title: 'Blood pressure check',
                        time: '5:30 PM',
                        statusLabel: 'Awaiting Confirmation',
                        statusColor: const Color(0xFFEF6C00),
                        setterName: 'Sarah',
                      ),
                    ],
                  ),
                ),
                
                const SizedBox(width: 32),
                
                // RIGHT GRID SIDE
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _buildSectionHeader('Missed'),
                      _buildDashboardCard(
                        title: 'Physical therapy session',
                        time: '2:00 PM',
                        statusLabel: 'Missed',
                        statusColor: const Color(0xFFC62828),
                        setterName: 'Sarah',
                      ),
                      const SizedBox(height: 24),
                      
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          _buildSectionHeader('Completed Today (2)'),
                          const Icon(Icons.add, color: Color(0xFFFFD600), size: 24),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: Text(
        text,
        style: const TextStyle(
          color: Color(0xFFFFD600),
          fontSize: 22,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget _buildDashboardCard({
    required String title,
    required String time,
    required String statusLabel,
    required Color statusColor,
    required String setterName,
  }) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: const Color(0xFF161616),
        borderRadius: BorderRadius.circular(12),
        border: Border(
          left: BorderSide(color: statusColor, width: 6),
        ),
      ),
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              color: Color(0xFFFFD600),
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            time,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 14,
            ),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: statusColor,
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  statusLabel,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Text(
                'Set by $setterName',
                style: TextStyle(
                  color: Colors.grey.shade500,
                  fontSize: 13,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // Placeholder utility helper for unset pages
  Widget _buildPlaceholderScreen(String title) {
    return Center(
      child: Text(
        title,
        style: const TextStyle(color: Colors.white, fontSize: 18),
      ),
    );
  }
}
