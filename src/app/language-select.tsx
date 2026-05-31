import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { usePostHog } from "posthog-react-native";

import { languages } from "@/data/languages";
import { useLearningStore } from "@/store/learning";
import { images } from "@/constants/images";
import { BackChevron } from "@/components/AuthShared";
import { cn } from "@/lib/cn";

/**
 * Language selection screen.
 *
 * Lets the user browse supported languages and pick one.
 * Tapping a language highlights it; the "Continue" button
 * persists the choice and navigates home.
 */
export default function LanguageSelectScreen() {
  const selectLanguage = useLearningStore((s) => s.selectLanguage);
  const savedLanguage = useLearningStore((s) => s.selectedLanguage);
  const posthog = usePostHog();

  const [selected, setSelected] = useState<string | undefined>(
    savedLanguage,
  );
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? languages.filter(
        (l) =>
          l.name.toLowerCase().includes(search.toLowerCase()) ||
          l.nativeName.toLowerCase().includes(search.toLowerCase()),
      )
    : languages;

  function handleConfirm() {
    if (!selected) return;
    const lang = languages.find((l) => l.code === selected);
    posthog.capture("language_selected", {
      language_code: selected,
      language_name: lang?.name,
    });
    selectLanguage(selected);
    router.replace("/");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ─────────────────────────────── */}
        <View className="flex-row items-center px-6 pt-4 pb-2">
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <BackChevron />
          </TouchableOpacity>
          <Text className="flex-1 text-center text-h4 text-text-primary mr-8">
            Choose a language
          </Text>
        </View>

        {/* ── Search ─────────────────────────────── */}
        <View className="px-6 mt-6">
          <View className="flex-row items-center bg-surface-secondary rounded-2xl px-4 h-12">
            <Text className="text-text-muted text-body mr-2">🔍</Text>
            <TextInput
              className="flex-1 font-regular text-body text-text-primary"
              placeholder="Search languages"
              placeholderTextColor="#9599A9"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* ── Section: Popular ───────────────────── */}
        <Text className="text-h4 text-text-primary px-6 mt-8 mb-4">
          Popular
        </Text>

        {/* ── Language List ───────────────────────── */}
        <View className="px-6 gap-3">
          {filtered.map((lang) => {
            const isActive = selected === lang.code;
            return (
              <TouchableOpacity
                key={lang.code}
                onPress={() => setSelected(lang.code)}
                activeOpacity={0.7}
                className={cn(
                  "flex-row items-center rounded-2xl p-4 bg-surface-secondary border-2",
                  isActive
                    ? "border-brand-purple bg-brand-purple/5"
                    : "border-transparent",
                )}
              >
                {/* Flag */}
                <View className="w-10 h-10 rounded-full items-center justify-center bg-white">
                  <Text className="text-2xl">{lang.flag}</Text>
                </View>

                {/* Title + learners */}
                <View className="flex-1 ml-3">
                  <Text className="text-body font-semibold text-text-primary">
                    {lang.name}
                  </Text>
                  <Text className="text-body-sm text-text-tertiary mt-0.5">
                    {lang.learners >= 1_000_000
                      ? `${(lang.learners / 1_000_000).toFixed(1)}M learners`
                      : `${(lang.learners / 1_000).toFixed(1)}K learners`}
                  </Text>
                </View>

                {/* Checkmark or chevron */}
                {isActive ? (
                  <View className="w-6 h-6 rounded-full bg-brand-purple items-center justify-center">
                    <Text className="text-white text-xs font-bold">✓</Text>
                  </View>
                ) : (
                  <Text className="text-text-tertiary text-lg">›</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Confirmation Button ────────────────── */}
        <View className="px-6 mt-8">
          <TouchableOpacity
            onPress={handleConfirm}
            disabled={!selected}
            activeOpacity={0.85}
            className={cn(
              "flex-row items-center justify-center rounded-2xl h-14 gap-3",
              selected
                ? "bg-brand-purple"
                : "bg-surface-tertiary",
            )}
          >
            <Image
              source={images.earth}
              className="w-6 h-6"
              resizeMode="contain"
            />
            <Text
              className={cn(
                "text-btn",
                selected ? "text-white" : "text-text-muted",
              )}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Footer Illustration ────────────────── */}
        <View className="px-6 mt-8">
          <Image
            source={images.earth}
            className="w-full h-32"
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
