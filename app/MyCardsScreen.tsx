import { CARD_TYPES, cardCompanies } from "@/src/constants/cardCompanies";
import { categories } from "@/src/constants/categories";
import {
  CardFilters,
  getUserCards,
  removeUserCard,
} from "@/src/hooks/useCards";
import { BackButtonStyles } from "@/src/styles/buttons/BackBtn";
import { CategoryButtonStyles } from "@/src/styles/buttons/CategoryBtn";
import { DeleteActionButtonStyles } from "@/src/styles/buttons/DeleteActionBtn";
import Colors from "@/src/styles/colors";
import { Card } from "@/src/types/Cards";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionButton, CategoryButton, MenuButton } from "./components/Button";
import { Dropdown } from "./components/DropDown";
import SearchBar from "./components/SearchBar";

const CARD_PREVIEW_WIDTH = 25;
const CARD_SPACING = 10;

export default function MyCardsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedCardType, setSelectedCardType] = useState<string | null>(null);

  // 검색어 입력 핸들러
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  // 카드 타입 (credit/debit) 선택 핸들러
  const handleCardTypeSelect = (cardType: string) => {
    if (selectedCardType === cardType) {
      setSelectedCardType(null);
    } else {
      setSelectedCardType(cardType);
    }
  };

  const [cardList, setCardList] = useState<Card[]>([]);

  // 카드 리스트 너비 변수
  const [cardWidth, setCardWidth] = useState(0);
  const [snapOffsets, setSnapOffsets] = useState<number[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { x: any } };
  }) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (cardWidth + CARD_SPACING));
    setActiveIndex(index);
  };

  // 카드 목록 요청 함수
  const fetchUserCards = async () => {
    const cardFilter: CardFilters = {};

    if (selectedBank) cardFilter.cardCompany = selectedBank;
    if (selectedCardType) cardFilter.cardType = selectedCardType;
    if (searchQuery !== "") cardFilter.cardName = searchQuery;

    console.log("📤 카드 필터 요청 데이터:", cardFilter);

    try {
      const data = await getUserCards(cardFilter);

      setCardList([
        ...data,
        {
          cardId: 0,
          cardName: "",
          imgUrl: undefined,
          benefits: [],
          cardCompany: undefined,
          cardType: "add",
          cardUrl: null,
        }, // 리스트 마지막에 카드 추가 버튼
      ]);
    } catch (err) {
      console.error("검색 요청 실패:", err);
    }
  };

  const handleRemoveUserCard = async () => {
    console.log("delete card num:", cardList[activeIndex]?.cardName);
    // 확인 다이얼로그
    Alert.alert(
      "카드 삭제",
      `선택하신 카드 "${cardList[activeIndex].cardName}"를 삭제하시겠습니까?`,
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "삭제",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await removeUserCard(cardList[activeIndex].cardId);
              Alert.alert("완료", "카드가 삭제되었습니다");
              fetchUserCards();
            } catch (err) {
              console.error(err);
              Alert.alert("오류", "카드 삭제 중 문제가 발생했습니다");
            }
          },
        },
      ]
    );
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserCards();
    }, [selectedBank, selectedCardType, searchQuery])
  );

  useEffect(() => {
    if (cardList.length === 0 || cardWidth === 0) {
      setSnapOffsets([]);
      return;
    }

    const interval = cardWidth + CARD_SPACING;
    const offsets = cardList.map((_, i) => {
      return Math.round(i * interval);
    });

    setSnapOffsets(offsets);
  }, [cardList, cardWidth]);

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
          <Text style={styles.title}>나의 카드</Text>
        </View>
      </View>
      <View style={styles.filterContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearchChange}
          placeholder="카드 검색 (카드명 혹은 별명)"
          onSubmitEditing={() => {}}
        />
        <View style={styles.categoryContainer}>
          <Dropdown
            options={cardCompanies}
            selectedValue={selectedBank}
            onSelect={setSelectedBank}
            placeholder="카드사 선택"
          />
          {CARD_TYPES.map((type) => (
            <CategoryButton
              icon={null}
              key={type.key}
              title={type.title}
              onPress={() => handleCardTypeSelect(type.key)}
              selected={selectedCardType === type.key}
              stylesSet={CategoryButtonStyles}
            />
          ))}
        </View>
      </View>
      <View
        style={styles.cardContainer}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setCardWidth(width - 60);
        }}
      >
        <FlatList
          data={cardList}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToAlignment="start"
          contentContainerStyle={{
            paddingHorizontal: CARD_PREVIEW_WIDTH, // 양옆 여백 → 첫/마지막 카드도 가운데에 위치
          }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          snapToOffsets={snapOffsets}
          renderItem={({ item }) => (
            <View
              style={{
                width: cardWidth,
                marginHorizontal: CARD_SPACING / 2,
                alignItems: "center",
              }}
            >
              {item.cardType === "add" ? (
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 180,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: "#ccc",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    router.push("../AddCardsScreen");
                  }}
                >
                  <Text
                    style={{ color: "#666", fontSize: 18, fontWeight: "bold" }}
                  >
                    + 카드 추가
                  </Text>
                </TouchableOpacity>
              ) : (
                <Image
                  source={{ uri: item.imgUrl ?? undefined }}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: 180,
                    // aspectRatio: 1.586,
                    borderRadius: 12,
                    backgroundColor: Colors.HIGHLIGHT_YELLOW,
                  }}
                />
              )}
            </View>
          )}
        />
      </View>
      {/* 카드 정보 영역 */}
      <View style={styles.cardDataContainer}>
        {/* 카드 이름 */}
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {cardList[activeIndex]?.cardName}
        </Text>
        {/* 혜택 카테고리 */}
        {(() => {
          const allCategories = [
            ...new Set(
              (cardList[activeIndex]?.benefits || []).flatMap(
                (benefit) => benefit.categories || []
              )
            ),
          ];

          const categoryButtons = allCategories.map((catCode) => {
            const category = categories.find((cat) => cat.code === catCode);
            return category ? (
              <CategoryButton
                key={category.value}
                icon={category.icon}
                title={category.label}
                onPress={() => {}}
                selected={true}
                stylesSet={CardCategoryStyles}
              />
            ) : null;
          });

          return (
            <View
              style={{
                marginVertical: 10,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 5,
              }}
            >
              {categoryButtons}
            </View>
          );
        })()}
        {/* 혜택 요약 */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ maxHeight: 200 }}
          nestedScrollEnabled={true} // iOS/Android 중첩 스크롤 대응
        >
          {cardList[activeIndex]?.benefits?.map((benefit, index) => (
            <View key={index}>
              {/* summary */}
              {benefit.summary && (
                <Text
                  style={{
                    marginHorizontal: 10,
                    marginBottom: 8,
                    fontSize: 15,
                    color: "#555",
                  }}
                >
                  {benefit.summary}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>

        {/* 카드 삭제 버튼 */}
        {cardList[activeIndex]?.cardType !== "add" && (
          <ActionButton
            title={"카드 삭제하기"}
            onPress={() => handleRemoveUserCard()}
            stylesSet={DeleteActionButtonStyles}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 30,
  },
  header: {
    paddingVertical: 20,
    gap: 15,
  },
  titleContainer: {
    alignItems: "center",
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
  filterContainer: {
    flexDirection: "column",
    width: "100%",
    gap: 8,
  },
  cardContainer: {
    marginHorizontal: -30,
  },
  cardDataContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  categoryContainer: {
    flexDirection: "row",
    paddingBottom: 15,
    gap: 5,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 20,
  },
  scroll: {
    paddingHorizontal: 10,
  },
});

const CardCategoryStyles = StyleSheet.create({
  materialButton: {
    backgroundColor: Colors.BACKGROUND_LIGHT,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
    tintColor: "#414141",
  },
  buttonContentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContents: {
    color: Colors.TEXT_PRIMARY,
    fontSize: 12,
    lineHeight: 20,
    fontWeight: "600",
    overflow: "hidden",
    includeFontPadding: false, // Android에서 불필요한 여백 제거
    textAlignVertical: "center",
  },
  selected: {
    backgroundColor: Colors.ACCENT_BLUE,
  },
  selectedContents: {
    color: "white",
  },
  selectedIcon: {
    tintColor: "white",
  },
});
