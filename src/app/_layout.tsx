import type { PostHogEventProperties } from "@posthog/core";

import { ClerkProvider, useUser } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { Stack, usePathname, useGlobalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useEffect, useRef } from "react";
import { PostHogProvider } from "posthog-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { colors } from "@/theme";
import { posthog } from "@/lib/posthog";
import { StreamVideoProvider } from "@/components/StreamVideoProvider";
import "../global.css";


/** Pending PostHog captures to flush after user is identified. */
type PendingCapture = { event: string; properties?: PostHogEventProperties };
let pendingCaptures: PendingCapture[] = [];

/** Enqueue a capture that will fire after `posthog.identify(user.id)` runs. */
export function enqueueIdentifyCapture(event: string, properties?: PostHogEventProperties) {
  pendingCaptures.push({ event, properties });
}



const fontAssets = {
  "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
  "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
  "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
  "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
} as const;

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

/** Inner shell — rendered inside ClerkProvider so Clerk and PostHog hooks are available. */
function AppShell() {
  const { user } = useUser();
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const previousPathname = useRef<string | undefined>(undefined);

  // Identify user with PostHog when Clerk session is active
  useEffect(() => {
    if (user) {
      posthog.identify(user.id);
      // Flush any captures that were deferred until identification
      while (pendingCaptures.length > 0) {
        const c = pendingCaptures.shift()!;
        posthog.capture(c.event, c.properties);
      }
    }
  }, [user]);

  // Manual screen tracking for Expo Router
  useEffect(() => {
    if (previousPathname.current !== pathname) {
      posthog.screen(pathname, {
        previous_screen: previousPathname.current ?? null,
        ...params,
      });
      previousPathname.current = pathname;
    }
  }, [pathname, params]);

  return (
    <StreamVideoProvider>
      <PostHogProvider
        client={posthog}
        autocapture={{
          captureScreens: false,
          captureTouches: true,
          propsToCapture: ["testID"],
          maxElementsCaptured: 20,
        }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.surface.primary },
            animation: "slide_from_right",
          }}
        />
      </PostHogProvider>
    </StreamVideoProvider>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (fontError) {
    console.warn("Font loading error:", fontError);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
          <StatusBar style="dark" />
          <AppShell />
        </ClerkProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
