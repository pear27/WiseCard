import axiosInstance from "../utils/axiosInstance";

export const filterOnlineStores = async (category: string | null) => {
  const params: Record<string, string> = {};
  if (category) {
    params.category = category;
  }

  try {
    const res = await axiosInstance.get("/api/online-stores/search", {
      params,
    });
    return res.data;
  } catch (err: any) {
    console.error("필터링된 온라인 매장 목록 조회 실패:", err);
    throw err;
  }
};
