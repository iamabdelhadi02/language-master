import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Profile tab — placeholder.
 */
export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
      <View className="flex-1 flex-center px-8">
        <Text className="text-h3 text-text-primary mb-2">Profile</Text>
        <Text className="text-body text-text-tertiary">
          Profile screen coming soon
        </Text>
      </View>
    </SafeAreaView>
  );
}
