import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Screen component that displays a centered placeholder for the Learn tab.
 *
 * @returns The Learn screen's UI as a React element containing a heading and a brief "coming soon" message.
 */
export default function LearnScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
      <View className="flex-1 flex-center px-8">
        <Text className="text-h3 text-text-primary mb-2">Learn</Text>
        <Text className="text-body text-text-tertiary">
          Learn screen coming soon
        </Text>
      </View>
    </SafeAreaView>
  );
}
