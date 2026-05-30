import { Image, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, useRouter } from "expo-router";
import { useAuth } from "@clerk/expo";

import { images } from "@/constants/images";

/**
 * Render the onboarding screen with app branding, a mascot with multilingual
 * speech bubbles, and a full-width "Get Started" button that navigates to
 * the sign-up screen.
 *
 * Redirects authenticated users to the home route.
 */
export default function OnboardingScreen() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#5238FC" />
        </View>
      </SafeAreaView>
    );
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-8 pt-6 pb-6 justify-between">
          <View className="w-full">
            {/* ── Logo + App Name ─────────────────────── */}
            <View className="items-center mt-2 mb-6">
              <View className="flex-row-center">
                <Image
                  source={images.mascotLogo}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
                <Text className="text-h3 text-text-primary ml-2 font-bold">
                  langmaster
                </Text>
              </View>
            </View>

            {/* ── Heading ─────────────────────────────── */}
            <View className="mb-3">
              <Text className="text-h1 text-text-primary leading-tight font-bold">
                Your AI language{"\n"}
                <Text className="text-brand-purple">teacher.</Text>
              </Text>
            </View>

            {/* ── Description ─────────────────────────── */}
            <View className="mb-4">
              <Text className="text-body text-text-tertiary leading-relaxed">
                Real conversations, personalized{"\n"}
                lessons, anytime, anywhere.
              </Text>
            </View>
          </View>

          {/* ── Mascot & Speech Bubbles ──────────────── */}
          <View className="flex-1 justify-center items-center w-full relative min-h-[280px] my-4">
            <View className="relative w-[280px] h-[280px] justify-center items-center">
              {/* Mascot Welcome */}
              <Image
                source={images.mascotWelcome}
                className="w-60 h-60"
                resizeMode="contain"
              />

              {/* Speech Bubble: Hello! */}
              <View className="absolute top-4 left-[-12px] bg-[#EAF3FF] px-4 py-2 rounded-2xl shadow-sm">
                <Text className="text-body-sm font-semibold text-text-primary">Hello!</Text>
                <View
                  className="absolute bottom-[-4px] right-5 w-3 h-3 bg-[#EAF3FF]"
                  style={{ transform: [{ rotate: "45deg" }] }}
                />
              </View>

              {/* Speech Bubble: ¡Hola! */}
              <View className="absolute top-[-4px] right-4 bg-[#EEF2FF] px-4 py-2 rounded-2xl shadow-sm">
                <Text className="text-body-sm font-semibold text-brand-purple">¡Hola!</Text>
                <View
                  className="absolute bottom-[-4px] left-5 w-3 h-3 bg-[#EEF2FF]"
                  style={{ transform: [{ rotate: "45deg" }] }}
                />
              </View>

              {/* Speech Bubble: 你好! */}
              <View className="absolute top-28 right-[-10px] bg-[#FFF0EF] px-4 py-2 rounded-2xl shadow-sm">
                <Text className="text-body-sm font-semibold text-red">你好!</Text>
                <View
                  className="absolute left-[-4px] top-4 w-3 h-3 bg-[#FFF0EF]"
                  style={{ transform: [{ rotate: "45deg" }] }}
                />
              </View>
            </View>
          </View>

          {/* ── Get Started Button ──────────────────── */}
          <View className="w-full px-2 mb-2">
            <TouchableOpacity
              onPress={() => router.push("/(auth)/sign-up")}
              className="bg-brand-purple w-full rounded-2xl py-4 flex-row items-center justify-center relative shadow-lg"
              activeOpacity={0.85}
            >
              <Text className="text-btn-lg text-white font-bold">Get Started</Text>
              <View className="absolute right-6 justify-center items-center">
                <View
                  className="w-2.5 h-2.5 border-t-2 border-r-2 border-white"
                  style={{ transform: [{ rotate: "45deg" }] }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
