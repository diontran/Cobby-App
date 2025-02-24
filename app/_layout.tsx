import React from 'react';
import { Stack } from 'expo-router';
import { PaperProvider, ThemeProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';
import { AuthProvider } from '../contexts/AuthContext';
import { theme } from '../constants/theme';

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="#121212"
      />
      <PaperProvider theme={theme}>
        <AuthProvider>
          <Stack 
            screenOptions={{ 
              headerShown: false,
              contentStyle: { backgroundColor: '#121212' },
            }}
          >
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(app)" />
          </Stack>
        </AuthProvider>
      </PaperProvider>
    </ThemeProvider>
  );
} 