import { View, Text, Pressable, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import { useEffect } from "react";
type TabRoute = { key: string; name: string; params?: object };

/** Props received by the custom tab bar from Expo Router's Tabs navigator. */
type TabBarProps = {
  state: { routes: TabRoute[]; index: number };
  navigation: {
    emit: (...args: any[]) => any;
    navigate: (name: string) => void;
  };
};

const CIRCLE_SIZE = 44;

const TAB_LABELS: Record<string, string> = {
  home: "Home",
  learn: "Learn",
  "ai-teacher": "AI Teacher",
  chat: "Chat",
  profile: "Profile",
};

const TAB_ICONS: Record<string, string> = {
  home: "🏠",
  learn: "📚",
  "ai-teacher": "🤖",
  chat: "💬",
  profile: "👤",
};

/**
 * Custom bottom tab bar with an animated circular indicator
 * that slides to the active tab. Active tab shows only the icon
 * inside a purple circle; inactive tabs show icon + label.
 */
export function TabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const tabWidth = screenWidth / state.routes.length;

  // Animate active tab index for smooth circle movement
  const animatedIndex = useSharedValue(state.index);

  useEffect(() => {
    animatedIndex.value = withSpring(state.index, {
      damping: 22,
      stiffness: 280,
      mass: 0.85,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reanimated shared value is stable
  }, [state.index]);

  const circleStyle = useAnimatedStyle(() => {
    const cx = animatedIndex.value * tabWidth + (tabWidth - CIRCLE_SIZE) / 2;
    return {
      transform: [{ translateX: cx }],
    };
  });

  if (tabWidth <= 0) return null;

  return (
    <View
      className="bg-white border-t border-border"
      style={{ paddingBottom: insets.bottom }}
    >
      {/* Animated purple circle behind the active icon */}
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 6,
            left: 0,
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            borderRadius: CIRCLE_SIZE / 2,
          },
          circleStyle,
        ]}
        className="bg-brand-purple"
      />

      {/* Tab items row */}
      <View className="flex-row pt-2">
        {state.routes.map((route, index) => {
          const isActive = index === state.index;
          const label = TAB_LABELS[route.name] ?? route.name;
          const icon = TAB_ICONS[route.name] ?? "●";

          return (
            <Pressable
              key={route.key}
              onPress={() => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isActive && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
              style={{ width: tabWidth }}
              className="items-center justify-start"
            >
              {/* Icon container — same size as the circle */}
              <View
                style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}
                className="flex-center"
              >
                <Text
                  style={{ fontSize: 20 }}
                  className={isActive ? "text-white" : "text-text-muted"}
                >
                  {icon}
                </Text>
              </View>

              {/* Label — hidden for active tab */}
              {!isActive && (
                <Text className="text-caption text-text-muted mt-0.5">
                  {label}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
