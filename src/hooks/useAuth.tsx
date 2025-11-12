import axios from "axios";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

interface LoginResult {
  success: boolean;
  isNewUser?: boolean;
  error?: string;
  tokens?: { accessToken: string; refreshToken: string };
}

WebBrowser.maybeCompleteAuthSession();

const backend_url = process.env.EXPO_PUBLIC_BACKEND_URL;
const REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;

export const loginWithKakao = async () => {
  try {
    const redirectUri = makeRedirectUri({
      scheme: "wisecard",
      path: "oauth",
      useProxy: true,
    });
    console.log("Redirect URI:", redirectUri);

    const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code`;

    const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

    console.log("🔍 Result type:", result.type);
    console.log("🔍 Full result:", JSON.stringify(result, null, 2));

    if (result.type === "success" && result.url) {
      const url = result.url;
      const code = url.split("code=")[1]?.split("&")[0];

      if (code) {
        console.log("Authorization Code:", code);
        await sendCodeToBackend(code);
      }
    }
  } catch (error) {
    console.error("Kakao login error:", error);
    throw error;
  }
};

async function sendCodeToBackend(code: string) {
  const res = await axios.post(`${backend_url}/api/auth/login`, {
    accessToken: code,
  });

  console.log("🎉 Backend response:", res.data);
}
