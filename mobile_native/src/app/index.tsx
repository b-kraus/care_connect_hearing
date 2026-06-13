import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, StatusBar, SafeAreaView } from 'react-native';
import { router } from 'expo-router';

export default function OnboardingScreen() {
  const [isRouted, setIsRouted] = useState(false);

  // If a button is clicked, render a completely blank screen
  if (isRouted) {
    return (
      <SafeAreaView style={styles.blankScreen}>
        <StatusBar barStyle="light-content" />
        {/* Blank screen content */}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>
          Welcome to Care{'\n'}Connect Hearing
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Large text, high contrast, and visual + vibration alerts are already on. You can change anything later in Settings.
        </Text>

        {/* Blue Pill Container */}
        <View style={styles.pillContainer}>
          <Text style={styles.pillText}>⚡ Take blue pill</Text>
        </View>

        {/* Action Buttons */}
        <Pressable 
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed
          ]} 
          onPress={() => router.push('/home')}
        >
          <Text style={styles.primaryButtonText}>Start Guided Setup</Text>
        </Pressable>

        <Pressable 
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.buttonPressed
          ]} 
          onPress={() => router.push('/home')}
        >
          <Text style={styles.secondaryButtonText}>Use Default Settings</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 24,
    justifyContent: 'center',
  },
  blankScreen: {
    flex: 1,
    backgroundColor: '#000000', // Matches the app's dark background theme
  },
  title: {
    color: '#FFD600',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  subtitle: {
    color: '#FFD600',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 26,
  },
  pillContainer: {
    backgroundColor: '#FFD600',
    padding: 16,
    borderRadius: 8,
    marginBottom: 48,
    alignItems: 'center',
  },
  pillText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: '#1565C0',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    height: 56,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#1565C0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#1565C0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonPressed: {
    opacity: 0.8, // Visual feedback overlay when clicking down on the buttons
  },
});