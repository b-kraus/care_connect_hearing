import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'state/alert_provider.dart';

class LogScreen extends StatefulWidget {
  const LogScreen({super.key});

  @override
  State<LogScreen> createState() => _LogScreenState();
}

class _LogScreenState extends State<LogScreen> {
  bool _isFamilyView = false;
  String _activeFilter = 'All'; // Track active view state: 'All', 'Confirmed', 'Missed'
  final ScrollController _logScrollController = ScrollController();

  @override
  void dispose() {
    _logScrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Theme(
      data: Theme.of(context).copyWith(
        scrollbarTheme: ScrollbarThemeData(
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
          automaticallyImplyLeading: false, 
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
        body: Consumer<AlertProvider>(
          builder: (context, alertProvider, child) {
            // 1. Filter the logs dynamically based on the string prefix
            final allLogs = alertProvider.logs;
            
            final filteredLogs = allLogs.where((log) {
              if (_activeFilter == 'Confirmed') {
                return log.startsWith('Confirmed:');
              } else if (_activeFilter == 'Missed') {
                return log.startsWith('Missed:');
              }
              // 'All' displays both Confirmed and Missed entries, ignoring raw system entries
              return log.startsWith('Confirmed:') || log.startsWith('Missed:');
            }).toList();

            return Column(
              children: [
                _buildLatestActivityBanner(allLogs),
                _buildToggleHeader(),
                _buildFilterChips(),

                // Scrollable Dynamic Canvas List
                Expanded(
                  child: Scrollbar(
                    controller: _logScrollController,
                    thumbVisibility: true,
                    child: filteredLogs.isEmpty
                        ? Center(
                            child: Text(
                              'No matching $_activeFilter alerts found',
                              style: const TextStyle(color: Colors.grey, fontSize: 16),
                            ),
                          )
                        : ListView.builder(
                            controller: _logScrollController,
                            padding: const EdgeInsets.symmetric(vertical: 8.0),
                            itemCount: filteredLogs.length,
                            itemBuilder: (context, index) {
                              final rawLog = filteredLogs[index];
                              
                              // Check the real status of this specific app-generated log
                              final bool isConfirmed = rawLog.startsWith('Confirmed:');
                              
                              // Strip off the prefix indicator tags cleanly for the text rendering title
                              final displayTitle = rawLog
                                  .replaceAll('Confirmed: ', '')
                                  .replaceAll('Missed: ', '');

                              bool showHeader = (index == 0);

                              return Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  if (showHeader) _buildSectionHeader('TODAY'),
                                  _buildLogTile(
                                    title: displayTitle,
                                    time: 'Just Now', 
                                    isConfirmed: isConfirmed, // Dynamic color and icons match status
                                  ),
                                ],
                              );
                            },
                          ),
                  ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }

  Widget _buildLatestActivityBanner(List<String> logs) {
    if (logs.isEmpty) {
      return Container(
        margin: const EdgeInsets.all(16.0),
        padding: const EdgeInsets.all(12.0),
        decoration: BoxDecoration(
          color: const Color(0xFF161616),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: const Color(0xFFFFD600), width: 1),
        ),
        child: Row(
          children: const [
            Icon(Icons.notifications_none, color: Color(0xFFFFD600), size: 20),
            SizedBox(width: 8),
            Expanded(
              child: Text(
                'No live events yet. Trigger alerts to see activity here.',
                style: TextStyle(color: Colors.grey, fontSize: 13),
              ),
            ),
          ],
        ),
      );
    }
    
    final latest = logs.last;
    return Container(
      margin: const EdgeInsets.all(16.0),
      padding: const EdgeInsets.all(12.0),
      decoration: BoxDecoration(
        color: const Color(0xFF161616),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: const Color(0xFFFFD600), width: 2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.notifications_active, color: Color(0xFFFFD600), size: 20),
              const SizedBox(width: 8),
              const Text(
                'LATEST ACTIVITY',
                style: TextStyle(
                  color: Color(0xFFFFD600),
                  fontSize: 13,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1.0,
                ),
              ),
              const Spacer(),
              Text(
                '${logs.length} ${logs.length == 1 ? "event" : "events"}',
                style: TextStyle(color: Colors.grey.shade500, fontSize: 12),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            latest,
            style: const TextStyle(color: Color(0xFFFFD600), fontSize: 14, fontWeight: FontWeight.w600),
          ),
        ],
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