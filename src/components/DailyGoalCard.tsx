import { View, Text } from "react-native";
import { Image } from "expo-image";

import { images } from "@/constants/images";
import { DAILY_XP_GOAL } from "@/constants/learning";

type DailyGoalCardProps = {
  currentXp: number;
};

/**
 * Display a card summarizing the user's progress toward the daily XP goal.
 *
 * The progress bar is capped at 100% when `currentXp` is greater than or equal to `DAILY_XP_GOAL`.
 *
 * @param currentXp - The user's accumulated XP for the current day.
 * @returns A React element representing the daily goal card.
 */
export function DailyGoalCard({ currentXp }: DailyGoalCardProps) {
  const progress = Math.min(currentXp / DAILY_XP_GOAL, 1);

  return (
    <View
      className="mx-4 bg-card-warm rounded-3xl overflow-hidden border border-orange/15"
      style={{
        shadowColor: "#FD8502",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
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
