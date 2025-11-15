import axiosInstance from "../utils/axiosInstance";
import { cardStorage } from "./useCards";

export interface StoreFilters {
  x: number;
  y: number;
  query?: string;
  category?: string;
}

const BACKEND_URL_V1 = process.env.EXPO_PUBLIC_BACKEND_URL_V1 || "";

export const filterOfflineStores = async (filters: StoreFilters) => {
  const cardIds = await cardStorage.getCardIds();
  try {
    const offlineStoresRes = await axiosInstance.post(
      `/api/v1/cards/offline`,
      { cardIds },
      { params: filters, baseURL: BACKEND_URL_V1 }
    );
    return offlineStoresRes.data;
  } catch (err: any) {
    console.error("필터링된 오프라인 매장 목록 조회 실패:", err);
    throw err;
  }
};
