import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import { colors } from "@/theme";

import "../global.css";

const fontAssets = {
  "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
  "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
  "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
  "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
} as const;

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);

  // Hold the splash screen until fonts are ready
  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (fontError) {
    console.warn("Font loading error:", fontError);
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.surface.primary },
          animation: "slide_from_right",
        }}
      />
    </>
  );
}
