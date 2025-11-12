import * as Location from 'expo-location';
import { useEffect, useState } from "react";

export default function useLocaiton() {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    console.warn("⚠️ 위치 권한이 거부되었습니다.");
                    // 기본 위치로 설정
                    setLocation({ lat: 37.5665, lng: 126.9780 })
                    return;
                }
                const loc = await Location.getCurrentPositionAsync({});
                setLocation({
                    lat: loc.coords.latitude,
                    lng: loc.coords.longitude,
                });
            } catch (error) {
                console.error("❌ 위치 정보를 가져오는 데 실패했습니다.", error);
                // 실패 시 기본 위치로 설정
                setLocation({ lat: 37.5665, lng: 126.9780 })
            }
        })();
    }, []);

    return location;
}