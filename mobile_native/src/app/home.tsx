import React from 'react';
import { router } from 'expo-router';
import { View, Text, Pressable, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
// Calculate card width for a perfect 2-column grid balance minus padding and gaps
const cardWidth = (width - 48 - 16) / 2; 

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* App Header Bar */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>Care Connect Hearing</Text>
        <Pressable onPress={() => router.push("/read-message")} style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Greeting Section */}
        <View style={styles.heroSection}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Good afternoon,{"\n"}Marcus</Text>
            <Text style={styles.date}>Saturday, June 6</Text>
            
            <Pressable
              style={({ pressed }) => [styles.demoButton, pressed && styles.buttonPressed]}
              onPress={() => router.push("/active-alert")}
            >
              <Text style={styles.demoButtonText}>Demo Alert Overlay</Text>
            </Pressable>
          </View>

          {/* Large Circular Emergency Action Button */}
          <Pressable
            style={({ pressed }) => [styles.emergency, pressed && styles.buttonPressed]}
            onPress={() => router.push("/emergency")}
          >
            <Text style={styles.emergencyIcon}>⚠️</Text>
            <Text style={styles.emergencyText}>EMERGENCY</Text>
          </Pressable>
        </View>

        {/* 2-Column Dashboard Task Grid */}
        <View style={styles.gridContainer}>
          
          {/* Column 1: Active Now & Awaiting Confirmation */}
          <View style={styles.gridColumn}>
            <Text style={styles.sectionHeader}>Active Now</Text>
            <View style={[styles.card, { borderLeftColor: '#2E7D32' }]}>
              <Text style={styles.cardTitle} numberOfLines={2}>Take blue pill</Text>
              <Text style={styles.cardTime}>6:00 PM</Text>
              <View style={[styles.badge, { backgroundColor: '#2E7D32' }]}>
                <Text style={styles.badgeText}>Active Now</Text>
              </View>
              <Text style={styles.setBy}>Set by Sarah</Text>
            </View>

            <Text style={styles.sectionHeader}>Awaiting Confirmation</Text>
            <View style={[styles.card, { borderLeftColor: '#EF6C00' }]}>
              <Text style={styles.cardTitle} numberOfLines={2}>Blood pressure check</Text>
              <Text style={styles.cardTime}>5:30 PM</Text>
              <View style={[styles.badge, { backgroundColor: '#EF6C00' }]}>
                <Text style={styles.badgeText}>Awaiting Confirmation</Text>
              </View>
              <Text style={styles.setBy}>Set by Sarah</Text>
            </View>
          </View>

          {/* Column 2: Missed & Completed Today */}
          <View style={styles.gridColumn}>
            <Text style={styles.sectionHeader}>Missed</Text>
            <View style={[styles.card, { borderLeftColor: '#C62828' }]}>
              <Text style={styles.cardTitle} numberOfLines={2}>Physical therapy session</Text>
              <Text style={styles.cardTime}>2:00 PM</Text>
              <View style={[styles.badge, { backgroundColor: '#C62828' }]}>
                <Text style={styles.badgeText}>Missed</Text>
              </View>
              <Text style={styles.setBy}>Set by Sarah</Text>
            </View>

            <Text style={styles.sectionHeader}>Completed Today (2)</Text>
            {/* Cards can be dynamically appended here */}
          </View>

        </View>

        {/* Extra spacing helper at base for smooth scroll ranges */}
        <View style={{ height: 60 }} />
      </ScrollView>

      {/* Persistent Bottom Tab Bar Component Simulation */}
      <View style={styles.bottomTabBar}>
        <Pressable style={styles.tabItem}>
          <Text style={[styles.tabIcon, styles.activeTabColor]}>🏠</Text>
          <Text style={[styles.tabLabel, styles.activeTabColor]}>Home</Text>
        </Pressable>
        <Pressable style={styles.tabItem}>
          <Text style={styles.tabIcon}>💬</Text>
          <Text style={styles.tabLabel}>Messages</Text>
        </Pressable>
        <Pressable style={styles.tabItem}>
          <Text style={styles.tabIcon}>📋</Text>
          <Text style={styles.tabLabel}>Log</Text>
        </Pressable>
        <Pressable style={styles.tabItem}>
          <Text style={styles.tabIcon}>⚙️</Text>
          <Text style={styles.tabLabel}>Settings</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#000000',
  },
  appTitle: {
    color: '#FFD600',
    fontSize: 22,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 4,
  },
  settingsIcon: {
    fontSize: 22,
    color: '#FFD600',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  heroSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    width: '100%',
  },
  greetingContainer: {
    flex: 1,
    paddingRight: 8,
  },
  greeting: {
    color: '#FFD600',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 38,
  },
  date: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  demoButton: {
    backgroundColor: '#1565C0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  demoButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  emergency: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#C62828',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emergencyIcon: {
    fontSize: 32,
    marginBottom: 2,
  },
  emergencyText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  gridColumn: {
    width: cardWidth,
  },
  sectionHeader: {
    color: '#FFD600',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 16,
  },
  card: {
    backgroundColor: '#161616',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 6,
    width: '100%',
    minHeight: 140,
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: '#FFD600',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  cardTime: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  setBy: {
    color: '#888',
    fontSize: 12,
    marginTop: 6,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  bottomTabBar: {
    flexDirection: 'row',
    backgroundColor: '#161616',
    height: 65,
    borderTopWidth: 1,
    borderTopColor: '#222',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 4,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 20,
    color: '#888',
  },
  tabLabel: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  activeTabColor: {
    color: '#FFD600',
  },
});