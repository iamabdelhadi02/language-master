import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";

import { getLesson } from "@/data/lessons";

/**
 * Minimal lesson detail screen — placeholder for the full lesson experience.
 * Displays the lesson title and description with a back button.
 */
export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = id ? getLesson(id) : undefined;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
      <View className="flex-1 flex-center px-8">
        {lesson ? (
          <>
            <Text className="text-h3 text-text-primary mb-2">
              {lesson.title}
            </Text>
            <Text className="text-body text-text-tertiary text-center mb-4">
              {lesson.description}
            </Text>
            <Text className="text-caption text-text-muted mb-4">
              {lesson.durationMinutes} min • {lesson.xp} XP
            </Text>
            <Text className="text-body-sm text-text-muted text-center">
              Lesson detail screen coming soon.
            </Text>
          </>
        ) : (
          <>
            <Text className="text-h3 text-text-primary mb-2">
              Lesson not found
            </Text>
            <Text className="text-body text-text-tertiary text-center">
              The lesson &quot;{id}&quot; does not exist.
            </Text>
          </>
        )}

        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="mt-8 bg-brand-purple px-6 py-3 rounded-2xl"
        >
          <Text className="text-btn text-white">Go back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
