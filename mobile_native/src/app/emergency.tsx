import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';

export default function EmergencyAlertScreen() {
  const handleSOS = () => {
    Alert.alert('SOS Sent', 'Emergency Alert Dispatched!', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Care Connect Hearing</Text>
      <View style={styles.center}>
        <Text style={styles.title}>Send Emergency Alert?</Text>
        <View style={styles.sliderTrack}>
          <Pressable
            style={({ pressed }) => [styles.sliderHandle, pressed && styles.handlePressed]}
            onLongPress={handleSOS}
            delayLongPress={1000}
          >
            <Text style={styles.arrowText}>≫</Text>
          </Pressable>
          <Text style={styles.sliderText}>Hold to send SOS</Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.cancelButton, pressed && styles.buttonPressed]}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelText}>Cancel Action</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 32 },
  appName: { color: '#FFD600', fontSize: 16, textAlign: 'center', marginTop: 24, opacity: 0.8 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { color: '#FFD600', fontSize: 34, fontWeight: 'bold', textAlign: 'center', marginBottom: 48 },
  sliderTrack: { width: '100%', height: 64, backgroundColor: '#C62828', borderRadius: 8, flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  sliderHandle: { width: 72, height: 64, backgroundColor: '#FFD600', borderTopLeftRadius: 8, borderBottomLeftRadius: 8, justifyContent: 'center', alignItems: 'center' },
  handlePressed: { backgroundColor: '#FFC107' },
  arrowText: { color: '#000', fontSize: 28, fontWeight: 'bold' },
  sliderText: { color: '#fff', fontSize: 18, flex: 1, textAlign: 'center', paddingRight: 72 },
  cancelButton: { width: '100%', height: 60, borderWidth: 2, borderColor: '#fff', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  cancelText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  buttonPressed: { opacity: 0.8 },
});
