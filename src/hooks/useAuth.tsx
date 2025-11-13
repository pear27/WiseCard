import axios from "axios";

interface LoginResult {
  success: boolean;
  isNewUser?: boolean;
  error?: string;
  tokens?: { accessToken: string; refreshToken: string };
}

const backend_url = process.env.EXPO_PUBLIC_BACKEND_URL;
const KAKAO_REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;

export async function sendCodeToBackend(
  kakaoAccessToken: string
): Promise<LoginResult> {
  try {
    console.log("Body:", { accessToken: kakaoAccessToken });

    const res = await axios.post(`${backend_url}/api/auth/login`, {
      accessToken: kakaoAccessToken,
    });

    console.log("🎉 Backend response:", res.data);
    const accessToken = res.data.accessToken;
    const refreshToken = res.data.refreshToken;

    return {
      success: true,
      tokens: { accessToken, refreshToken },
    };
  } catch (error) {
    console.error("❌ Error sending code to backend:", error);
    return {
      success: false,
      error: "백엔드와 통신 중 오류가 발생했습니다.",
    };
  }
}
