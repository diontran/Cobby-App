import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack 
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#121212' },
      }}
    >
      <Stack.Screen 
        name="login" 
        options={{ 
          title: 'Login',
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          title: 'Register',
          headerShown: false 
        }} 
      />
    </Stack>
  );
} 