import axios from "axios";

const KAKAO_API_BASE_URL =
  "https://dapi.kakao.com/v2/local/search/category.json";
const KAKAO_REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;

export interface KakaoPlace {
  id: string;
  place_name: string;
  category_name: string;
  phone?: string;
  address_name?: string;
  road_address_name?: string;
  x: string; // longitude
  y: string; // latitude
}

interface KakaoApiResponse {
  documents: KakaoPlace[];
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
}

export async function searchPlaces(
  categoryCode: string,
  latitude: number,
  longitude: number
): Promise<KakaoPlace[]> {
  try {
    const response = await axios.get<KakaoApiResponse>(KAKAO_API_BASE_URL, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
      params: {
        category_group_code: categoryCode,
        x: longitude,
        y: latitude,
        radius: 2000,
        page: 1,
        size: 15,
      },
    });

    return response.data.documents;
  } catch (error) {
    console.error("Kakao API 호출 실패:", error);
    return [];
  }
}
