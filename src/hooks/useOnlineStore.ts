import axiosInstance from "../utils/axiosInstance";
import { cardStorage } from "./useCards";

const BACKEND_URL_V1 = process.env.EXPO_PUBLIC_BACKEND_URL_V1 || "";

export const filterOnlineStores = async (category: string | null) => {
  const cardIds = await cardStorage.getCardIds();
  console.log("등록된 카드 ID 목록:", cardIds);

  const params: Record<string, string> = {};
  if (category) {
    params.category = category;
  }

  try {
    const onlineStoresRes = await axiosInstance.post(
      `/api/v1/cards/online`,
      { cardIds },
      { params, baseURL: BACKEND_URL_V1 }
    );
    return onlineStoresRes.data;
  } catch (err: any) {
    console.error("필터링된 온라인 매장 목록 조회 실패:", err);
    throw err;
  }
};
