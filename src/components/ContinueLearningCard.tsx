import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";


import { images } from "@/constants/images";

type ContinueLearningCardProps = {
  languageName: string;
  unitTitle: string;
  unitNumber: number;
  onContinuePress?: () => void;
};

/**
 * Continue learning card — violet background with language info,
 * unit progress, and a palace illustration.
 */
export function ContinueLearningCard({
  languageName,
  unitTitle,
  unitNumber,
  onContinuePress,
}: ContinueLearningCardProps) {
  return (
    <View className="mx-4 bg-brand-purple rounded-3xl overflow-hidden">
      <View className="flex-row items-center p-4">
        {/* Left: Text + Button */}
        <View className="flex-1 mr-3">
          <Text className="text-body-sm text-white/80 font-regular mb-1">
            Continue learning
          </Text>
          <Text className="text-h3 text-white mb-1">{languageName}</Text>
          <Text className="text-body text-white/70 font-medium mb-4">
            A1 • Unit {unitNumber} — {unitTitle}
          </Text>

          <TouchableOpacity
            onPress={onContinuePress}
            activeOpacity={0.85}
            className="bg-white px-5 py-2.5 rounded-2xl self-start"
          >
            <Text className="text-body text-brand-purple font-bold">
              Continue
            </Text>
          </TouchableOpacity>
        </View>

        {/* Right: Palace illustration */}
        <Image
          source={images.palace}
          style={{ width: 80, height: 100 }}
          contentFit="contain"
        />
      </View>
    </View>
  );
}
