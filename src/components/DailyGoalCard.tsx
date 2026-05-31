import { View, Text } from "react-native";
import { Image } from "expo-image";

import { images } from "@/constants/images";
import { DAILY_XP_GOAL } from "@/constants/learning";

type DailyGoalCardProps = {
  currentXp: number;
};

/**
 * Daily goal card — shows XP progress toward the daily goal
 * with a treasure chest illustration.
 */
export function DailyGoalCard({ currentXp }: DailyGoalCardProps) {
  const progress = Math.min(currentXp / DAILY_XP_GOAL, 1);

  return (
    <View className="mx-4 bg-card-warm rounded-3xl overflow-hidden">
      <View className="flex-row items-center p-4">
        {/* Left: Text + Progress */}
        <View className="flex-1 mr-3">
          <Text className="text-body-sm text-text-tertiary font-medium mb-1">
            Daily goal
          </Text>
          <Text className="text-h4 text-text-primary mb-3">
            {currentXp} / {DAILY_XP_GOAL} XP
          </Text>

          {/* Progress bar */}
          <View className="h-2 bg-orange/20 rounded-full overflow-hidden">
            <View
              className="h-full bg-orange rounded-full"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </View>
        </View>

        {/* Right: Treasure chest */}
        <Image
          source={images.treasure}
          style={{ width: 64, height: 64 }}
          contentFit="contain"
        />
      </View>
    </View>
  );
}
