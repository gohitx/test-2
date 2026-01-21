import { Colors } from '@/constants/themes';
import { MessageCircle } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Chat Screen - Messages and conversations
 */
export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MessageCircle size={48} color={Colors.primary} strokeWidth={1.5} />
      </View>
      <Text style={styles.title}>Chat</Text>
      <Text style={styles.subtitle}>Tus conversaciones</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    padding: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: `${Colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
