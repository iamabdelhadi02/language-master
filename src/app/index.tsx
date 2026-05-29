import { Image, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
      <View className="flex-1 items-center justify-center px-8">
        {/* Logo */}
        <Image
          source={images.mascotLogo}
          className="w-40 h-16 mb-8"
          resizeMode="contain"
        />

        {/* Mascot illustration */}
        <Image
          source={images.mascotWelcome}
          className="w-64 h-64 mb-6"
          resizeMode="contain"
        />

        {/* Tagline */}
        <View className="bg-brand-purple/10 px-4 py-2 rounded-xl mb-10">
          <Text className="text-h3 text-brand-purple text-center">
            Language Master
          </Text>
        </View>

        {/* Start CTA */}
        <View className="w-full px-4">
          <View className="bg-brand-purple rounded-2xl py-4 items-center shadow-lg">
            <Text className="text-btn-lg text-white">Get Started</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
