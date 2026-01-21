import { Colors } from '@/constants/themes';
import * as Haptics from 'expo-haptics';
import type { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { TAB_BAR_CONFIG } from './navigation';

interface TabBarButtonProps {
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  label: string;
  Icon: LucideIcon;
  isFab?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ButtonsTabBar({
  isFocused,
  onPress,
  onLongPress,
  label,
  Icon,
  isFab = false,
}: TabBarButtonProps) {
  const scale = useSharedValue(1);
  const pressed = useSharedValue(0);

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 400 });
    pressed.value = withTiming(1, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    pressed.value = withTiming(0, { duration: 100 });
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedIconStyle = useAnimatedStyle(() => {
    const translateY = interpolate(isFocused ? 1 : 0, [0, 1], [0, -2]);
    return {
      transform: [{ translateY }],
    };
  });

  // FAB Button (central floating button)
  if (isFab) {
    return (
      <AnimatedPressable
        onPress={handlePress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.fabContainer, animatedButtonStyle]}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ selected: isFocused }}
      >
        <View style={styles.fabButton}>
          <Icon size={TAB_BAR_CONFIG.fabIconSize} color={Colors.tabBar.fabIcon} strokeWidth={2.5} />
        </View>
      </AnimatedPressable>
    );
  }

  // Regular tab button
  return (
    <AnimatedPressable
      onPress={handlePress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.tabButton, animatedButtonStyle]}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: isFocused }}
    >
      <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
        <Icon
          size={TAB_BAR_CONFIG.iconSize}
          color={isFocused ? Colors.tabBar.activeIcon : Colors.tabBar.inactiveIcon}
          strokeWidth={isFocused ? 2.5 : 2}
        />
        {isFocused && <View style={styles.activeIndicator} />}
      </Animated.View>
      <Text
        style={[
          styles.label,
          isFocused ? styles.labelActive : null,
          {
            color: isFocused ? Colors.tabBar.activeIcon : Colors.tabBar.inactiveIcon,
          },
        ]}
      >
        {label}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.tabBar.indicator,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  labelActive: {
    fontWeight: '600',
  },
  fabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: TAB_BAR_CONFIG.fabElevation,
  },
  fabButton: {
    width: TAB_BAR_CONFIG.fabSize,
    height: TAB_BAR_CONFIG.fabSize,
    borderRadius: TAB_BAR_CONFIG.fabSize / 2,
    backgroundColor: Colors.tabBar.fabBackground,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
