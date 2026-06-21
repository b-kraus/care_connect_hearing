import 'package:flutter/material.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  final ScrollController _scrollController = ScrollController();

  // Slider and Toggle States
  double _flashSpeed = 2.0;       
  double _vibrationStrength = 2.0; 
  double _textSize = 100.0;        
  bool _highContrast = true;

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  String _getFlashLabel(double value) {
    if (value == 1.0) return 'Slow';
    if (value == 3.0) return 'Fast';
    return 'Medium';
  }

  String _getFlashFrequency(double value) {
    if (value == 1.0) return '0.8 flashes per second';
    if (value == 3.0) return '2.8 flashes per second';
    return '1.8 flashes per second';
  }

  String _getVibrationLabel(double value) {
    if (value == 1.0) return 'Gentle';
    if (value == 3.0) return 'Strong';
    return 'Medium';
  }

  String _getVibrationPulse(double value) {
    if (value == 1.0) return '100 ms pulse';
    if (value == 3.0) return '400 ms pulse';
    return '225 ms pulse';
  }

  @override
  Widget build(BuildContext context) {
    final double availableWidth = MediaQuery.of(context).size.width;
    
    double cardWidth = (availableWidth - 80) / 3; 
    if (cardWidth < 280) { 
      cardWidth = availableWidth - 48; 
    }

    return Theme(
      data: Theme.of(context).copyWith(
        scrollbarTheme: ScrollbarThemeData(
          thumbColor: WidgetStateProperty.all(const Color(0xFFFFD600).withOpacity(0.6)),
          trackColor: WidgetStateProperty.all(const Color(0xFF161616)),
          trackBorderColor: WidgetStateProperty.all(Colors.transparent),
          radius: const Radius.circular(4),
          thickness: WidgetStateProperty.all(8.0),
        ),
        sliderTheme: SliderThemeData(
          trackHeight: 6,
          activeTrackColor: const Color(0xFFFFD600),
          inactiveTrackColor: const Color(0xFF333333),
          thumbColor: const Color(0xFFFFD600),
          overlayColor: const Color(0xFFFFD600).withOpacity(0.2),
          thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 14.0),
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
              Text(
                'CARE CONNECT HEARING',
                style: TextStyle(
                  color: const Color(0xFFFFD600).withOpacity(0.6),
                  fontSize: 12,
                  letterSpacing: 1.5,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const Text(
                'Settings',
                style: TextStyle(
                  color: Color(0xFFFFD600),
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          bottom: PreferredSize(
            preferredSize: const Size.fromHeight(1),
            child: Container(color: const Color(0xFF222222), height: 1),
          ),
        ),
        // FIXED: The Scrollbar now directly wraps SingleChildScrollView for cohesive shared controller pairing
        body: Scrollbar(
          controller: _scrollController,
          thumbVisibility: true, 
          trackVisibility: true, 
          child: SingleChildScrollView(
            controller: _scrollController, 
            padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 32.0),
            child: Column(
              children: [
                Wrap(
                  spacing: 16.0,    
                  runSpacing: 16.0, 
                  alignment: WrapAlignment.center,
                  children: [
                    SizedBox(width: cardWidth, child: _buildFlashCard()),
                    SizedBox(width: cardWidth, child: _buildVibrationCard()),
                    SizedBox(width: cardWidth, child: _buildTextCard()),
                  ],
                ),
                const SizedBox(height: 40),
                ElevatedButton(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Settings Saved Successfully!')),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF1565C0),
                    minimumSize: const Size(260, 56),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: const Text(
                    'Save Settings',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                const Text(
                  'Changes take effect after saving. Test each setting before saving.',
                  style: TextStyle(
                    color: Color(0xFFFFD600), // FIXED: Higher contrast color shade
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  // ============================================
  // PANEL 1: FLASH CARD 
  // ============================================
  Widget _buildFlashCard() {
    String currentLabel = _getFlashLabel(_flashSpeed);
    String currentFreq = _getFlashFrequency(_flashSpeed);

    return Container(
      height: 480,
      padding: const EdgeInsets.all(20),
      decoration: _cardBoxDecoration(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildCardHeader(Icons.flash_on, 'Flash'),
          const SizedBox(height: 24),
          const Text('Flash Speed', style: TextStyle(color: Color(0xFFFFD600), fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 16),
          Row(
            children: [
              const Text('Slow', style: TextStyle(color: Color(0xFFFFD600), fontSize: 14)), // FIXED
              Expanded(
                child: Slider(
                  value: _flashSpeed,
                  min: 1.0,
                  max: 3.0,
                  divisions: 2,
                  onChanged: (val) => setState(() => _flashSpeed = val),
                ),
              ),
              const Text('Fast', style: TextStyle(color: Color(0xFFFFD600), fontSize: 14)), // FIXED
            ],
          ),
          const SizedBox(height: 16),
          Text(
            'Flash Speed, currently $currentLabel — $currentFreq',
            style: const TextStyle(color: Color(0xFFFFD600), fontSize: 14, height: 1.4), // FIXED
          ),
          const Spacer(),
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: const Color(0xFFFFD600),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  currentLabel.toUpperCase(),
                  style: const TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 14),
                ),
              ),
              const SizedBox(width: 10),
              const Expanded(
                child: Text(
                  'Max 3/sec — WCAG 2.3.1',
                  style: TextStyle(color: Color(0xFFFFD600), fontSize: 12), // FIXED
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          _buildTestButton(),
        ],
      ),
    );
  }

  // ============================================
  // PANEL 2: VIBRATION CARD 
  // ============================================
  Widget _buildVibrationCard() {
    String currentLabel = _getVibrationLabel(_vibrationStrength);
    String currentPulse = _getVibrationPulse(_vibrationStrength);

    return Container(
      height: 480,
      padding: const EdgeInsets.all(20),
      decoration: _cardBoxDecoration(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildCardHeader(Icons.vibration, 'Vibration'),
          const SizedBox(height: 24),
          const Text('Vibration Strength', style: TextStyle(color: Color(0xFFFFD600), fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 16),
          Row(
            children: [
              const Text('Gentle', style: TextStyle(color: Color(0xFFFFD600), fontSize: 14)), // FIXED
              Expanded(
                child: Slider(
                  value: _vibrationStrength,
                  min: 1.0,
                  max: 3.0,
                  divisions: 2,
                  onChanged: (val) => setState(() => _vibrationStrength = val),
                ),
              ),
              const Text('Strong', style: TextStyle(color: Color(0xFFFFD600), fontSize: 14)), // FIXED
            ],
          ),
          const SizedBox(height: 16),
          Text(
            'Vibration Strength, currently $currentLabel',
            style: const TextStyle(color: Color(0xFFFFD600), fontSize: 14), // FIXED
          ),
          const Spacer(),
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: const Color(0xFFFFD600),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  currentLabel.toUpperCase(),
                  style: const TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 14),
                ),
              ),
              const SizedBox(width: 12),
              Text(
                currentPulse,
                style: const TextStyle(color: Color(0xFFFFD600), fontSize: 14), // FIXED
              ),
            ],
          ),
          const SizedBox(height: 20),
          _buildTestButton(),
        ],
      ),
    );
  }

  // ============================================
  // PANEL 3: TEXT CARD 
  // ============================================
  Widget _buildTextCard() {
    String sizePercentage = _textSize.toStringAsFixed(0);

    return Container(
      height: 480,
      padding: const EdgeInsets.all(20),
      decoration: _cardBoxDecoration(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildCardHeader(Icons.text_fields, 'Text'),
          const SizedBox(height: 24),
          const Text('Text Size', style: TextStyle(color: Color(0xFFFFD600), fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 16),
          Row(
            children: [
              const Text('100%', style: TextStyle(color: Color(0xFFFFD600), fontSize: 14)), // FIXED
              Expanded(
                child: Slider(
                  value: _textSize,
                  min: 100.0,
                  max: 200.0,
                  onChanged: (val) => setState(() => _textSize = val),
                ),
              ),
              const Text('200%', style: TextStyle(color: Color(0xFFFFD600), fontSize: 14)), // FIXED
            ],
          ),
          const SizedBox(height: 16),
          Text(
            'Text Size, currently $sizePercentage%',
            style: const TextStyle(color: Color(0xFFFFD600), fontSize: 14), // FIXED
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: const Color(0xFFFFD600),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text('$sizePercentage%', style: const TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 14)),
              ),
              const SizedBox(width: 12),
              const Text(
                'Preview text',
                style: TextStyle(color: Color(0xFFFFD600), fontSize: 16),
              ),
            ],
          ),
          const Spacer(),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              border: Border.all(color: const Color(0xFF333333)),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Expanded(
                  child: Text(
                    'High Contrast Theme',
                    style: TextStyle(color: Color(0xFFFFD600), fontSize: 14, fontWeight: FontWeight.bold),
                  ),
                ),
                Text(
                  _highContrast ? 'On' : 'Off',
                  style: const TextStyle(color: Color(0xFFFFD600), fontSize: 14), // FIXED
                ),
                Switch(
                  value: _highContrast,
                  onChanged: (val) => setState(() => _highContrast = val),
                  activeColor: const Color(0xFFFFD600),
                  activeTrackColor: const Color(0xFF554A00),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  BoxDecoration _cardBoxDecoration() => BoxDecoration(
        color: const Color(0xFF161616),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFF282828), width: 1),
      );

  Widget _buildCardHeader(IconData icon, String title) => Row(
        children: [
          CircleAvatar(
            backgroundColor: const Color(0xFFFFD600),
            radius: 18,
            child: Icon(icon, color: Colors.black, size: 20),
          ),
          const SizedBox(width: 12),
          Text(title, style: const TextStyle(color: Color(0xFFFFD600), fontSize: 20, fontWeight: FontWeight.bold)),
        ],
      );

  Widget _buildTestButton() => SizedBox(
        height: 48,
        width: double.infinity,
        child: ElevatedButton(
          onPressed: () {},
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFFFFD600),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
          ),
          child: const Text('Test', style: TextStyle(color: Colors.black, fontSize: 16, fontWeight: FontWeight.bold)),
        ),
      );
}