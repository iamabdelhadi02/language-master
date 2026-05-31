import * as WebBrowser from "expo-web-browser";
import { View, ActivityIndicator } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function OAuthCallback() {
  return (
    <View className="flex-1 items-center justify-center bg-[#FEFEFE]">
      <ActivityIndicator size="large" color="#5238FC" />
    </View>
  );
}
