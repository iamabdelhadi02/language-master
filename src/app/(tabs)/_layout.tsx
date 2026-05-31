import { Tabs } from "expo-router";

import { TabBar } from "@/components/TabBar";

/**
 * Tab layout — custom tab bar with animated circle indicator.
 *
 * Five tabs: Home, Learn, AI Teacher, Chat, Profile.
 * Each screen is a placeholder for now; the Home screen UI
 * will be implemented separately.
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
