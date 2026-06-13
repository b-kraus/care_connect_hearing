import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function ActiveAlertScreen() {
  const [isYellow, setIsYellow] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsYellow((prev) => !prev);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const bgColor = isYellow ? '#FFD600' : '#000000';
  const textColor = isYellow ? '#000000' : '#FFD600';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={[styles.label, { color: textColor }]}>ACTIVE ALERT</Text>
      <Text style={{ fontSize: 100 }}>⚡</Text>
      <Text style={[styles.title, { color: textColor }]}>Take the blue pill</Text>
      <Text style={[styles.time, { color: textColor }]}>6:00 PM</Text>
      <Text style={[styles.setter, { color: textColor }]}>Set by Sarah</Text>

      <Pressable
        style={({ pressed }) => [styles.confirmButton, pressed && styles.buttonPressed]}
        onPress={() => router.back()}
      >
        <Text style={styles.confirmText}>CONFIRM</Text>
      </Pressable>

      <Text style={[styles.wcag, { color: textColor }]}>
        Flash rate: 2/sec (WCAG 2.3.1 compliant)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 32,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 32,
  },
  time: {
    fontSize: 28,
    fontWeight: '600',
    marginTop: 24,
  },
  setter: {
    fontSize: 18,
    marginTop: 12,
  },
  confirmButton: {
    backgroundColor: '#1565C0',
    width: '100%',
    height: 72,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 64,
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  wcag: {
    fontSize: 12,
    marginTop: 16,
    opacity: 0.7,
  },
  buttonPressed: {
    opacity: 0.8,
  },
});
