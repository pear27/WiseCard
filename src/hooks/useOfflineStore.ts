import axiosInstance from "../utils/axiosInstance";

export interface StoreFilters {
  lat: number;
  lng: number;
  cat: string;
}

export const filterOfflineStores = async (filters: StoreFilters) => {
  try {
    const res = await axiosInstance.post("/api/simple-stores/search", filters);
    return res.data;
  } catch (err: any) {
    console.error("필터링된 오프라인 매장 목록 조회 실패:", err);
    throw err;
  }
};
