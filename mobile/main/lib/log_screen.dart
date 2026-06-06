import 'package:flutter/material.dart';

// Data model structural logic for managing filtered collections cleanly
class AlertLogItem {
  final String title;
  final String time;
  final String dateSection; // e.g., 'TODAY', 'YESTERDAY', 'MAY 28'
  final bool isConfirmed;

  const AlertLogItem({
    required this.title,
    required this.time,
    required this.dateSection,
    required this.isConfirmed,
  });
}

class LogScreen extends StatefulWidget {
  const LogScreen({super.key});

  @override
  State<LogScreen> createState() => _LogScreenState();
}

class _LogScreenState extends State<LogScreen> {
  bool _isFamilyView = false;
  String _activeFilter = 'All'; // Active state engine track: 'All', 'Confirmed', 'Missed'
  final ScrollController _logScrollController = ScrollController();

  // Master Alert Log Database
  final List<AlertLogItem> _masterAlerts = const [
    AlertLogItem(title: 'Take blue pill', time: '8:00 AM', dateSection: 'TODAY', isConfirmed: true),
    AlertLogItem(title: 'Morning walk', time: '7:00 AM', dateSection: 'TODAY', isConfirmed: false),
    AlertLogItem(title: 'Blood pressure check', time: '6:30 AM', dateSection: 'TODAY', isConfirmed: true),
    AlertLogItem(title: 'Take red capsule', time: '9:00 PM', dateSection: 'YESTERDAY', isConfirmed: true),
    AlertLogItem(title: 'Evening walk', time: '6:00 PM', dateSection: 'YESTERDAY', isConfirmed: false),
    AlertLogItem(title: 'Take blue pill', time: '8:00 AM', dateSection: 'MAY 28', isConfirmed: true),
  ];

  @override
  void dispose() {
    _logScrollController.dispose();
    super.dispose();
  }

  // Helper system to isolate active items dynamically based on chosen criteria
  List<AlertLogItem> _getFilteredAlerts() {
    if (_activeFilter == 'Confirmed') {
      return _masterAlerts.where((alert) => alert.isConfirmed).toList();
    } else if (_activeFilter == 'Missed') {
      return _masterAlerts.where((alert) => !alert.isConfirmed).toList();
    }
    return _masterAlerts;
  }

