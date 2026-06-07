import 'package:flutter/material.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;

class ReadMessageScreen extends StatefulWidget {
  const ReadMessageScreen({super.key});

  @override
  State<ReadMessageScreen> createState() => _ReadMessageScreenState();
}

class _ReadMessageScreenState extends State<ReadMessageScreen> {
  final stt.SpeechToText _speech = stt.SpeechToText();
  bool _isListening = false;
  bool _speechAvailable = false;
  String _transcribedText = '';
  String _statusMessage = 'Tap the microphone to start listening';
  double _confidence = 0.0;

  @override
  void initState() {
    super.initState();
    _initSpeech();
  }

  Future<void> _initSpeech() async {
    final available = await _speech.initialize(
      onStatus: (status) {
        setState(() {
          _statusMessage = 'Status: $status';
          if (status == 'done' || status == 'notListening') {
            _isListening = false;
          }
        });
      },
      onError: (error) {
        setState(() {
          _statusMessage = 'Error: ${error.errorMsg}';
          _isListening = false;
        });
      },
    );
    setState(() {
      _speechAvailable = available;
      if (!available) {
        _statusMessage = 'Speech recognition not available on this device';
      } else {
        _statusMessage = 'Ready. Tap the microphone to start listening.';
      }
    });
  }

  Future<void> _startListening() async {
    if (!_speechAvailable) return;
    setState(() {
      _transcribedText = '';
      _isListening = true;
      _statusMessage = 'Listening...';
    });
    await _speech.listen(
      onResult: (result) {
        setState(() {
          _transcribedText = result.recognizedWords;
          _confidence = result.confidence;
        });
      },
      listenFor: const Duration(seconds: 30),
      pauseFor: const Duration(seconds: 3),
      partialResults: true,
      cancelOnError: true,
    );
  }

  Future<void> _stopListening() async {
    await _speech.stop();
    setState(() {
      _isListening = false;
      _statusMessage = 'Stopped. Tap the microphone to start again.';
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
          'Read Message',
          style: TextStyle(
            color: Color(0xFFFFD600),
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Status indicator
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFF161616),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(
                    color: _isListening
                        ? const Color(0xFF2E7D32)
                        : const Color(0xFF333333),
                    width: 2,
                  ),
                ),
                child: Row(
                  children: [
                    Icon(
                      _isListening ? Icons.mic : Icons.mic_off,
                      color: _isListening
                          ? const Color(0xFF2E7D32)
                          : Colors.grey,
                      size: 24,
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        _statusMessage,
                        style: const TextStyle(
                          color: Color(0xFFFFD600),
                          fontSize: 14,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Transcribed text display - large for readability
              Expanded(
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: const Color(0xFF161616),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: const Color(0xFFFFD600),
                      width: 2,
                    ),
                  ),
                  child: SingleChildScrollView(
                    child: Text(
                      _transcribedText.isEmpty
                          ? 'Transcribed text will appear here in large readable letters.'
                          : _transcribedText,
                      style: TextStyle(
                        color: _transcribedText.isEmpty
                            ? Colors.grey
                            : const Color(0xFFFFD600),
                        fontSize: 32,
                        fontWeight: FontWeight.w600,
                        height: 1.4,
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // Confidence indicator (when text exists)
              if (_transcribedText.isNotEmpty && _confidence > 0)
                Text(
                  'Confidence: ${(_confidence * 100).toStringAsFixed(0)}%',
                  style: const TextStyle(
                    color: Colors.grey,
                    fontSize: 12,
                  ),
                ),
              const SizedBox(height: 16),

              // Big mic button
              SizedBox(
                width: double.infinity,
                height: 72,
                child: ElevatedButton.icon(
                  onPressed: _speechAvailable
                      ? (_isListening ? _stopListening : _startListening)
                      : null,
                  icon: Icon(
                    _isListening ? Icons.stop : Icons.mic,
                    color: Colors.white,
                    size: 32,
                  ),
                  label: Text(
                    _isListening ? 'STOP LISTENING' : 'START LISTENING',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1.2,
                    ),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: _isListening
                        ? const Color(0xFFC62828)
                        : const Color(0xFF1565C0),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 12),

              // Helper text
              const Text(
                'Speech-to-text uses your device built-in engine (WCAG-compliant local transcription).',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.grey,
                  fontSize: 12,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
