import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Pressable
        onPress={() => {
          router.replace("/OnboardingScreen");
        }}
      >
        title="Go to Onboarding"{" "}
      </Pressable>
    </View>
  );
}
