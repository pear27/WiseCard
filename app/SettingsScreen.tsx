import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
} from "@/src/utils/authStorage";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Configure your preferences</Text>
      <Text
        style={styles.subtitle}
        onPress={async () => {
          const accessToken = await getAccessToken();
          console.log(accessToken);
        }}
      >
        get access token
      </Text>
      <Text
        style={styles.subtitle}
        onPress={async () => {
          const refreshToken = await getRefreshToken();
          console.log(refreshToken);
        }}
      >
        get refresh token
      </Text>
      <Text
        style={styles.subtitle}
        onPress={() => {
          removeTokens();
          router.replace("/OnboardingScreen");
        }}
      >
        log out
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});
