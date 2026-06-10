import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'state/alert_provider.dart';

class ActiveAlertScreen extends StatefulWidget {
  final String alertId;
  final String alertTitle;
  final String alertTime;
  final bool isMissedInitialState;

  const ActiveAlertScreen({
    super.key,
    required this.alertId,
    required this.alertTitle,
    required this.alertTime,
    this.isMissedInitialState = false,
  });

  @override
  State<ActiveAlertScreen> createState() => _ActiveAlertScreenState();
}

class _ActiveAlertScreenState extends State<ActiveAlertScreen> with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<Color?> _colorAnimation;

  @override
  void initState() {
    super.initState();

    // 1. Set up the controller for the blinking background sequence
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );

    // 2. Initialize animation track safely before layout reads it
    _colorAnimation = ColorTween(
      begin: const Color(0xFF1C1C1E), // Muted dark charcoal
      end: const Color(0xFF3A0000),   // Deep warning crimson
    ).animate(_animationController);

    // 3. Loop the pulse animation
    _animationController.repeat(reverse: true);
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Listen to the provider to check if this alert has transitioned to missed dynamically
    return Consumer<AlertProvider>(
      builder: (context, alertProvider, child) {
        // Look up current status from our active list engine track
        final activeAlert = alertProvider.activeHomeAlerts.firstWhere(
          (element) => element['id'] == widget.alertId,
          orElse: () => {'id': widget.alertId, 'title': widget.alertTitle, 'isMissed': widget.isMissedInitialState},
        );

        final bool isMissed = activeAlert['isMissed'] ?? false;

        // Visual design properties adapt based on state context
        final Color themeColor = isMissed ? const Color(0xFFC62828) : const Color(0xFFFFD600);
        final String statusLabel = isMissed ? 'MISSED ALERT' : 'ACTIVE ALERT';

        return AnimatedBuilder(
          animation: _colorAnimation,
          builder: (context, child) {
            return Scaffold(
              // If missed, stop pulsing and lock to deep solid red; otherwise pulse background color
              backgroundColor: isMissed ? const Color(0xFF1A0000) : _colorAnimation.value,
              body: SafeArea(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 32.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      // Header Section
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                            decoration: BoxDecoration(
                              color: themeColor.withOpacity(0.15),
                              borderRadius: BorderRadius.circular(4),
                              border: Border.all(color: themeColor, width: 1),
                            ),
                            child: Text(
                              statusLabel,
                              style: TextStyle(
                                color: themeColor,
                                fontSize: 13,
                                fontWeight: FontWeight.bold,
                                letterSpacing: 1.5,
                              ),
                            ),
                          ),
                          const SizedBox(height: 32),
                          Icon(
                            isMissed ? Icons.error_outline : Icons.notifications_active,
                            color: themeColor,
                            size: 64,
                          ),
                        ],
                      ),

                      // Central Alert Summary Meta Canvas
                      Column(
                        children: [
                          Text(
                            widget.alertTitle,
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 28,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 12),
                          Text(
                            'Scheduled for ${widget.alertTime}',
                            style: TextStyle(
                              color: Colors.grey.shade400,
                              fontSize: 16,
                            ),
                          ),
                          if (isMissed) ...[
                            const SizedBox(height: 16),
                            const Text(
                              'This item was not confirmed on schedule. Acknowledging removes it from the home screen layout while retaining the missed record.',
                              textAlign: TextAlign.center,
                              style: TextStyle(color: Color(0xFFEF9A9A), fontSize: 14),
                            ),
                          ],
                        ],
                      ),

                      // Action Call Response Engine Blocks
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          if (!isMissed) ...[
                            // Action path A: Standard Confirmation
                            ElevatedButton(
                              onPressed: () {
                                Provider.of<AlertProvider>(context, listen: false).logConfirmedAlert(
                                  widget.alertId,
                                  widget.alertTitle,
                                );
                                Navigator.pop(context);
                              },
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFF2E7D32),
                                padding: const EdgeInsets.symmetric(vertical: 16),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                              ),
                              child: const Text(
                                'Confirm Alert',
                                style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                              ),
                            ),
                            const SizedBox(height: 12),
                          ],

                          if (isMissed) ...[
                            // Action path B: Missed Entry Acknowledgment
                            ElevatedButton(
                              onPressed: () {
                                Provider.of<AlertProvider>(context, listen: false).acknowledgeMissedAlert(
                                  widget.alertId,
                                );
                                Navigator.pop(context);
                              },
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFFC62828),
                                padding: const EdgeInsets.symmetric(vertical: 16),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                              ),
                              child: const Text(
                                'Acknowledge Missed Alert',
                                style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                              ),
                            ),
                            const SizedBox(height: 12),
                          ],

                          // Back / Dismiss view layout button 
                          TextButton(
                            onPressed: () => Navigator.pop(context),
                            style: TextButton.styleFrom(padding: const EdgeInsets.symmetric(vertical: 16)),
                            child: Text(
                              'Close View',
                              style: TextStyle(
                                color: Colors.grey.shade400,
                                fontSize: 16,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        );
      },
    );
  }
}