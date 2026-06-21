import 'package:flutter/material.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;

class RecordMessageScreen extends StatefulWidget {
  const RecordMessageScreen({super.key});

  @override
  State<RecordMessageScreen> createState() => _RecordMessageScreenState();
}

class _RecordMessageScreenState extends State<RecordMessageScreen> {
  final stt.SpeechToText _speech = stt.SpeechToText();
  final TextEditingController _recipientController = TextEditingController(text: 'Sarah');
  bool _isListening = false;
  bool _speechAvailable = false;
  String _recordedText = '';
  String _statusMessage = 'Initializing...';

  @override
  void initState() {
    super.initState();
    _initSpeech();
  }

  @override
  void dispose() {
    _recipientController.dispose();
    super.dispose();
  }

  Future<void> _initSpeech() async {
    final available = await _speech.initialize(
      onStatus: (status) {
        setState(() {
          _statusMessage = 'Status: \$status';
          if (status == 'done' || status == 'notListening') {
            _isListening = false;
          }
        });
      },
      onError: (error) {
        setState(() {
          _statusMessage = 'Error: \${error.errorMsg}';
          _isListening = false;
        });
      },
    );
    setState(() {
      _speechAvailable = available;
      _statusMessage = available
          ? 'Ready. Tap the microphone to start recording.'
          : 'Speech recognition not available on this device';
    });
  }

  Future<void> _startRecording() async {
    if (!_speechAvailable) return;
    setState(() {
      _recordedText = '';
      _isListening = true;
      _statusMessage = 'Recording... speak now.';
    });
    await _speech.listen(
      onResult: (result) {
        setState(() {
          _recordedText = result.recognizedWords;
        });
      },
      listenFor: const Duration(seconds: 60),
      pauseFor: const Duration(seconds: 3),
      partialResults: true,
      cancelOnError: true,
    );
  }

  Future<void> _stopRecording() async {
    await _speech.stop();
    setState(() {
      _isListening = false;
      _statusMessage = _recordedText.isEmpty
          ? 'Nothing recorded. Try again.'
          : 'Recording complete. Review and send.';
    });
  }

  void _sendMessage() {
    if (_recordedText.isEmpty) return;
    final recipient = _recipientController.text;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Message sent to \$recipient'),
        backgroundColor: const Color(0xFF2E7D32),
      ),
    );
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) Navigator.pop(context);
    });
  }

  void _clearRecording() {
    setState(() {
      _recordedText = '';
      _statusMessage = 'Ready. Tap the microphone to start recording.';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF000000),
      appBar: AppBar(
        backgroundColor: const Color(0xFF000000),
        iconTheme: const IconThemeData(color: Color(0xFFFFD600)),
        elevation: 0,
        title: const Text(
          'Record Message',
          style: TextStyle(color: Color(0xFFFFD600), fontSize: 24, fontWeight: FontWeight.bold),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text('To:', style: TextStyle(color: Color(0xFFFFD600), fontSize: 16, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              TextField(
                controller: _recipientController,
                style: const TextStyle(color: Color(0xFFFFD600), fontSize: 18),
                decoration: InputDecoration(
                  filled: true,
                  fillColor: const Color(0xFF161616),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                    borderSide: const BorderSide(color: Color(0xFFFFD600), width: 2),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                    borderSide: const BorderSide(color: Color(0xFFFFD600), width: 2),
                  ),
                  contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                ),
              ),
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFF161616),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(
                    color: _isListening ? const Color(0xFFC62828) : const Color(0xFF333333),
                    width: 2,
                  ),
                ),
                child: Row(
                  children: [
                    Icon(
                      _isListening ? Icons.fiber_manual_record : Icons.mic_off,
                      color: _isListening ? const Color(0xFFC62828) : Colors.grey,
                      size: 24,
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(_statusMessage, style: const TextStyle(color: Color(0xFFFFD600), fontSize: 14)),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              Expanded(
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: const Color(0xFF161616),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: const Color(0xFFFFD600), width: 2),
                  ),
                  child: SingleChildScrollView(
                    child: Text(
                      _recordedText.isEmpty ? 'Your message will appear here as you speak.' : _recordedText,
                      style: TextStyle(
                        color: _recordedText.isEmpty ? Colors.grey : const Color(0xFFFFD600),
                        fontSize: 28,
                        fontWeight: FontWeight.w600,
                        height: 1.4,
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                height: 64,
                child: ElevatedButton.icon(
                  onPressed: _speechAvailable ? (_isListening ? _stopRecording : _startRecording) : null,
                  icon: Icon(_isListening ? Icons.stop : Icons.mic, color: Colors.white, size: 28, semanticLabel: 'Toggle voice recording'),
                  label: Text(
                    _isListening ? 'STOP RECORDING' : 'START RECORDING',
                    style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold, letterSpacing: 1.2),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: _isListening ? const Color(0xFFC62828) : const Color(0xFF1565C0),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              if (_recordedText.isNotEmpty && !_isListening)
                Row(
                  children: [
                    Expanded(
                      child: OutlinedButton(
                        onPressed: _clearRecording,
                        style: OutlinedButton.styleFrom(
                          side: const BorderSide(color: Color(0xFFFFD600), width: 2),
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                        ),
                        child: const Text('CLEAR', style: TextStyle(color: Color(0xFFFFD600), fontSize: 16, fontWeight: FontWeight.bold)),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      flex: 2,
                      child: ElevatedButton.icon(
                        onPressed: _sendMessage,
                        icon: const Icon(Icons.send, color: Colors.white, size: 20, semanticLabel: 'Send message'),
                        label: const Text('SEND', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF2E7D32),
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
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
  }
}
