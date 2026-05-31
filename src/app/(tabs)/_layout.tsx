import { Tabs } from "expo-router";

import { TabBar } from "@/components/TabBar";

/**
 * Render the app's tab-based navigation layout using a custom tab bar.
 *
 * Configures an Expo Router `Tabs` navigator with headers hidden and registers five tab routes: `home`, `learn`, `ai-teacher`, `chat`, and `profile`.
 *
 * @returns A JSX element that renders the configured `Tabs` navigator
 */
export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="learn" />
      <Tabs.Screen name="ai-teacher" />
      <Tabs.Screen name="chat" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
