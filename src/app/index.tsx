import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import { useAuth, useClerk } from "@clerk/expo";

/**
 * Root entry screen — redirects based on authentication state.
 *
 * - Signed in  → home route (placeholder for now)
 * - Signed out → onboarding route
 * - Loading    → spinner
 */
export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const { signOut } = useClerk();
  if (!isLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#5238FC" />
        </View>
      </SafeAreaView>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-h2 text-text-primary mb-2">Welcome back!</Text>
        <Text className="text-body text-text-tertiary mb-8">
          You are signed in.
        </Text>
        <TouchableOpacity
          onPress={() => signOut()}
          activeOpacity={0.85}
          className="bg-red/10 px-8 py-3 rounded-2xl border border-red/20"
        >
          <Text className="text-body text-red font-medium">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
