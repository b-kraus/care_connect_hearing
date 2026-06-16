import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useAlertState, AlertItem } from './_layout';

type LogFilters = 'ALL' | 'CONFIRMED' | 'MISSED';

export default function LogScreen() {
  const { alerts } = useAlertState();
  const [activeFilter, setActiveFilter] = useState<LogFilters>('ALL');

  const fetchStatusColorSchema = (status: AlertItem['status']) => {
    if (status === 'CONFIRMED') return '#2E7D32';
    if (status === 'MISSED') return '#C62828';
    if (status === 'AWAITING_CONFIRMATION') return '#EF6C00';
    return '#1565C0';
  };

  const runtimeFilteredLogs = alerts.filter((log) => {
    if (activeFilter === 'ALL') return true;
    return log.status === activeFilter;
  });

  const structuredTimelineGroups = runtimeFilteredLogs.reduce((acc, currentLog) => {
    if (!acc[currentLog.dateGroup]) acc[currentLog.dateGroup] = [];
    acc[currentLog.dateGroup].push(currentLog);
    return acc;
  }, {} as Record<string, typeof alerts>);

  return (
    <ScrollView style={styles.logCanvas} showsVerticalScrollIndicator={false}>
      <View style={styles.headerTitleGroup}>
        <Text style={styles.metaContextLabel}>CARE CONNECT HEARING</Text>
        <Text style={styles.viewMainHeading}>Alert History Log</Text>
      </View>

      <View style={styles.filterChipContainer}>
        {(['ALL', 'CONFIRMED', 'MISSED'] as LogFilters[]).map((filterType) => (
          <Pressable
            key={filterType}
            onPress={() => setActiveFilter(filterType)}
            style={[styles.filterChip, activeFilter === filterType && styles.selectedChipBg]}
          >
            <Text style={[styles.filterChipText, activeFilter === filterType && styles.selectedChipText]}>
              {filterType.charAt(0) + filterType.slice(1).toLowerCase()}
            </Text>
          </Pressable>
        ))}
      </View>

      {Object.keys(structuredTimelineGroups).length === 0 ? (
        <Text style={styles.emptyLogsNotification}>No history logs found in this channel.</Text>
      ) : (
        Object.entries(structuredTimelineGroups).map(([dateTimelineTitle, chronologicalItems]) => (
          <View key={dateTimelineTitle} style={styles.timelineBlock}>
            <Text style={styles.timelineHeaderLabel}>{dateTimelineTitle}</Text>
            <View style={styles.twoColumnFlexGrid}>
              {chronologicalItems.map((item) => (
                <View key={item.id} style={[styles.gridCard, { borderLeftColor: fetchStatusColorSchema(item.status) }]}>
                  <View style={styles.cardUpperBody}>
                    <Text style={styles.cardHeaderTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.cardSubTime}>{item.time}</Text>
                  </View>
                  <View style={styles.cardLowerBody}>
                    <View style={[styles.statusBadge, { backgroundColor: fetchStatusColorSchema(item.status) }]}>
                      <Text style={styles.statusBadgeText}>{item.status.replace('_', ' ')}</Text>
                    </View>
                    <Text style={styles.authorMetaText}>{item.setBy}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))
      )}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logCanvas: { flex: 1, backgroundColor: '#000000', paddingHorizontal: 16, paddingTop: 10 },
  headerTitleGroup: { marginTop: 16, marginBottom: 20 },
  metaContextLabel: { color: '#888', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  viewMainHeading: { color: '#FFD600', fontSize: 32, fontWeight: 'bold', marginTop: 4 },
  filterChipContainer: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  filterChip: { backgroundColor: '#1C1C1E', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: '#333' },
  selectedChipBg: { backgroundColor: '#FFD600', borderColor: '#FFD600' },
  filterChipText: { color: '#FFD600', fontSize: 14, fontWeight: '600' },
  selectedChipText: { color: '#000000' },
  timelineBlock: { marginBottom: 16 },
  timelineHeaderLabel: { color: '#FFD600', fontSize: 22, fontWeight: 'bold', marginBottom: 14 },
  twoColumnFlexGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  gridCard: { backgroundColor: '#161616', borderRadius: 12, padding: 14, borderLeftWidth: 6, width: '47%', minHeight: 135, justifyContent: 'space-between' },
  cardUpperBody: { marginBottom: 8 },
  cardHeaderTitle: { color: '#FFD600', fontSize: 16, fontWeight: 'bold', lineHeight: 20 },
  cardSubTime: { color: '#FFFFFF', fontSize: 13, marginTop: 4 },
  cardLowerBody: { gap: 6 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, alignSelf: 'flex-start' },
  statusBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' },
  authorMetaText: { color: '#888', fontSize: 11 },
  emptyLogsNotification: { color: '#888', fontSize: 15, textAlign: 'center', marginTop: 40 }
});