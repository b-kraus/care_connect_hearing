import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert, Animated, PanResponder, TouchableOpacity } from 'react-native';

interface EmergencyAlertProps {
  onClose: () => void;
}

export default function EmergencyAlertScreen({ onClose }: EmergencyAlertProps) {
  const [trackWidth, setTrackWidth] = useState(0);
  const pan = useRef(new Animated.Value(0)).current;

  const handleSOSActive = () => {
    Alert.alert('SOS Sent', 'Emergency services have been contacted!', [
      { text: 'OK', onPress: onClose },
    ]);
  };

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setTrackWidth(width);
  };

  const maxSwipeDistance = trackWidth > 0 ? trackWidth - 72 : 200;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        pan.setOffset((pan as any)._value);
        pan.setValue(0);
      },
      onPanResponderMove: (e, gestureState) => {
        let nextValue = gestureState.dx;
        
        if (nextValue < 0) {
          pan.setValue(0);
        } else if (nextValue > maxSwipeDistance) {
          pan.setValue(maxSwipeDistance);
        } else {
          pan.setValue(nextValue);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        pan.flattenOffset();
        const currentValue = (pan as any)._value;

        if (currentValue >= maxSwipeDistance * 0.75) {
          Animated.timing(pan, {
            toValue: maxSwipeDistance,
            duration: 100,
            useNativeDriver: true,
          }).start(() => {
            handleSOSActive();
          });
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
            tension: 40,
            friction: 7,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Care Connect Hearing</Text>
      
      <View style={styles.center}>
        <Text style={styles.title}>Send Emergency Alert?</Text>

        <View style={styles.sliderTrack} onLayout={handleLayout}>
          <View style={styles.textLayer} pointerEvents="none">
            <Text style={styles.sliderText}>Slide to send SOS</Text>
          </View>

          <Animated.View
            style={[
              styles.sliderHandle,
              { transform: [{ translateX: pan }] },
            ]}
            {...panResponder.panHandlers}
          >
            <Text style={styles.arrowText}>≫</Text>
          </Animated.View>
        </View>

        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={onClose}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelText}>Cancel Action</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 32 },
  appName: { color: '#FFD600', fontSize: 16, textAlign: 'center', marginTop: 24, opacity: 0.8 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { color: '#FFD600', fontSize: 34, fontWeight: 'bold', textAlign: 'center', marginBottom: 48 },
  sliderTrack: { width: '100%', height: 64, backgroundColor: '#C62828', borderRadius: 8, justifyContent: 'center', position: 'relative', overflow: 'hidden', marginBottom: 20 },
  textLayer: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  sliderText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  sliderHandle: { width: 72, height: 64, backgroundColor: '#FFD600', borderRadius: 8, justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 0, zIndex: 5 },
  arrowText: { color: '#000', fontSize: 28, fontWeight: 'bold' },
  cancelButton: { width: '100%', height: 60, borderWidth: 2, borderColor: '#fff', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  cancelText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});