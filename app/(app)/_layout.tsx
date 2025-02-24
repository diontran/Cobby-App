import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconButton, Menu } from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';
import type { TabBarIconProps } from '../../types/navigation';

export default function AppLayout() {
  const { signOut } = useAuth();
  const [menuVisible, setMenuVisible] = React.useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleLogout = async () => {
    closeMenu();
    await signOut();
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#121212',
        },
        headerTintColor: '#FFFFFF',
        headerRight: () => (
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                icon="account-circle"
                iconColor="#FFFFFF"
                size={24}
                onPress={openMenu}
              />
            }
            contentStyle={{ backgroundColor: '#1E1E1E' }}
          >
            <Menu.Item 
              onPress={() => {
                closeMenu();
                // Navigate to profile edit screen
              }} 
              title="Edit Profile"
              titleStyle={{ color: '#FFFFFF' }}
              leadingIcon="account-edit"
            />
            <Menu.Item 
              onPress={handleLogout} 
              title="Logout"
              titleStyle={{ color: '#FFFFFF' }}
              leadingIcon="logout"
            />
          </Menu>
        ),
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopColor: '#2A2A2A',
        },
        tabBarActiveTintColor: '#FFA726',
        tabBarInactiveTintColor: '#666666',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <MaterialCommunityIcons name="chart-line" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <MaterialCommunityIcons name="image-multiple" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 