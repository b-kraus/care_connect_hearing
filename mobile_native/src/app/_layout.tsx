import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Your screens go here */}
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
    </Stack>
  );
}