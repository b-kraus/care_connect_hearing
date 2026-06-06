import 'package:flutter/material.dart';

class EmergencyAlertScreen extends StatelessWidget {
  const EmergencyAlertScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF000000),
      body: Stack(
        children: [
          // Sub-Header Tracker Title
          Positioned(
            top: 24,
            left: 0,
            right: 0,
            child: Center(
              child: Text(
                'Care Connect Hearing',
                style: TextStyle(
                  color: const Color(0xFFFFD600).withOpacity(0.8),
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ),

          // Central Action Layout Matrix
          Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text(
                    'Send Emergency Alert?',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Color(0xFFFFD600),
                      fontSize: 34,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 48),

                  // 1. SLIDER CONSTRAINTS FIXED BELOW
                  Container(
                    width: double.infinity,
                    constraints: const BoxConstraints(maxWidth: 450), // Fixed named parameter
                    height: 64,
                    decoration: BoxDecoration(
                      color: const Color(0xFFC62828), // Red background track
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Dismissible(
                      key: const Key('sos_slider_key'),
                      direction: DismissDirection.startToEnd,
                      onDismissed: (direction) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('SOS Emergency Alert Dispatched!'),
                            backgroundColor: Colors.green,
                          ),
                        );
                        Navigator.pop(context); // Return home safely
                      },
                      child: Row(
                        children: [
                          // Yellow Action Handle Button
                          Container(
                            width: 72,
                            height: 64,
                            decoration: const BoxDecoration(
                              color: Color(0xFFFFD600),
                              borderRadius: BorderRadius.only(
                                topLeft: Radius.circular(8),
                                bottomLeft: Radius.circular(8),
                              ),
                            ),
                            child: const Icon(
                              Icons.keyboard_double_arrow_right_rounded,
                              color: Colors.black,
                              size: 32,
                            ),
                          ),
                          const Expanded(
                            child: Center(
                              child: Padding(
                                padding: EdgeInsets.only(right: 72.0),
                                child: Text(
                                  'Slide right to send SOS',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 18,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),

                  // 2. CANCEL BUTTON CONSTRAINTS FIXED BELOW
                  Container(
                    width: double.infinity,
                    constraints: const BoxConstraints(maxWidth: 450), // Fixed named parameter
                    height: 60, 
                    child: OutlinedButton(
                      onPressed: () {
                        Navigator.pop(context); // Safely returns to Home Dashboard
                      },
                      style: OutlinedButton.styleFrom(
                        side: const BorderSide(color: Colors.white, width: 2),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      child: const Text(
                        'Cancel Action',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Lower Info Helper Floating Icon Node
          Positioned(
            bottom: 24,
            right: 24,
            child: Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.grey.shade900,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.help_outline_rounded,
                color: Colors.grey,
                size: 24,
              ),
            ),
          ),
        ],
      ),
    );
  }
}