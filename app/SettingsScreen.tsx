import { BackButtonStyles } from "@/src/styles/buttons/BackBtn";
import Colors from "@/src/styles/colors";
import { getAppInfo } from "@/src/utils/appInfo";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
} from "@/src/utils/authStorage";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MenuButton } from "./components/Button";

export default function SettingsScreen() {
  const appInfo = getAppInfo();

  const handleContact = async () => {
    const email = "jinalks43@gmail.com";
    const subject = "WiseCard 문의드립니다.";
    const body = "안녕하세요, WiseCard에 문의드립니다.";
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    const supported = await Linking.canOpenURL(mailtoUrl);
    if (supported) {
      await Linking.openURL(mailtoUrl);
    } else {
      Alert.alert(
        "오류",
        "이 기기에서 이메일 앱을 열 수 없습니다. 이메일 주소: " + email
      );
    }
  };

  const handleLogout = async () => {
    Alert.alert("로그아웃", "정말로 로그아웃 하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "확인",
        style: "destructive",
        onPress: async () => {
          removeTokens();
          router.replace("/OnboardingScreen");
        },
      },
    ]);
  };

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
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>푸쉬 알림 수집</Text>
          <Text style={styles.itemDetail}>
            카드 사용 내역 푸쉬 알림을 분석해 맞춤형 혜택 정보를 제공합니다.
          </Text>
        </View>
        <Pressable style={styles.itemContainer} onPress={() => handleContact()}>
          <Text style={styles.itemText}>문의하기</Text>
          <Text style={styles.itemDetail}>
            앱 사용 중 불편사항이나 개선 의견을 보내주세요.
          </Text>
        </Pressable>
        <Pressable style={styles.itemContainer} onPress={() => handleLogout()}>
          <Text style={styles.itemText}>로그아웃</Text>
        </Pressable>
        <Text
          onPress={async () => {
            const accessToken = await getAccessToken();
            console.log(accessToken);
          }}
        >
          get access token
        </Text>
        <Text
          onPress={async () => {
            const refreshToken = await getRefreshToken();
            console.log(refreshToken);
          }}
        >
          get refresh token
        </Text>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={styles.appInfoText}>
            Version: {appInfo.version}
            {appInfo.buildNumber ?? `(${appInfo.buildNumber})`}
          </Text>
          <Text style={styles.appInfoText}>
            Expo SDK: {appInfo.expoSdkVersion}
          </Text>
        </View>
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
  itemContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    gap: 5,
  },
  itemText: {
    fontSize: 16,
    color: "#555",
  },
  itemDetail: {
    fontSize: 13,
    color: "#888",
  },
  appInfoText: {
    color: "#888",
  },
});
