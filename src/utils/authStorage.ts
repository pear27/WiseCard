import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

// AccessToken 저장
export async function saveAccessToken(token: string) {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
}

// RefreshToken 저장
export async function saveRefreshToken(token: string) {
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
}

// 두 토큰 모두 저장
export async function saveTokens(accessToken: string, refreshToken: string) {
  await Promise.all([
    SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken),
    SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken),
  ]);
}

// AccessToken 조회
export async function getAccessToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

// RefreshToken 조회
export async function getRefreshToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

// AccessToken만 삭제
export async function removeAccessToken() {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
}

// RefreshToken만 삭제
export async function removeRefreshToken() {
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}

// 모든 토큰 삭제
export async function removeTokens() {
  await Promise.all([
    SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
    SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
  ]);
}
