import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../utils/axiosInstance";

export interface CardFilters {
  cardCompany?: string;
  cardType?: string;
  cardName?: string;
}

const BACKEND_URL_V1 = process.env.EXPO_PUBLIC_BACKEND_URL_V1 || "";
const STORAGE_KEY = "cardIds";

export const cardStorage = {
  // 현재 저장된 카드 목록 가져오기
  getCardIds: async (): Promise<number[]> => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      return json ? JSON.parse(json) : [];
    } catch (err) {
      console.error("카드 ID 목록 조회 실패:", err);
      return [];
    }
  },

  // 카드 추가
  addCardId: async (cardId: number): Promise<boolean> => {
    try {
      const currentIds = await cardStorage.getCardIds();
      if (!currentIds.includes(cardId)) {
        const newIds = [...currentIds, cardId];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error("카드 ID 추가 실패:", err);
      return false;
    }
  },

  // 카드 ID 제거
  removeCardId: async (cardId: number) => {
    try {
      const currentIds = await cardStorage.getCardIds();
      const newIds = currentIds.filter((id) => id !== cardId);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
    } catch (err) {
      console.error("카드 ID 제거 실패:", err);
    }
  },

  // 로그아웃 시 전체 삭제
  clear: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("카드 ID 초기화 실패:", err);
    }
  },
};

export const filterCards = async (filters?: CardFilters) => {
  try {
    const res = await axiosInstance.get("/api/v1/cards", {
      params: filters,
      baseURL: BACKEND_URL_V1,
    });
    return res.data;
  } catch (err: any) {
    console.error("필터링된 카드 목록 조회 실패:", err);
    throw err;
  }
};

export const getUserCards = async (filters?: CardFilters) => {
  const cardIds = await cardStorage.getCardIds();
  try {
    /*
    const res = await axiosInstance.get(`/api/cards/user`, {
      params: filters,
    });

    console.log("사용자 등록 카드 목록 응답:", res.data);

    res.data.forEach((card: any) => {
      cardIds.push(card.cardId);
    });
*/
    console.log("등록된 카드 ID 목록:", cardIds);

    const detailedCardsRes = await axiosInstance.post(
      `/api/v1/cards/my`,
      { cardIds },
      { params: filters, baseURL: BACKEND_URL_V1 }
    );

    return detailedCardsRes.data;
  } catch (err: any) {
    console.error("사용자 등록 카드 목록 조회 실패:", err);
    throw err;
  }
};

export const addUserCard = async (cardId: number) => {
  return await cardStorage.addCardId(cardId);
};

export const removeUserCard = async (cardId: number) => {
  await cardStorage.removeCardId(cardId);
};

/*
export const addUserCard = async (cardId: number) => {
  try {
    const res = await axiosInstance.post(
      `/api/cards/register?cardId=${cardId}`
    );
    return res.data;
  } catch (err: any) {
    console.error("카드 추가 실패:", err);
    throw err;
  }
};

export const removeUserCard = async (cardId: number) => {
  try {
    const res = await axiosInstance.post(`/api/cards/unregister/${cardId}`);
    return res.data;
  } catch (err: any) {
    console.error("카드 삭제 실패:", err);
    throw err;
  }
};
*/
