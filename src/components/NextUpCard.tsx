import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

type NextUpCardProps = {
  title: string;
  subtitle: string;
  avatarUrl?: string;
  onPress?: () => void;
};

/**
 * Next Up card — green-tinted preview of the next activity
 * with an avatar and a video call button.
 */
export function NextUpCard({
  title,
  subtitle,
  avatarUrl,
  onPress,
}: NextUpCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="mx-4 bg-card-mint rounded-3xl overflow-hidden"
    >
      <View className="flex-row items-center p-4">
        {/* Left: Text */}
        <View className="flex-1 mr-3">
          <Text className="text-caption text-green font-medium mb-0.5">
            Next up
          </Text>
          <Text className="text-body font-bold text-text-primary mb-0.5">
            {title}
          </Text>
          <Text className="text-body-sm text-text-tertiary">{subtitle}</Text>
        </View>

        {/* Right: Avatar with video button overlay */}
        <View className="relative">
          {/* Avatar circle */}
          <View className="w-12 h-12 rounded-full bg-surface-tertiary flex-center overflow-hidden">
            {avatarUrl ? (
              <Image
                source={{ uri: avatarUrl }}
                style={{ width: 48, height: 48 }}
                contentFit="cover"
              />
            ) : (
              <Text style={{ fontSize: 24 }}>👩‍🏫</Text>
            )}
          </View>

          {/* Video call button — slightly offset, overlapping */}
          <View className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-green flex-center border-2 border-white">
            <Text style={{ fontSize: 12, color: "#fff" }}>📹</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
