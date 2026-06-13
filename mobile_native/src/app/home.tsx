import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.appTitle}>Care Connect Hearing</Text>
        <Text style={styles.greeting}>Good afternoon, Marcus</Text>
        <Text style={styles.date}>Saturday, June 6</Text>

        <Pressable
          style={({ pressed }) => [styles.demoButton, pressed && styles.buttonPressed]}
          onPress={() => {}}
        >
          <Text style={styles.demoButtonText}>Demo Alert Overlay</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.emergency, pressed && styles.buttonPressed]}
          onPress={() => {}}
        >
          <Text style={styles.emergencyIcon}>⚠️</Text>
          <Text style={styles.emergencyText}>EMERGENCY</Text>
        </Pressable>

        <Text style={styles.sectionHeader}>Active Now</Text>
        <View style={[styles.card, { borderLeftColor: '#2E7D32' }]}>
          <Text style={styles.cardTitle}>Take blue pill</Text>
          <Text style={styles.cardTime}>6:00 PM</Text>
          <View style={[styles.badge, { backgroundColor: '#2E7D32' }]}>
            <Text style={styles.badgeText}>Active Now</Text>
          </View>
          <Text style={styles.setBy}>Set by Sarah</Text>
        </View>

        <Text style={styles.sectionHeader}>Awaiting Confirmation</Text>
        <View style={[styles.card, { borderLeftColor: '#EF6C00' }]}>
          <Text style={styles.cardTitle}>Blood pressure check</Text>
          <Text style={styles.cardTime}>5:30 PM</Text>
          <View style={[styles.badge, { backgroundColor: '#EF6C00' }]}>
            <Text style={styles.badgeText}>Awaiting Confirmation</Text>
          </View>
          <Text style={styles.setBy}>Set by Sarah</Text>
        </View>

        <Text style={styles.sectionHeader}>Missed</Text>
        <View style={[styles.card, { borderLeftColor: '#C62828' }]}>
          <Text style={styles.cardTitle}>Physical therapy session</Text>
          <Text style={styles.cardTime}>2:00 PM</Text>
          <View style={[styles.badge, { backgroundColor: '#C62828' }]}>
            <Text style={styles.badgeText}>Missed</Text>
          </View>
          <Text style={styles.setBy}>Set by Sarah</Text>
        </View>

        <Text style={styles.sectionHeader}>Completed Today (2)</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  appTitle: {
    color: '#FFD600',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  greeting: {
    color: '#FFD600',
    fontSize: 32,
    fontWeight: 'bold',
  },
  date: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 6,
    marginBottom: 16,
  },
  demoButton: {
    backgroundColor: '#1565C0',
    padding: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  demoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emergency: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#C62828',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  emergencyIcon: {
    fontSize: 36,
    marginBottom: 4,
  },
  emergencyText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  sectionHeader: {
    color: '#FFD600',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 16,
  },
  card: {
    backgroundColor: '#161616',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 6,
  },
  cardTitle: {
    color: '#FFD600',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardTime: {
    color: '#fff',
    fontSize: 14,
    marginTop: 6,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  setBy: {
    color: '#888',
    fontSize: 13,
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.8,
  },
});
