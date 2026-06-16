import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Switch } from 'react-native';
import Slider from '@react-native-community/slider';

export default function SettingsScreen() {
  // 1. Manage real-time slider states
  const [flashSpeed, setFlashSpeed] = useState(1.8);
  const [vibrationStrength, setVibrationStrength] = useState(225);
  const [textSize, setTextSize] = useState(100);
  const [isHighContrast, setIsHighContrast] = useState(true);

  // 2. Helper function to calculate Flash Speed dynamic badge text
  const getFlashBadgeText = (speed: number) => {
    if (speed < 1.6) return 'SLOW';
    if (speed <= 2.4) return 'MEDIUM';
    return 'FAST';
  };

  // 3. Helper function to calculate Vibration dynamic badge text
  const getVibrationBadgeText = (strength: number) => {
    if (strength < 200) return 'GENTLE';
    if (strength <= 350) return 'MEDIUM';
    return 'STRONG';
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.titleGroup}>
        <Text style={styles.subTitle}>CARE CONNECT HEARING</Text>
        <Text style={styles.mainTitle}>Settings</Text>
      </View>

      <View style={styles.gridContainer}>
        
        {/* Card 1: Flash Settings */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.iconCircle}><Text style={styles.iconText}>⚡</Text></View>
            <Text style={styles.cardHeaderTitle}>Flash</Text>
          </View>

          <Text style={styles.settingLabel}>Flash Speed</Text>
          <View style={styles.sliderRow}>
            <Text style={styles.sliderBoundaryText}>Slow</Text>
            <Slider
              style={styles.slider}
              minimumValue={1.0}
              maximumValue={3.0}
              value={flashSpeed}
              // Updates dynamically on drag
              onValueChange={(val) => setFlashSpeed(parseFloat(val.toFixed(1)))}
              minimumTrackTintColor="#FFD600"
              maximumTrackTintColor="#333"
              thumbTintColor="#FFD600"
            />
            <Text style={styles.sliderBoundaryText}>Fast</Text>
          </View>
          
          {/* Dynamic Description Text */}
          <Text style={styles.statusDescription}>
            Flash Speed, currently {getFlashBadgeText(flashSpeed).charAt(0) + getFlashBadgeText(flashSpeed).slice(1).toLowerCase()} — {flashSpeed} flashes per second
          </Text>

          <View style={styles.badgeRow}>
            {/* Dynamic Badge Label */}
            <View style={styles.yellowBadge}>
              <Text style={styles.badgeText}>{getFlashBadgeText(flashSpeed)}</Text>
            </View>
            <Text style={styles.badgeLabel}>Max 3/sec —{"\n"}WCAG 2.3.1</Text>
          </View>

          <Pressable style={styles.cardButton}><Text style={styles.cardButtonText}>Test</Text></Pressable>
        </View>

        {/* Card 2: Vibration Settings */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.iconCircle}><Text style={styles.iconText}>📳</Text></View>
            <Text style={styles.cardHeaderTitle}>Vibration</Text>
          </View>

          <Text style={styles.settingLabel}>Vibration Strength</Text>
          <View style={styles.sliderRow}>
            <Text style={styles.sliderBoundaryText}>Gentle</Text>
            <Slider
              style={styles.slider}
              minimumValue={100}
              maximumValue={500}
              value={vibrationStrength}
              // Updates dynamically on drag
              onValueChange={(val) => setVibrationStrength(Math.round(val))}
              minimumTrackTintColor="#FFD600"
              maximumTrackTintColor="#333"
              thumbTintColor="#FFD600"
            />
            <Text style={styles.sliderBoundaryText}>Strong</Text>
          </View>
          
          {/* Dynamic Description Text */}
          <Text style={styles.statusDescription}>
            Vibration Strength, currently {getVibrationBadgeText(vibrationStrength).charAt(0) + getVibrationBadgeText(vibrationStrength).slice(1).toLowerCase()}
          </Text>

          <View style={styles.badgeRow}>
            {/* Dynamic Badge Label */}
            <View style={styles.yellowBadge}>
              <Text style={styles.badgeText}>{getVibrationBadgeText(vibrationStrength)}</Text>
            </View>
            <Text style={styles.badgeLabel}>{vibrationStrength} ms pulse</Text>
          </View>

          <Pressable style={styles.cardButton}><Text style={styles.cardButtonText}>Test</Text></Pressable>
        </View>

        {/* Card 3: Text Settings */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.iconCircle}><Text style={styles.iconText}>Ｔ</Text></View>
            <Text style={styles.cardHeaderTitle}>Text</Text>
          </View>

          <Text style={styles.settingLabel}>Text Size</Text>
          <View style={styles.sliderRow}>
            <Text style={styles.sliderBoundaryText}>100%</Text>
            <Slider
              style={styles.slider}
              minimumValue={100}
              maximumValue={200}
              value={textSize}
              // Updates dynamically on drag
              onValueChange={(val) => setTextSize(Math.round(val))}
              minimumTrackTintColor="#FFD600"
              maximumTrackTintColor="#333"
              thumbTintColor="#FFD600"
            />
            <Text style={styles.sliderBoundaryText}>200%</Text>
          </View>
          
          {/* Dynamic Description Text */}
          <Text style={styles.statusDescription}>
            Text Size, currently {textSize}%
          </Text>

          <View style={styles.previewBadgeRow}>
            {/* Dynamic Badge Percentage */}
            <View style={styles.yellowBadge}><Text style={styles.badgeText}>{textSize}%</Text></View>
            <Text style={[styles.badgeLabel, { fontSize: 13 * (textSize / 100) }]} numberOfLines={1}>
              Preview text
            </Text>
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleText}>High{"\n"}Contrast{"\n"}Theme</Text>
            <View style={styles.toggleContainer}>
              <Text style={styles.toggleStateLabel}>{isHighContrast ? "On" : "Off"}</Text>
              <Switch
                value={isHighContrast}
                onValueChange={setIsHighContrast}
                trackColor={{ true: '#FFD600', false: '#333' }}
                thumbColor="#000000"
              />
            </View>
          </View>
        </View>

      </View>

      <View style={styles.footer}>
        <Pressable style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </Pressable>
        <Text style={styles.footerNotice}>
          Changes take effect after saving. Test each setting before saving.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  scrollContent: { padding: 24, paddingBottom: 40 },
  titleGroup: { marginBottom: 24 },
  subTitle: { color: '#888', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  mainTitle: { color: '#FFD600', fontSize: 32, fontWeight: 'bold', marginTop: 4 },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, width: '100%' },
  card: { backgroundColor: '#1C1C1E', borderRadius: 16, padding: 20, flex: 1, minWidth: 280, borderColor: '#333', borderWidth: 1, justifyContent: 'space-between' },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 12 },
  iconCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFD600', justifyContent: 'center', alignItems: 'center' },
  iconText: { fontSize: 18, color: '#000000' },
  cardHeaderTitle: { color: '#FFD600', fontSize: 20, fontWeight: 'bold' },
  settingLabel: { color: '#FFD600', fontSize: 15, fontWeight: 'bold', marginBottom: 8 },
  sliderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  slider: { flex: 1, height: 40, marginHorizontal: 8 },
  sliderBoundaryText: { color: '#FFD600', fontSize: 13 },
  statusDescription: { color: '#FFD600', fontSize: 13, lineHeight: 18, opacity: 0.8, marginBottom: 16, minHeight: 36 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 },
  previewBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12, minHeight: 40 },
  yellowBadge: { backgroundColor: '#FFD600', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#000000', fontSize: 12, fontWeight: 'bold' },
  badgeLabel: { color: '#FFD600', fontSize: 13, lineHeight: 16 },
  cardButton: { backgroundColor: '#FFD600', height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', width: '100%' },
  cardButtonText: { color: '#000000', fontSize: 16, fontWeight: 'bold' },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111', borderRadius: 12, padding: 12, borderColor: '#333', borderWidth: 1, marginTop: 12 },
  toggleText: { color: '#FFD600', fontSize: 13, fontWeight: '600', lineHeight: 16 },
  toggleContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  toggleStateLabel: { color: '#FFD600', fontSize: 14, fontWeight: '600' },
  footer: { alignItems: 'center', marginTop: 32, width: '100%' },
  saveButton: { backgroundColor: '#1565C0', height: 54, width: 240, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  footerNotice: { color: '#FFD600', fontSize: 13, opacity: 0.6, textAlign: 'center' },
});