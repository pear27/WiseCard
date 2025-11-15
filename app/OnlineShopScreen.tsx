import { categories } from "@/src/constants/categories";
import { filterOnlineStores } from "@/src/hooks/useOnlineStore";
import { BackButtonStyles } from "@/src/styles/buttons/BackBtn";
import { CategoryButtonStyles } from "@/src/styles/buttons/CategoryBtn";
import Colors from "@/src/styles/colors";
import { Card } from "@/src/types/Cards";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryButton, MenuButton } from "./components/Button";

export default function OnlineShopScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cardList, setCardList] = useState<Card[]>([]);

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
      const data: Card[] = await filterOnlineStores(selectedCategory);
      const filtered = data.filter((card) => (card.benefits?.length ?? 0) > 0);
      console.log(filtered);
      setCardList(filtered);
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
              onPress={() => handleCategorySelect(category.code)}
              selected={selectedCategory === category.code}
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
        {cardList.length == 0 ? (
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text>카드가 존재하지 않습니다.</Text>
          </View>
        ) : (
          cardList.map((card) => (
            <View key={card.cardId} style={styles.cardBlock}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Image
                  source={
                    card.imgUrl && card.imgUrl.trim() !== ""
                      ? { uri: card.imgUrl }
                      : require("../assets/images/card_example.png")
                  }
                  style={styles.cardImage}
                />
                <View style={{ flexShrink: 1 }}>
                  <Text style={styles.cardName}>{card.cardName}</Text>
                </View>
              </View>
              <View style={{ gap: 7 }}>
                {/* 혜택 targets */}
                <View
                  style={{ flexDirection: "row", flexWrap: "wrap", gap: 5 }}
                >
                  {card.benefits &&
                    card.benefits.map(
                      (benefit) =>
                        benefit.targets &&
                        benefit.targets.map((target, index) => (
                          <View
                            key={index}
                            style={{
                              backgroundColor: Colors.BACKGROUND_LIGHT,
                              paddingHorizontal: 10,
                              paddingVertical: 3,
                              borderRadius: 16,
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: Colors.TEXT_PRIMARY,
                                fontWeight: 600,
                              }}
                            >
                              {target}
                            </Text>
                          </View>
                        ))
                    )}
                </View>
                {/* 혜택 summary */}
                <View>
                  {card.benefits &&
                    card.benefits.map((benefit, index) => (
                      <Text
                        key={index}
                        style={{
                          marginHorizontal: 10,
                          marginBottom: 8,
                          fontSize: 15,
                          color: "#555",
                        }}
                      >
                        {benefit.summary}
                      </Text>
                    ))}
                </View>
              </View>
            </View>
          ))
        )}
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
  cardBlock: {
    paddingVertical: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cardImage: {
    width: 110,
    height: 70,
    resizeMode: "contain",
  },
  cardName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardInfo: {
    fontSize: 14,
    color: "gray",
  },
});
