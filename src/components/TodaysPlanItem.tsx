import { View, Text, TouchableOpacity } from "react-native";

export type TodaysPlanItemData = {
  title: string;
  subtitle: string;
  icon: string;
  iconBgColor: string;
  completed: boolean;
};

type TodaysPlanItemProps = {
  item: TodaysPlanItemData;
  onPress?: () => void;
};

/**
 * A single row in the Today's Plan list — icon, title, subtitle, checkbox.
 */
export function TodaysPlanItem({ item, onPress }: TodaysPlanItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center px-4 py-3 gap-3"
    >
      {/* Icon square */}
      <View
        className="w-10 h-10 rounded-xl flex-center"
        style={{ backgroundColor: item.iconBgColor }}
      >
        <Text style={{ fontSize: 20 }}>{item.icon}</Text>
      </View>

      {/* Text */}
      <View className="flex-1">
        <Text
          className={`text-body font-semibold ${
            item.completed ? "text-text-tertiary" : "text-text-primary"
          }`}
        >
          {item.title}
        </Text>
        <Text className="text-body-sm text-text-tertiary">{item.subtitle}</Text>
      </View>

      {/* Checkbox */}
      <View
        className={`w-6 h-6 rounded-full border-2 flex-center ${
          item.completed
            ? "bg-green border-green"
            : "border-text-muted/30 bg-transparent"
        }`}
      >
        {item.completed && (
          <Text style={{ fontSize: 12, color: "#fff" }}>✓</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