  @override
  Widget build(BuildContext context) {
    final filteredList = _getFilteredAlerts();

    return Theme(
      data: Theme.of(context).copyWith(
        scrollbarTheme: ScrollbarThemeData(
          // Satisfies the strict state requirement wrapper types in newer Flutter SDK distributions
          thumbColor: WidgetStateProperty.all(Colors.grey.shade600),
          thickness: WidgetStateProperty.all(6.0),
          radius: const Radius.circular(4),
        ),
      ),
      child: Scaffold(
        backgroundColor: const Color(0xFF000000),
        appBar: AppBar(
          backgroundColor: const Color(0xFF000000),
          elevation: 0,
          automaticallyImplyLeading: false, // Disables standard leading back button
          title: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Alert History',
                style: TextStyle(
                  color: Color(0xFFFFD600),
                  fontSize: 26,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                'Care Connect Hearing',
                style: TextStyle(
                  color: Colors.grey.shade400,
                  fontSize: 14,
                ),
              ),
            ],
          ),
          bottom: PreferredSize(
            preferredSize: const Size.fromHeight(1),
            child: Container(color: const Color(0xFFFFD600), height: 2),
          ),
        ),
        body: Column(
          children: [
            _buildToggleHeader(),
            _buildFilterChips(),

            // Dynamic Scrollable Item Canvas Block
            Expanded(
              child: Scrollbar(
                controller: _logScrollController,
                thumbVisibility: true,
                child: filteredList.isEmpty
                    ? const Center(
                        child: Text(
                          'No matching alerts found',
                          style: TextStyle(color: Colors.grey, fontSize: 16),
                        ),
                      )
                    : ListView.builder(
                        controller: _logScrollController,
                        padding: const EdgeInsets.symmetric(vertical: 8.0),
                        itemCount: filteredList.length,
                        itemBuilder: (context, index) {
                          final alert = filteredList[index];

                          // Shows section headers dynamically if the current index is first 
                          // or if the element context date changes relative to the prior entry block
                          bool showHeader = index == 0 || 
                              filteredList[index - 1].dateSection != alert.dateSection;

                          return Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              if (showHeader) _buildSectionHeader(alert.dateSection),
                              _buildLogTile(
                                title: alert.title,
                                time: alert.time,
                                isConfirmed: alert.isConfirmed,
                              ),
                            ],
                          );
                        },
                      ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildToggleHeader() {
    return Container(
      color: const Color(0xFF161616),
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
      child: Row(
        children: [
          const CircleAvatar(
            backgroundColor: Color(0xFF1976D2),
            radius: 18,
            child: Icon(Icons.person, color: Colors.white, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'My History',
                  style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                ),
                Text(
                  'Viewing your alert log',
                  style: TextStyle(color: Colors.grey.shade500, fontSize: 12),
                ),
              ],
            ),
          ),
          Text(
            'Mine',
            style: TextStyle(
              color: !_isFamilyView ? const Color(0xFFFFD600) : Colors.grey,
              fontWeight: FontWeight.bold,
            ),
          ),
          Switch(
            value: _isFamilyView,
            onChanged: (val) => setState(() => _isFamilyView = val),
            activeColor: const Color(0xFFFFD600),
            activeTrackColor: const Color(0xFF444444),
            inactiveThumbColor: Colors.grey.shade400,
            inactiveTrackColor: const Color(0xFF444444),
          ),
          Text(
            'Family',
            style: TextStyle(
              color: _isFamilyView ? const Color(0xFFFFD600) : Colors.grey,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterChips() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 16.0),
      child: Row(
        children: [
          _buildChip('All'),
          const SizedBox(width: 12),
          _buildChip('Confirmed'),
          const SizedBox(width: 12),
          _buildChip('Missed'),
        ],
      ),
    );
  }

  Widget _buildChip(String label) {
    final bool isSelected = _activeFilter == label;
    return GestureDetector(
      onTap: () => setState(() => _activeFilter = label),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        decoration: BoxDecoration(
          color: isSelected ? const Color(0xFFFFD600) : const Color(0xFF1C1C1E),
          borderRadius: BorderRadius.circular(24),
          border: Border.all(
            color: isSelected ? Colors.transparent : const Color(0xFF2C2C2E),
            width: 1,
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: isSelected ? Colors.black : Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 14,
          ),
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(left: 16.0, top: 16.0, bottom: 8.0),
      child: Text(
        title,
        style: const TextStyle(
          color: Color(0xFFFFD600),
          fontSize: 14,
          fontWeight: FontWeight.bold,
          letterSpacing: 1.0,
        ),
      ),
    );
  }

  Widget _buildLogTile({
    required String title,
    required String time,
    required bool isConfirmed,
  }) {
    final Color indicatorColor = isConfirmed ? const Color(0xFF2E7D32) : const Color(0xFFC62828);
    final IconData statusIcon = isConfirmed ? Icons.check_circle_outline : Icons.cancel_outlined;
    final String statusText = isConfirmed ? 'CONFIRMED' : 'MISSED';

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
      decoration: BoxDecoration(
        color: const Color(0xFF121212),
        border: Border(
          left: BorderSide(color: indicatorColor, width: 5),
        ),
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 6.0),
        leading: Icon(statusIcon, color: indicatorColor, size: 24),
        title: Text(
          title,
          style: const TextStyle(
            color: Color(0xFFFFD600),
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
        subtitle: Padding(
          padding: const EdgeInsets.only(top: 4.0),
          child: Text(
            '$time · Today',
            style: TextStyle(color: Colors.grey.shade500, fontSize: 13),
          ),
        ),
        trailing: Text(
          statusText,
          style: TextStyle(
            color: indicatorColor,
            fontWeight: FontWeight.bold,
            fontSize: 13,
            letterSpacing: 0.5,
          ),
        ),
      ),
    );
  }
}