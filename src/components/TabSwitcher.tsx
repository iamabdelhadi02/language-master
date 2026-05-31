import { View, Text, TouchableOpacity } from "react-native";

type Tab = {
  key: string;
  label: string;
};

type TabSwitcherProps = {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
};

/**
 * Segmented tab switcher — two tabs laid side-by-side.
 * Active tab gets filled purple background; inactive is transparent.
 */
export function TabSwitcher({ tabs, activeTab, onTabChange }: TabSwitcherProps) {
  return (
    <View className="flex-row bg-surface-tertiary rounded-2xl p-1">
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onTabChange(tab.key)}
            activeOpacity={0.8}
            className={`flex-1 items-center justify-center py-2.5 rounded-xl ${
              isActive ? "bg-brand-purple" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-body font-semibold ${
                isActive ? "text-white" : "text-text-tertiary"
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
