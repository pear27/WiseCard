import { categories } from "@/src/constants/categories";
import { Store } from "@/src/constants/storeExamples";
import { KakaoPlace } from "@/src/hooks/useKakao";
import useLocaiton from "@/src/hooks/useLocation";
import { filterOfflineStores, StoreFilters } from "@/src/hooks/useOfflineStore";
import { CategoryButtonStyles } from "@/src/styles/buttons/CategoryBtn";
import { MenuButtonStyles } from "@/src/styles/buttons/MenuBtn";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView as RNScrollView,
  StyleSheet,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { WebView } from "react-native-webview";
import { BottomSheet } from "./BottomSheet";
import { CategoryButton, MenuButton } from "./Button";
import Loading from "./Loading";
import SearchBar from "./SearchBar";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function KakaoMapView() {
  const kakaoMapWeb = process.env.EXPO_PUBLIC_KAKAO_MAP_WEB;
  const location = useLocaiton();
  const webViewRef = useRef<WebView>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [storesFromKakao, setStoresFromKakao] = useState<KakaoPlace[]>([]);

  const [pageReady, setPageReady] = useState(false);

  const initialUrlRef = useRef(
    `${kakaoMapWeb}?lat=${location?.lat}&lng=${location?.lng}&v=${Date.now()}`
  );

  // 검색어 입력 핸들러
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  // 카테고리 선택 핸들러
  const handleCategorySelect = (category: string) => {
    // 토글 선택: 같은 카테고리 클릭 시 선택 해제
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setStores([]); // 선택 해제 시 stores 초기화
    } else {
      setSelectedCategory(category);
    }
  };

  // 백엔드 요청 함수
  const fetchResults = async () => {
    if (!location || !selectedCategory) return;
    const storeFilter: StoreFilters = {
      lat: location.lat,
      lng: location.lng,
      cat: selectedCategory,
    };

    console.log("검색 실행:", storeFilter);

    try {
      const data = await filterOfflineStores(storeFilter);

      console.log(data);

      setStores(data.stores);
    } catch (error) {
      console.error("검색 요청 실패:", error);
    }
  };

  // 현재 위치 가져오기 로직 (stores 초기화 추가)
  const handleRefreshLocation = async () => {
    if (isRefreshing || !pageReady) return;
    setIsRefreshing(true);

    // stores 초기화 - 현재 위치만 보여주는 상태로 복구
    setStores([]);
    setSearchQuery(""); // 검색어도 초기화
    setSelectedCategory(null); // 카테고리 선택도 해제

    try {
      // 1) 즉시: 마지막으로 알고 있는 위치가 있으면 먼저 반영해 체감 속도 향상
      const lastKnown = await Location.getLastKnownPositionAsync();
      if (lastKnown) {
        const { latitude, longitude } = lastKnown.coords;
        webViewRef.current?.injectJavaScript(
          `moveToCurrentLocation(${latitude}, ${longitude}); true;`
        );
      }

      // 2) 병렬로 최신 위치 요청 (균형 정확도 + 짧은 타임아웃)
      const getFreshPosition = Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        mayShowUserSettingsDialog: true,
      });

      const withTimeout = new Promise<Location.LocationObject>(
        (resolve, reject) => {
          const timer = setTimeout(
            () => reject(new Error("Location timeout")),
            6000
          );
          getFreshPosition
            .then((r) => {
              clearTimeout(timer);
              resolve(r);
            })
            .catch((e) => {
              clearTimeout(timer);
              reject(e);
            });
        }
      );

      const fresh = await withTimeout;
      const { latitude, longitude } = fresh.coords;
      webViewRef.current?.injectJavaScript(
        `moveToCurrentLocation(${latitude}, ${longitude}); true;`
      );
    } catch (error) {
      console.warn(
        "Failed to refresh precise location, kept last known if any.",
        error
      );
    } finally {
      setIsRefreshing(false);
    }
  };

  const onMessage = (event: any) => {
    const data = String(event.nativeEvent.data);
    if (data === "READY") setPageReady(true);

    console.log("WebView에서 받은 메시지:", data);
  };

  useEffect(() => {
    if (pageReady) {
      if (stores.length > 0) {
        webViewRef.current?.injectJavaScript(
          `window.setPins(${JSON.stringify(stores)}); true;`
        );
      } else {
        // stores가 비어있으면 pins 제거
        webViewRef.current?.injectJavaScript(`window.setPins([]); true;`);
      }
    }
  }, [stores, pageReady]);

  useEffect(() => {
    if (selectedCategory) {
      fetchResults();
    }
  }, [selectedCategory]);

  // Early return after all hooks are called
  if (!location) return <Loading />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          {/* WebView */}
          <WebView
            ref={webViewRef}
            source={{ uri: initialUrlRef.current }}
            style={styles.webview}
            javaScriptEnabled={true}
            originWhitelist={["*"]}
            startInLoadingState={true}
            renderLoading={() => <Loading />}
            onMessage={onMessage}
            onLoadStart={() =>
              console.log("WebView: 로딩 시작", initialUrlRef.current)
            }
            onLoadEnd={() => console.log("WebView: 로딩 끝")}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.error("WebView 에러:", nativeEvent);
            }}
          />

          {/* 오버레이 */}
          <View style={styles.filterContainer}>
            <SearchBar
              value={searchQuery}
              onChangeText={handleSearchChange}
              onSubmitEditing={fetchResults} // 엔터/완료 누르면 실행
            />
            <RNScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryContainer}
            >
              {categories.map((category) => (
                <CategoryButton
                  icon={category.icon}
                  key={category.value} // 예: cafe
                  title={category.label} // 예: 카페
                  onPress={() => handleCategorySelect(category.code)}
                  selected={selectedCategory === category.value}
                  stylesSet={CategoryButtonStyles}
                />
              ))}
            </RNScrollView>
          </View>
          <View style={styles.buttonContainer}>
            <MenuButton
              icon={require("../../assets/images/icons/crosshairs.png")}
              onPress={handleRefreshLocation}
              disabled={isRefreshing}
              stylesSet={MenuButtonStyles}
            />
          </View>
          {/* Bottom Sheet Modal */}
          <BottomSheet
            isVisible={selectedCategory !== null}
            onClose={() => {}}
            stores={stores}
          />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  filterContainer: {
    position: "absolute",
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: 5,
  },
  categoryContainer: {
    flexDirection: "row",
    padding: 3,
    gap: 5,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    left: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  bottomSheet: {
    position: "absolute",
    top: SCREEN_HEIGHT - 100,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 8,
  },
  handleContainer: {
    backgroundColor: "yellow",
    paddingVertical: 12,
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#D1D5DB",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  scrollView: {
    flex: 1,
  },
  storeItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
});
