import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useAlertState } from './_layout'; 
import SettingsScreen from './settings';
import LogScreen from './log';
import ActiveAlertScreen from './active-alert';
import EmergencyAlertScreen from './emergency';
import ReadMessageScreen from './read-message';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'home' | 'messages' | 'log' | 'settings'>('home');
  const [focusedAlertId, setFocusedAlertId] = useState<string | null>(null);
  const [showEmergencyOverlay, setShowEmergencyOverlay] = useState(false);
  const { alerts, triggerDemoAlert } = useAlertState();

  const activeNow = alerts.filter(a => a.status === 'ACTIVE_NOW');
  const awaiting = alerts.filter(a => a.status === 'AWAITING_CONFIRMATION');
  const missed = alerts.filter(a => a.status === 'MISSED');
  const completedCount = alerts.filter(a => a.status === 'CONFIRMED' && a.dateGroup === 'Today').length;

  const displayTabBody = () => {
    switch (activeTab) {
      case 'settings': 
        return <SettingsScreen />;
      case 'log': 
        return <LogScreen />;
      case 'messages': 
        return <ReadMessageScreen />;
      case 'home':
      default:
        return (
          <ScrollView style={styles.scrollWrapper} showsVerticalScrollIndicator={false}>
            <View style={styles.heroLayout}>
              <View style={styles.identityBlock}>
                <Text style={styles.headingText}>Good afternoon,{"\n"}Marcus</Text>
                <Text style={styles.dateLabel}>Saturday, June 6</Text>
                
                <Pressable
                  style={({ pressed }) => [styles.demoBtn, pressed && styles.btnPressed]}
                  onPress={() => {
                    triggerDemoAlert();
                    setTimeout(() => {
                      const updatedActives = alerts.filter(a => a.status === 'ACTIVE_NOW');
                      if (updatedActives.length > 0) setFocusedAlertId(updatedActives[0].id);
                    }, 60);
                  }}
                >
                  <Text style={styles.demoBtnText}>Simulate High-Priority Alert</Text>
                </Pressable>
              </View>

              <Pressable 
                style={({ pressed }) => [styles.emergencyCircle, pressed && styles.btnPressed]} 
                onPress={() => setShowEmergencyOverlay(true)}
              >
                <Text style={styles.emergencyIcon}>⚠️</Text>
                <Text style={styles.emergencyText}>EMERGENCY</Text>
              </Pressable>
            </View>

            <View style={styles.dashboardSplitGrid}>
              <View style={styles.gridColumn}>
                <Text style={styles.columnHeader}>Active Now</Text>
                {activeNow.map(item => (
                  <Pressable key={item.id} style={[styles.card, { borderLeftColor: '#2E7D32' }]} onPress={() => setFocusedAlertId(item.id)}>
                    <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.cardTime}>{item.time}</Text>
                    <View style={[styles.badge, { backgroundColor: '#2E7D32' }]}><Text style={styles.badgeText}>Active Now</Text></View>
                    <Text style={styles.cardAuthor}>{item.setBy}</Text>
                  </Pressable>
                ))}

                <Text style={styles.columnHeader}>Awaiting Confirmation</Text>
                {awaiting.map(item => (
                  <Pressable key={item.id} style={[styles.card, { borderLeftColor: '#EF6C00' }]} onPress={() => setFocusedAlertId(item.id)}>
                    <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.cardTime}>{item.time}</Text>
                    <View style={[styles.badge, { backgroundColor: '#EF6C00' }]}><Text style={styles.badgeText}>Awaiting</Text></View>
                    <Text style={styles.cardAuthor}>{item.setBy}</Text>
                  </Pressable>
                ))}
              </View>

              <View style={styles.gridColumn}>
                <Text style={styles.columnHeader}>Missed</Text>
                {missed.map(item => (
                  <View key={item.id} style={[styles.card, { borderLeftColor: '#C62828' }]}>
                    <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.cardTime}>{item.time}</Text>
                    <View style={[styles.badge, { backgroundColor: '#C62828' }]}><Text style={styles.badgeText}>Missed</Text></View>
                    <Text style={styles.cardAuthor}>{item.setBy}</Text>
                  </View>
                ))}

                <Text style={styles.columnHeader}>Completed Today ({completedCount})</Text>
              </View>
            </View>
            <View style={{ height: 40 }} />
          </ScrollView>
        );
    }
  };

  return (
    <SafeAreaView style={styles.viewViewport}>
      <View style={styles.topAppBar}>
        <Text style={styles.appTitle}>Care Connect Hearing</Text>
        <Pressable onPress={() => setActiveTab('settings')} style={styles.settingsTapTarget}>
          <Text style={[styles.settingsIconText, activeTab === 'settings' && styles.selectedColor]}>⚙️</Text>
        </Pressable>
      </View>

      {displayTabBody()}

      {focusedAlertId && (
        <View style={StyleSheet.absoluteFill}>
          <ActiveAlertScreen alertId={focusedAlertId} onClose={() => setFocusedAlertId(null)} />
        </View>
      )}

      {showEmergencyOverlay && (
        <View style={StyleSheet.absoluteFill}>
          <EmergencyAlertScreen onClose={() => setShowEmergencyOverlay(false)} />
        </View>
      )}

      <View style={styles.navigationDock}>
        <Pressable style={styles.dockItem} onPress={() => setActiveTab('home')}>
          <Text style={[styles.dockIcon, activeTab === 'home' && styles.selectedColor]}>🏠</Text>
          <Text style={[styles.dockLabel, activeTab === 'home' && styles.selectedColor]}>Home</Text>
        </Pressable>
        <Pressable style={styles.dockItem} onPress={() => setActiveTab('messages')}>
          <Text style={[styles.dockIcon, activeTab === 'messages' && styles.selectedColor]}>💬</Text>
          <Text style={[styles.dockLabel, activeTab === 'messages' && styles.selectedColor]}>Messages</Text>
        </Pressable>
        <Pressable style={styles.dockItem} onPress={() => setActiveTab('log')}>
          <Text style={[styles.dockIcon, activeTab === 'log' && styles.selectedColor]}>📋</Text>
          <Text style={[styles.dockLabel, activeTab === 'log' && styles.selectedColor]}>Log</Text>
        </Pressable>
        <Pressable style={styles.dockItem} onPress={() => setActiveTab('settings')}>
          <Text style={[styles.dockIcon, activeTab === 'settings' && styles.selectedColor]}>⚙️</Text>
          <Text style={[styles.dockLabel, activeTab === 'settings' && styles.selectedColor]}>Settings</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewViewport: { flex: 1, backgroundColor: '#000000' },
  topAppBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16, backgroundColor: '#000000' },
  appTitle: { color: '#FFD600', fontSize: 22, fontWeight: 'bold' },
  settingsTapTarget: { padding: 4 },
  settingsIconText: { fontSize: 22, color: '#888' },
  scrollWrapper: { flex: 1, paddingHorizontal: 16 },
  emptyContainer: { flex: 1, backgroundColor: '#000000' },
  heroLayout: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, width: '100%' },
  identityBlock: { flex: 1, paddingRight: 8 },
  headingText: { color: '#FFD600', fontSize: 32, fontWeight: 'bold', lineHeight: 38 },
  dateLabel: { color: '#aaa', fontSize: 16, marginTop: 8, marginBottom: 16 },
  demoBtn: { backgroundColor: '#1565C0', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, alignSelf: 'flex-start' },
  demoBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
  emergencyCircle: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#C62828', justifyContent: 'center', alignItems: 'center' },
  emergencyIcon: { fontSize: 28, marginBottom: 2 },
  emergencyText: { color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' },
  dashboardSplitGrid: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: 12 },
  gridColumn: { flex: 1 }, 
  columnHeader: { color: '#FFD600', fontSize: 16, fontWeight: 'bold', marginBottom: 12, marginTop: 16 },
  card: { backgroundColor: '#161616', borderRadius: 12, padding: 12, marginBottom: 12, borderLeftWidth: 6, width: '100%', minHeight: 135, justifyContent: 'space-between' },
  cardTitle: { color: '#FFD600', fontSize: 15, fontWeight: 'bold', lineHeight: 18 },
  cardTime: { color: '#FFFFFF', fontSize: 13, marginTop: 4 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, alignSelf: 'flex-start', marginTop: 8 },
  badgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' },
  cardAuthor: { color: '#888', fontSize: 11, marginTop: 6 },
  btnPressed: { opacity: 0.75 },
  navigationDock: { flexDirection: 'row', backgroundColor: '#161616', height: 65, borderTopWidth: 1, borderTopColor: '#222', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 4 },
  dockItem: { alignItems: 'center', justifyContent: 'center', flex: 1, height: '100%' },
  dockIcon: { fontSize: 20, color: '#888' },
  dockLabel: { fontSize: 11, color: '#888', marginTop: 2 },
  selectedColor: { color: '#FFD600' },
});