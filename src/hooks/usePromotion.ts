import { cardCompanies } from "../constants/cardCompanies";
import { Card } from "../types/Cards";
import axiosInstance from "../utils/axiosInstance";
import { getUserCards } from "./useCards";

const BACKEND_URL_V1 = process.env.EXPO_PUBLIC_BACKEND_URL_V1 || "";

export const filterCardCompanies = async () => {
  const myCards = await getUserCards();
  const filteredCardCompanies = cardCompanies.filter((cardCompany) =>
    myCards.some((myCard: Card) => myCard.cardCompany === cardCompany.value)
  );
  console.log(filteredCardCompanies);

  return filteredCardCompanies;
};

export const filterPromotions = async (cardCompany: string | null) => {
  const params: Record<string, string> = {};
  if (cardCompany) {
    params.cardCompany = cardCompany;
  }

  try {
    const promotionsRes = await axiosInstance.get(`/api/v1/promotions`, {
      params,
      baseURL: BACKEND_URL_V1,
    });
    return promotionsRes.data;
  } catch (err: any) {
    console.error("필터링된 온라인 매장 목록 조회 실패:", err);
    throw err;
  }
};
