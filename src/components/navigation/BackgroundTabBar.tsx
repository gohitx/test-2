import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ButtonsTabBar } from './ButtonsTabBar';
import { TAB_BAR_CONFIG, TAB_CONFIG } from './navigation';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export function BackgroundTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(translateY.value) }],
  }));

  // Calculate safe bottom padding
  const bottomPadding = Math.max(insets.bottom, TAB_BAR_CONFIG.paddingBottom);

  return (
    <AnimatedBlurView
      intensity={80}
      tint="light"
      style={[
        styles.container,
        animatedStyle,
        {
          paddingBottom: bottomPadding,
          height: TAB_BAR_CONFIG.height + bottomPadding,
        },
      ]}
    >
      <View style={styles.tabsContainer}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const tabConfig = TAB_CONFIG.find(tab => tab.name === route.name);

          if (!tabConfig) return null;

          const label = tabConfig.title;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <ButtonsTabBar
              key={route.key}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              label={label}
              Icon={tabConfig.icon}
              isFab={tabConfig.isFab}
            />
          );
        })}
      </View>
    </AnimatedBlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent for glass effect
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)', // Subtle border
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
    overflow: 'hidden', // Required for BlurView on some platforms
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: TAB_BAR_CONFIG.height,
  },
});
