import { AuthProvider } from "@/src/contexts/AuthContext";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { Alert, BackHandler, Platform } from "react-native";
import AuthGuard from "./components/AuthGuard";

export default function RootLayout() {
  useEffect(() => {
    // Android에서만 동작
    if (Platform.OS === "android") {
      const backAction = () => {
        if (!router.canGoBack()) {
          Alert.alert("앱 종료", "정말로 앱을 종료하시겠습니까?", [
            { text: "취소", onPress: () => null, style: "cancel" },
            { text: "종료", onPress: () => BackHandler.exitApp() },
          ]);
          return true; // 기본 뒤로가기 동작을 막음
        }
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }
  }, []);

  const [fontsLoaded] = useFonts({
    AntonRegular: require("../assets/fonts/Anton-Regular.ttf"),
    FreesentationMedium: require("../assets/fonts/Freesentation-5Medium.ttf"),
    FreesentationExtraBold: require("../assets/fonts/Freesentation-8ExtraBold.ttf"),
    FreesentationBlack: require("../assets/fonts/Freesentation-9Black.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <AuthGuard>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="OnboardingScreen"
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="index" options={{ gestureEnabled: false }} />
        </Stack>
      </AuthGuard>
    </AuthProvider>
  );
}
