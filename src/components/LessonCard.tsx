import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import { images } from "@/constants/images";
import type { Lesson, LessonStatus } from "@/types/learning";
import { cn } from "@/lib/cn";

type LessonCardProps = {
  lesson: Lesson;
  status: LessonStatus;
  /** Display order within the unit (1-based). */
  order: number;
  /** Unit accent color for the left dot. */
  unitColor: string;
  onPress?: () => void;
};

/** Map imageKey strings to actual image sources. Falls back to mascotWelcome. */
function resolveImage(key: string) {
  const img = images[key as keyof typeof images];
  return img ?? images.mascotWelcome;
}

/** Visual config per lesson status. */
const STATUS_CONFIG: Record<
  LessonStatus,
  { showCheck: boolean; showProgress: boolean; label?: string }
> = {
  completed: { showCheck: true, showProgress: false },
  in_progress: { showCheck: false, showProgress: true, label: "In progress" },
  available: { showCheck: false, showProgress: false },
  locked: { showCheck: false, showProgress: false },
};

/**
 * Individual lesson card with numbered title, unit color accent, and image.
 *
 * - Completed: green checkmark circle on the right
 * - In progress: purple left border + "In progress" label
 * - Available: plain card, chevron
 */
export function LessonCard({
  lesson,
  status,
  order,
  unitColor,
  onPress,
}: LessonCardProps) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.available;
  const img = resolveImage(lesson.imageKey);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={cn(
        "flex-row items-center bg-white rounded-2xl p-3.5 border-2",
        status === "in_progress" ? "border-brand-purple" : "border-transparent",
      )}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      {/* Left: unit color dot + order number */}
      <View className="items-center mr-3">
        <View
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: unitColor }}
        >
          <Text className="text-white text-sm font-bold">{order}</Text>
        </View>
      </View>

      {/* Center: text + image thumbnail */}
      <View className="flex-row items-center flex-1 mr-3">
        <View className="flex-1">
          <Text
            className="text-body font-semibold text-text-primary"
            numberOfLines={1}
          >
            {lesson.title}
          </Text>
          <Text
            className="text-caption text-text-tertiary mt-0.5"
            numberOfLines={1}
          >
            {lesson.description}
          </Text>
          {config.showProgress && config.label && (
            <Text className="text-caption text-brand-purple font-semibold mt-1">
              {config.label}
            </Text>
          )}
        </View>

        {/* Right: small illustration */}
        <View className="w-10 h-10 rounded-lg bg-surface-secondary overflow-hidden ml-2">
          <Image
            source={img}
            style={{ width: 40, height: 40 }}
            contentFit="cover"
          />
        </View>
      </View>

      {/* Right: status indicator */}
      {config.showCheck && (
        <View className="w-7 h-7 rounded-full bg-green items-center justify-center">
          <Text className="text-white text-xs font-bold">✓</Text>
        </View>
      )}
      {!config.showCheck && !config.showProgress && (
        <Text className="text-text-muted text-lg">›</Text>
      )}
    </TouchableOpacity>
  );
}
