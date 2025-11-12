import axios from "axios";
import { router } from "expo-router";
import {
    getAccessToken,
    getRefreshToken,
    removeTokens,
    saveAccessToken,
} from "./authStorage";

const url = process.env.EXPO_PUBLIC_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: url,
  timeout: 15000, // 15초
});

// 토큰 갱신 중복 방지를 위한 플래그
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 요청 시 accessToken을 Authorization 헤더에 추가
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("토큰 조회 실패:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답에서 401 에러 처리 및 토큰 갱신
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 이미 토큰 갱신 중이면 대기열에 추가
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          throw new Error("RefreshToken이 없습니다.");
        }

        // RefreshToken으로 새로운 AccessToken 요청
        const response = await axios.post(`${url}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken } = response.data;
        await saveAccessToken(accessToken);

        // 대기 중인 요청들 처리
        processQueue(null, accessToken);
        isRefreshing = false;

        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // RefreshToken도 만료되었거나 갱신 실패
        console.warn("토큰 갱신 실패! 로그아웃합니다.");
        processQueue(refreshError, null);
        isRefreshing = false;

        try {
          await removeTokens();
          // 로그인 화면으로 이동
          router.replace("/OnboardingScreen");
        } catch (removeError) {
          console.error("토큰 삭제 실패:", removeError);
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
