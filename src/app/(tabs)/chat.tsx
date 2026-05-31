import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Chat tab — placeholder.
 */
export default function ChatScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
      <View className="flex-1 flex-center px-8">
        <Text className="text-h3 text-text-primary mb-2">Chat</Text>
        <Text className="text-body text-text-tertiary">
          Chat screen coming soon
        </Text>
      </View>
    </SafeAreaView>
  );
}
