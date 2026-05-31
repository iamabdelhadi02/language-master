import { useAuth, useClerk } from "@clerk/expo";
import { Link, Redirect } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePostHog } from "posthog-react-native";

import { getLanguage } from "@/data/languages";
import { useLearningStore } from "@/store/learning";

/**
 * Root entry screen — redirects based on authentication and language selection.
 *
 * - Signed out → onboarding
 * - Signed in, no language → language selection
 * - Signed in, language set → home
 * - Loading        → spinner
 */
export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const { signOut } = useClerk();
  const posthog = usePostHog();
  const selectedLanguageCode = useLearningStore((s) => s.selectedLanguage);
  const clearAll = useLearningStore((s) => s.clearAll);

  const languageName = selectedLanguageCode
    ? getLanguage(selectedLanguageCode)?.name ?? selectedLanguageCode
    : null;

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

  if (!selectedLanguageCode) {
    return <Redirect href="/language-select" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-h2 text-text-primary mb-2">Welcome back!</Text>
        <Text className="text-body text-text-tertiary mb-1">
          Learning: {languageName}
        </Text>

        {/* Navigate to language selection */}
        <Link href="/(tabs)/home" asChild>
          <TouchableOpacity
            activeOpacity={0.85}
            className="bg-brand-purple/10 px-6 py-3 rounded-2xl border border-brand-purple/20 mb-3"
          >
            <Text className="text-body text-brand-purple font-medium">
              Home
            </Text>
          </TouchableOpacity>
        </Link>

        {/* Clear all (testing) */}
        <TouchableOpacity
          onPress={() => clearAll()}
          activeOpacity={0.85}
          className="bg-red/10 px-6 py-3 rounded-2xl border border-red/20 mb-3"
        >
          <Text className="text-body text-red font-medium">
            Clear progress (testing)
          </Text>
        </TouchableOpacity>

        {/* Sign out */}
        <TouchableOpacity
          onPress={() => {
            posthog.capture("sign_out");
            posthog.reset();
            signOut();
          }}
          activeOpacity={0.85}
          className="bg-red/10 px-8 py-3 rounded-2xl border border-red/20"
        >
          <Text className="text-body text-red font-medium">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
