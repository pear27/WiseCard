import { BackButtonStyles } from "@/src/styles/buttons/BackBtn";
import { DeleteActionButtonStyles } from "@/src/styles/buttons/DeleteActionBtn";
import Colors from "@/src/styles/colors";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
} from "@/src/utils/authStorage";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionButton, MenuButton } from "./components/Button";

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MenuButton
          icon={require("../assets/images/icons/angle-left-b.png")}
          onPress={() => router.back()}
          disabled={false}
          stylesSet={BackButtonStyles}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>설정</Text>
        </View>
      </View>
      <View>
        <Text>Configure your preferences</Text>
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
        <ActionButton
          title={"로그아웃"}
          onPress={() => {
            removeTokens();
            router.replace("/OnboardingScreen");
          }}
          stylesSet={DeleteActionButtonStyles}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingVertical: 20,
    gap: 15,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    color: Colors.PRIMARY_BLUE,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});
