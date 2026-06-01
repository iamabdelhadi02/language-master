import { View, Text } from "react-native";

type StatItem = {
  label: string;
  rating: string;
  color: string;
};

type LessonStatsCardProps = {
  pronunciation: string;
  fluency: string;
  vocabulary: string;
};

const STAT_RATING_COLORS: Record<string, string> = {
  Excellent: "#22C55E",
  Great: "#3B82F6",
  Good: "#6366F1",
  Fair: "#F59E0B",
  NeedsWork: "#EF4444",
};

const STAT_RATING_BG: Record<string, string> = {
  Excellent: "#F0FDF4",
  Great: "#EFF6FF",
  Good: "#EEF2FF",
  Fair: "#FFFBEB",
  NeedsWork: "#FEF2F2",
};

/**
 * Three-column stats card showing lesson feedback ratings.
 *
 * Each column displays a label (Pronunciation, Fluency, Vocabulary)
 * and a color-coded rating badge with a tinted background
 * matching the rating tier.
 */
export function LessonStatsCard({
  pronunciation,
  fluency,
  vocabulary,
}: LessonStatsCardProps) {
  const stats: StatItem[] = [
    {
      label: "Pronunciation",
      rating: pronunciation,
      color: STAT_RATING_COLORS[pronunciation] ?? "#6366F1",
    },
    {
      label: "Fluency",
      rating: fluency,
      color: STAT_RATING_COLORS[fluency] ?? "#3B82F6",
    },
    {
      label: "Vocabulary",
      rating: vocabulary,
      color: STAT_RATING_COLORS[vocabulary] ?? "#22C55E",
    },
  ];

  return (
    <View
      className="bg-white rounded-3xl mx-5 py-5 px-3 flex-row"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      {stats.map((stat, index) => {
        const bg = STAT_RATING_BG[stat.rating] ?? "#EEF2FF";

        return (
          <View key={stat.label} className="flex-1 flex-row">
            {/* Vertical divider between columns */}
            {index > 0 && (
              <View className="w-px bg-[#E2E8F0] self-stretch my-1" />
            )}

            <View className="flex-1 items-center px-1">
              {/* Label */}
              <Text className="text-caption font-semibold text-text-primary mb-2.5">
                {stat.label}
              </Text>

              {/* Rating badge */}
              <View
                className="rounded-full px-3 py-1"
                style={{ backgroundColor: bg }}
              >
                <Text
                  className="text-xs font-semibold"
                  style={{ color: stat.color }}
                >
                  {stat.rating}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
