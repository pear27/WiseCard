import { categories } from "@/src/constants/categories";
import { storeExamples } from "@/src/constants/storeExamples";
import { filterOnlineStores } from "@/src/hooks/useOnlineStore";
import { BackButtonStyles } from "@/src/styles/buttons/BackBtn";
import { CategoryButtonStyles } from "@/src/styles/buttons/CategoryBtn";
import Colors from "@/src/styles/colors";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryButton, MenuButton } from "./components/Button";
import StoreBlock from "./components/StoreBlock";

export default function OnlineShopScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const onlineShopList = storeExamples;

  // 카테고리 선택 핸들러
  const handleCategorySelect = (category: string) => {
    // 토글 선택: 같은 카테고리 클릭 시 선택 해제
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  // 백엔드 요청 함수
  const fetchResults = async () => {
    console.log("검색 실행:", selectedCategory);

    try {
      const data = await filterOnlineStores(selectedCategory);
      console.log(data);

      // setStores(data.stores);
    } catch (error) {
      console.error("검색 요청 실패:", error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MenuButton
          icon={require("../assets/images/icons/angle-left-b.png")}
          onPress={() => router.back()}
          disabled={false}
          stylesSet={BackButtonStyles}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>온라인 쇼핑몰</Text>
          <Text style={styles.subtitle}>
            내 카드로 혜택을 누릴 수 있는 온라인 쇼핑몰은?
          </Text>
        </View>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((category) => (
            <CategoryButton
              icon={category.icon}
              key={category.value} // 예: cafe
              title={category.label} // 예: 카페
              onPress={() => handleCategorySelect(category.value)}
              selected={selectedCategory === category.value}
              stylesSet={CategoryButtonStyles}
            />
          ))}
        </ScrollView>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.shopContainer}
      >
        {onlineShopList.map((store, i) => (
          <StoreBlock
            key={i}
            store={store}
            onPress={() =>
              router.push({
                pathname: "/StoreDetailScreen",
                params: { name: store.placeName },
                // 추후 파라미터 수정
              })
            }
            //stylesSet={undefined}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  header: {
    paddingVertical: 20,
    gap: 15,
  },
  titleContainer: {
    // paddingVertical: 10,
  },
  title: {
    color: Colors.PRIMARY_BLUE,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  categoryContainer: {
    //flexDirection: 'row',
    paddingHorizontal: 3,
    paddingBottom: 15,
    gap: 5,
  },
  shopContainer: {
    gap: 5,
    paddingBottom: 60,
  },
});
