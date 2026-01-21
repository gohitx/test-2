/**
 * Color palette for the app - Material You inspired (Android 2026)
 * Single theme (light) for now - Dark mode will be added later with Zustand
 */

export const Colors = {
  // Primary colors
  primary: '#6366F1', // Indigo-500 - Main accent
  primaryLight: '#818CF8', // Indigo-400
  primaryDark: '#4F46E5', // Indigo-600

  // Background colors
  background: '#FFFFFF',
  surface: '#F8FAFC', // Slate-50
  surfaceElevated: '#FFFFFF',

  // Text colors
  textPrimary: '#0F172A', // Slate-900
  textSecondary: '#64748B', // Slate-500
  textMuted: '#94A3B8', // Slate-400

  // Tab bar specific
  tabBar: {
    background: '#FFFFFF',
    border: '#E2E8F0', // Slate-200
    activeIcon: '#6366F1', // Primary
    inactiveIcon: '#94A3B8', // Muted
    activeText: '#6366F1',
    inactiveText: '#64748B',
    fabBackground: '#6366F1',
    fabIcon: '#FFFFFF',
    indicator: '#6366F1',
  },

  // Utility colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

export type ColorKeys = keyof typeof Colors;
