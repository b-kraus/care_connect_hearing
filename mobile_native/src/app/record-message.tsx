import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Updated
import { router } from 'expo-router';

export default function RecordMessageScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState('');
  const [recipient, setRecipient] = useState('Sarah');
  const [status, setStatus] = useState('Ready. Tap the microphone to start recording.');

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setStatus(recordedText ? 'Recording complete. Review and send.' : 'Nothing recorded. Try again.');
    } else {
      setIsRecording(true);
      setRecordedText('');
      setStatus('Recording... speak now.');
    }
  };

  const sendMessage = () => {
    Alert.alert('Message Sent', 'Message sent to ' + recipient, [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  const clearRecording = () => {
    setRecordedText('');
    setStatus('Ready. Tap the microphone to start recording.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.title}>Record Message</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>To:</Text>
        <TextInput
          style={styles.recipientInput}
          value={recipient}
          onChangeText={setRecipient}
          placeholderTextColor="#888"
        />

        <View style={[styles.statusBox, isRecording && styles.statusRecording]}>
          <Text style={styles.statusIcon}>{isRecording ? '🔴' : '🎙️'}</Text>
          <Text style={styles.statusText}>{status}</Text>
        </View>

        <View style={styles.textArea}>
          <Text style={recordedText ? styles.recorded : styles.placeholder}>
            {recordedText || 'Your message will appear here as you speak.'}
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.recordButton,
            isRecording && styles.recordButtonStop,
            pressed && styles.buttonPressed,
          ]}
          accessibilityLabel="Toggle voice recording" accessibilityRole="button" onPress={toggleRecording}
        >
          <Text style={styles.recordButtonText}>
            {isRecording ? '⏹ STOP RECORDING' : '🎙️ START RECORDING'}
          </Text>
        </Pressable>

        {recordedText !== '' && !isRecording && (
          <View style={styles.actionRow}>
            <Pressable style={[styles.clearButton]} onPress={clearRecording}>
              <Text style={styles.clearText}>CLEAR</Text>
            </Pressable>
            <Pressable style={[styles.sendButton]} onPress={sendMessage}>
              <Text style={styles.sendText}>📤 SEND</Text>
            </Pressable>
          </View>
        )}
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
  label: { color: '#FFD600', fontSize: 16, fontWeight: 'bold' },
  recipientInput: { color: '#FFD600', fontSize: 18, backgroundColor: '#161616', borderWidth: 2, borderColor: '#FFD600', borderRadius: 8, padding: 12, marginTop: 8, marginBottom: 16 },
  statusBox: { padding: 12, backgroundColor: '#161616', borderRadius: 8, borderWidth: 2, borderColor: '#333', flexDirection: 'row', alignItems: 'center' },
  statusRecording: { borderColor: '#C62828' },
  statusIcon: { fontSize: 20, marginRight: 12 },
  statusText: { color: '#FFD600', fontSize: 14, flex: 1 },
  textArea: { flex: 1, marginTop: 16, backgroundColor: '#161616', borderRadius: 12, borderWidth: 2, borderColor: '#FFD600', padding: 20 },
  placeholder: { color: '#888', fontSize: 28, fontWeight: '600', lineHeight: 40 },
  recorded: { color: '#FFD600', fontSize: 28, fontWeight: '600', lineHeight: 40 },
  recordButton: { backgroundColor: '#1565C0', height: 64, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 16 },
  recordButtonStop: { backgroundColor: '#C62828' },
  recordButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  actionRow: { flexDirection: 'row', marginTop: 12, gap: 12 },
  clearButton: { flex: 1, borderWidth: 2, borderColor: '#FFD600', borderRadius: 8, padding: 16, alignItems: 'center' },
  clearText: { color: '#FFD600', fontSize: 16, fontWeight: 'bold' },
  sendButton: { flex: 2, backgroundColor: '#2E7D32', borderRadius: 8, padding: 16, alignItems: 'center' },
  sendText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  buttonPressed: { opacity: 0.8 },
});