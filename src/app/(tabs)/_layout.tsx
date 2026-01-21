import { BackgroundTabBar } from '@/components/navigation/BackgroundTabBar';
import { Tabs } from 'expo-router';
import React from 'react';

/**
 * Tab Layout - Main navigation structure
 * Uses custom BottomTabBar component for modern Material You design
 */
export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <BackgroundTabBar {...props} />}
      screenOptions={{
        headerShown: false, // We'll use custom headers per screen if needed
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
        }}
      />
      <Tabs.Screen
        name="mas"
        options={{
          title: 'Más',
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
