import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';

export default function ReadMessageScreen() {
  const [isListening, setIsListening] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [status, setStatus] = useState('Ready. Tap the microphone to start listening.');

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      setStatus('Stopped. Tap the microphone to start again.');
    } else {
      setIsListening(true);
      setStatus('Listening...');
      setTranscribedText('');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.title}>Read Message</Text>
      </View>

      <View style={styles.container}>
        <View style={[styles.statusBox, isListening && styles.statusActive]}>
          <Text style={styles.statusIcon}>{isListening ? '🎙️' : '🎙️'}</Text>
          <Text style={styles.statusText}>{status}</Text>
        </View>

        <View style={styles.textArea}>
          <Text style={transcribedText ? styles.transcribed : styles.placeholder}>
            {transcribedText || 'Transcribed text will appear here in large readable letters.'}
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.micButton,
            isListening && styles.micButtonStop,
            pressed && styles.buttonPressed,
          ]}
          onPress={toggleListening}
        >
          <Text style={styles.micButtonText}>
            {isListening ? '⏹ STOP LISTENING' : '🎙️ START LISTENING'}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.newMessageFab, pressed && styles.buttonPressed]}
          onPress={() => router.push('/record-message')}
        >
          <Text style={styles.fabText}>✏️ New Message</Text>
        </Pressable>

        <Text style={styles.wcagNote}>
          Speech-to-text uses your device built-in engine (WCAG-compliant local transcription).
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, paddingTop: 8 },
  backArrow: { color: '#FFD600', fontSize: 28, marginRight: 16 },
  title: { color: '#FFD600', fontSize: 24, fontWeight: 'bold' },
  container: { flex: 1, padding: 24 },
  statusBox: { padding: 12, backgroundColor: '#161616', borderRadius: 8, borderWidth: 2, borderColor: '#333', flexDirection: 'row', alignItems: 'center' },
  statusActive: { borderColor: '#2E7D32' },
  statusIcon: { fontSize: 20, marginRight: 12 },
  statusText: { color: '#FFD600', fontSize: 14, flex: 1 },
  textArea: { flex: 1, marginTop: 24, backgroundColor: '#161616', borderRadius: 12, borderWidth: 2, borderColor: '#FFD600', padding: 20 },
  placeholder: { color: '#888', fontSize: 32, fontWeight: '600', lineHeight: 44 },
  transcribed: { color: '#FFD600', fontSize: 32, fontWeight: '600', lineHeight: 44 },
  micButton: { backgroundColor: '#1565C0', height: 72, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 16 },
  micButtonStop: { backgroundColor: '#C62828' },
  micButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  newMessageFab: { backgroundColor: '#1565C0', height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginTop: 12 },
  fabText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  wcagNote: { color: '#888', fontSize: 12, textAlign: 'center', marginTop: 12 },
  buttonPressed: { opacity: 0.8 },
});
