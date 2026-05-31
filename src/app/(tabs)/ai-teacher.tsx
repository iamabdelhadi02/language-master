import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * AI Teacher tab — placeholder.
 */
export default function AITeacherScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
      <View className="flex-1 flex-center px-8">
        <Text className="text-h3 text-text-primary mb-2">AI Teacher</Text>
        <Text className="text-body text-text-tertiary">
          AI Teacher screen coming soon
        </Text>
      </View>
    </SafeAreaView>
  );
}
