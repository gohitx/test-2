import type { LucideIcon } from 'lucide-react-native';
import {
  Home,
  MessageCircle,
  Plus,
  User,
  Wallet
} from 'lucide-react-native';

export interface TabConfig {
  name: string;
  title: string;
  icon: LucideIcon;
  isFab?: boolean;
}

/**
 * Tab configuration for the bottom navigation bar
 * Order matters - tabs will be displayed in this order
 */
export const TAB_CONFIG: TabConfig[] = [
  {
    name: 'index',
    title: 'Home',
    icon: Home,
  },
  {
    name: 'wallet',
    title: 'Wallet',
    icon: Wallet,
  },
  {
    name: 'mas',
    title: 'Más',
    icon: Plus,
    isFab: true, // Central floating action button
  },
  {
    name: 'chat',
    title: 'Chat',
    icon: MessageCircle,
  },
  {
    name: 'profile',
    title: 'Profile',
    icon: User,
  },
];

/**
 * Tab bar dimensions and styling constants
 */
export const TAB_BAR_CONFIG = {
  height: 70,
  fabSize: 56,
  fabElevation: -20, // How much the FAB rises above the bar
  iconSize: 24,
  fabIconSize: 28,
  borderRadius: 24,
  paddingBottom: 8,
} as const;
