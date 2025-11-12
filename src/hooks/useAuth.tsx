interface LoginResult {
  success: boolean;
  isNewUser?: boolean;
  error?: string;
  tokens?: { accessToken: string; refreshToken: string };
}

const backend_url = process.env.EXPO_PUBLIC_BACKEND_URL;

export async function sendCodeToBackend(code: string): Promise<LoginResult> {
  /* 빨리 백엔드 고쳐주세요 ㅠㅠ
  try {
    const res = await axios.post(`${backend_url}/api/auth/login`, {
      accessToken: code,
    });

    console.log("🎉 Backend response:", res.data);
  } catch (error) {
    console.error("❌ Error sending code to backend:", error);
  }
  */
  return {
    success: true,
    isNewUser: false,
    tokens: { accessToken: "accesstoken", refreshToken: "refreshtoken" },
  };
}
