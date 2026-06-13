import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have expo-vector-icons installed

export default function CustomHeader() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.logo}>Expo Starter</Text>
      
      <View style={styles.navLinks}>
        <Pressable 
          style={[styles.navButton, pathname === '/home' && styles.activeButton]}
          onPress={() => router.push('/home')}
        >
          <Text style={styles.navText}>Home</Text>
        </Pressable>

        <Pressable style={styles.navButton} onPress={() => router.push('/explore')}>
          <Text style={styles.navText}>Explore</Text>
        </Pressable>

        <Pressable style={styles.navButton} onPress={() => router.push('/docs')}>
          <Text style={styles.navText}>Docs <Ionicons name="link" size={12} color="#fff" /></Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C1C1E', // Dark gray background from your image
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30, // Pill shape
    margin: 16,
    marginTop: 50, // Pushes it below the status bar
  },
  logo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  navLinks: {
    flexDirection: 'row',
    gap: 15,
  },
  navButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activeButton: {
    backgroundColor: '#333', // Subtle background for active state
  },
  navText: {
    color: '#fff',
    fontSize: 14,
  },
});