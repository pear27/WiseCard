import axiosInstance from "../utils/axiosInstance";

export interface CardFilters {
  cardBank?: string;
  cardType?: string;
  cardName?: string;
}

export const filterCards = async (filters?: CardFilters) => {
  try {
    const res = await axiosInstance.get("/api/cards", { params: filters });
    return res.data;
  } catch (err: any) {
    console.error("필터링된 카드 목록 조회 실패:", err);
    throw err;
  }
};

export const getUserCards = async (filters?: CardFilters) => {
  try {
    const res = await axiosInstance.get(`/api/cards/user`, {
      params: filters,
    });
    return res.data;
  } catch (err: any) {
    console.error("사용자 등록 카드 목록 조회 실패:", err);
    throw err;
  }
};

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
