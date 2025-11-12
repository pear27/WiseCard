import { useAuth } from "@/src/contexts/AuthContext";
import Colors from "@/src/styles/colors";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const KAKAO_REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;
const MAP_WEB_URI = process.env.EXPO_PUBLIC_KAKAO_MAP_WEB;
const REDIRECT_URI = `${MAP_WEB_URI}/oauth/kakao/callback`;

export default function OnboardingScreen() {
  const { login } = useAuth();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const isMountedRef = useRef(true);
  const [code, setCode] = useState<string | null>(null);
  const [showWebView, setShowWebView] = useState(false);

  const handleMessage = (event: { nativeEvent: { data: any } }) => {
    const code = event.nativeEvent.data;
    console.log("✅ Received code:", code);

    setShowWebView(false);

    // 백엔드로 code 전송해서 토큰 받기
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

  const handleKakaoLogin = async () => {
    setIsLoginLoading(true);
    try {
      /*
      const result = {
        success: true,
        tokens: { accessToken: "dummy", refreshToken: "dummy" },
      }; // Replace with actual login logic
      if (result.success && result.tokens) {
        await login(result.tokens.accessToken, result.tokens.refreshToken);
        router.replace("/");
      } else {
        Alert.alert("로그인 실패", result.error);
      }*/
    } catch (error) {
      console.error("Kakao login error:", error);
      Alert.alert("로그인 실패");
    } finally {
      if (isMountedRef.current) {
        setIsLoginLoading(false);
      }
    }
  };

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
          <Pressable
            onPress={() => {
              setShowWebView(true);
              console.log("authUrl:", authUrl);
            }}
            disabled={isLoginLoading}
          >
            <Text>카카오로그인</Text>
          </Pressable>
        </View>
      </View>
      <Modal visible={showWebView} animationType="slide">
        <SafeAreaView style={{ flex: 1 }}>
          <Button title="닫기" onPress={() => setShowWebView(false)} />
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
    alignItems: "center",
    marginBottom: 250,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.PRIMARY_BLUE,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.TEXT_SECONDARY,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 16,
  },
  signupText: {
    alignSelf: "center",
  },
});
