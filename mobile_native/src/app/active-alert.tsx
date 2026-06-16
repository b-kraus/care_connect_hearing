import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useAlertState } from './_layout'; // Pull local state engine without folder complications

interface ActiveAlertProps {
  alertId?: string | null;
  onClose: () => void;
}

export default function ActiveAlertScreen({ alertId, onClose }: ActiveAlertProps) {
  const [isYellow, setIsYellow] = useState(true);
  const { alerts, confirmAlert } = useAlertState();
  
  // Grab the specific active alert targeted, or default to the first active now alert available
  const currentAlert = alertId 
    ? alerts.find(a => a.id === alertId)
    : alerts.find(a => a.status === 'ACTIVE_NOW' || a.status === 'AWAITING_CONFIRMATION');

  // WCAG compliant flash pacing loop
  useEffect(() => {
    const flashTimer = setInterval(() => {
      setIsYellow((prev) => !prev);
    }, 500);
    return () => clearInterval(flashTimer);
  }, []);

  // Safe UI fallback state handling to prevent component unmounting screens from flickering blank
  if (!currentAlert) {
    return (
      <View style={[styles.container, { backgroundColor: '#000000' }]}>
        <Text style={{ color: '#FFD600', fontSize: 18, fontWeight: 'bold' }}>Alert Processing Completed</Text>
        <Pressable style={styles.confirmButton} onPress={onClose}>
          <Text style={styles.confirmText}>CLOSE VIEW</Text>
        </Pressable>
      </View>
    );
  }

  const backgroundColor = isYellow ? '#FFD600' : '#000000';
  const textColor = isYellow ? '#000000' : '#FFD600';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.label, { color: textColor }]}>
        {currentAlert.status === 'ACTIVE_NOW' ? 'ACTIVE ALERT' : 'AWAITING CONFIRMATION'}
      </Text>
      <Text style={{ fontSize: 100 }}>⚡</Text>
      <Text style={[styles.title, { color: textColor }]}>{currentAlert.title}</Text>
      <Text style={[styles.time, { color: textColor }]}>{currentAlert.time}</Text>
      <Text style={[styles.setter, { color: textColor }]}>{currentAlert.setBy}</Text>

      <Pressable
        style={({ pressed }) => [styles.confirmButton, pressed && styles.buttonPressed]}
        onPress={() => {
          confirmAlert(currentAlert.id); // Moves status to CONFIRMED
          onClose();                     // Smoothly closes overlay view
        }}
      >
        <Text style={styles.confirmText}>CONFIRM</Text>
      </Pressable>

      <Text style={[styles.wcag, { color: textColor }]}>
        Flash rate: 2Hz (WCAG 2.3.1 Photo-epileptic Seizure Compliant)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  label: { fontSize: 18, fontWeight: '600', letterSpacing: 2, marginBottom: 32 },
  title: { fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginTop: 32 },
  time: { fontSize: 28, fontWeight: '600', marginTop: 24 },
  setter: { fontSize: 18, marginTop: 12 },
  confirmButton: { backgroundColor: '#1565C0', width: '100%', height: 72, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 64 },
  confirmText: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', letterSpacing: 1.5 },
  wcag: { fontSize: 12, marginTop: 16, opacity: 0.7 },
  buttonPressed: { opacity: 0.8 },
});