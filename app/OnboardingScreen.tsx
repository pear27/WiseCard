import { useAuth } from "@/src/contexts/AuthContext";
import { sendCodeToBackend } from "@/src/hooks/useAuth";
import { ksiButtonStyles } from "@/src/styles/buttons/KakaoLoginBtn";
import Colors from "@/src/styles/colors";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { SocialLoginButton } from "./components/Button";

const KAKAO_REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;
const MAP_WEB_URI = process.env.EXPO_PUBLIC_KAKAO_MAP_WEB;
const REDIRECT_URI = `${MAP_WEB_URI}/oauth/kakao/callback`;

export default function OnboardingScreen() {
  const { login } = useAuth();

  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const isMountedRef = useRef(true);
  const [showWebView, setShowWebView] = useState(false);

  const handleMessage = async (event: { nativeEvent: { data: any } }) => {
    try {
      // 카카오 인가 코드
      const code = event.nativeEvent.data;
      console.log("✅ Received code:", code);

      const res = await axios.post(
        `https://kauth.kakao.com/oauth/token?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}&grant_type=authorization_code`
      );

      // 카카오 액세스 토큰
      console.log("🎉 Kakao Token response:", res.data);

      // 백엔드로 code 전송해서 토큰 받기
      const result = await sendCodeToBackend(res.data.access_token);
      //setShowWebView(false);
      if (result.success && result.tokens) {
        await login(result.tokens.accessToken, result.tokens.refreshToken);
        router.replace("/");
      } else {
        Alert.alert("로그인 실패", result.error);
      }
    } catch (error) {
      console.error("❌ Unexpected Error:", error);
      Alert.alert(
        "로그인 실패",
        "예기치 않은 오류가 발생했습니다. 다시 시도해 주세요."
      );
    } finally {
      if (isMountedRef.current) setIsLoginLoading(false);
    }
  };

  const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=code`;

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            카드 혜택,{"\n"}제대로 누리고 계신가요?
          </Text>
          <Text style={styles.subtitle}>
            WiseCard에서 매장과 카드를 추천받고{"\n"}할인, 캐시백, 포인트 혜택을
            남김 없이 누리세요.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <SocialLoginButton
            title="카카오 계정으로 로그인"
            icon={require("../assets/images/k-logo.png")}
            onPress={() => {
              setIsLoginLoading(true);
              setShowWebView(true);
            }}
            disabled={isLoginLoading}
            stylesSet={ksiButtonStyles}
          />
        </View>
      </View>
      <Modal transparent visible={showWebView} animationType="slide">
        <SafeAreaView style={{ flex: 1, borderRadius: 20, overflow: "hidden" }}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setShowWebView(false)}
          >
            <Text style={styles.modalCloseButtonText}>닫기</Text>
          </TouchableOpacity>
          <WebView source={{ uri: authUrl }} onMessage={handleMessage} />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_LIGHT,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  header: {
    //alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 250,
  },
  title: {
    fontSize: 35,
    //fontWeight: "700",
    fontFamily: "FreesentationExtraBold",
    color: Colors.PRIMARY_BLUE,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 19,
    fontFamily: "FreesentationMedium",
    color: Colors.TEXT_SECONDARY,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 16,
  },
  modalCloseButton: {
    padding: 10,
    backgroundColor: Colors.PRIMARY_BLUE,
    alignItems: "center",
  },
  modalCloseButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
