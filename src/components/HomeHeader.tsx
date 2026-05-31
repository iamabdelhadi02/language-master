import { View, Text, TouchableOpacity } from "react-native";

import { images } from "@/constants/images";
import { Image } from "expo-image";

type HomeHeaderProps = {
  userName: string;
  flag: string;
  streakDays: number;
  onNotificationPress?: () => void;
};

/**
 * Home screen header — flag, greeting, streak, notification bell.
 */
export function HomeHeader({
  userName,
  flag,
  streakDays,
  onNotificationPress,
}: HomeHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
      {/* Left: Flag + Greeting */}
      <View className="flex-row items-center gap-2 flex-1">
        <View className="w-8 h-8 rounded-full bg-surface-tertiary flex-center">
          <Text style={{ fontSize: 18 }}>{flag}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-body text-text-primary" numberOfLines={1}>
            Hola, {userName}!{" "}
            <Text style={{ fontSize: 20 }}>👋</Text>
          </Text>
        </View>
      </View>

      {/* Right: Streak + Notification */}
      <View className="flex-row items-center gap-3">
        {/* Streak */}
        <View className="flex-row items-center gap-1 bg-orange/10 px-2 py-1 rounded-full">
          <Image
            source={images.streakFire}
            style={{ width: 16, height: 16 }}
            contentFit="contain"
          />
          <Text className="text-caption text-orange font-semibold">
            {streakDays}
          </Text>
        </View>

        {/* Notification bell */}
        <TouchableOpacity
          onPress={onNotificationPress}
          activeOpacity={0.7}
          className="w-9 h-9 rounded-full bg-surface-tertiary flex-center"
        >
          <Text style={{ fontSize: 18 }}>🔔</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
