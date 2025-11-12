import { cardCompanies } from "@/src/constants/cardCompanies";
import { Card, cardExamples } from "@/src/constants/cardExamples";
import { addUserCard, CardFilters, filterCards } from "@/src/hooks/useCards";
import { BackButtonStyles } from "@/src/styles/buttons/BackBtn";
import { CategoryButtonStyles } from "@/src/styles/buttons/CategoryBtn";
import Colors from "@/src/styles/colors";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
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

export default function AddCardsScreen() {
  const CARD_TYPES = [
    { key: "credit", title: "신용카드" },
    { key: "debit", title: "체크카드" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState<string>("HANA");
  const [selectedCardType, setSelectedCardType] = useState<string | null>(
    "credit"
  );

  // 검색어 입력 핸들러 (카드 이름 검색)
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  // 카드 타입 (credit/debit) 선택 핸들러
  const handleCardTypeSelect = (cardType: string) => {
    if (selectedCardType !== cardType) {
      setSelectedCardType(cardType);
    }
  };

  const [cardList, setCardList] = useState<Card[]>([]);

  // 카드 목록 요청 함수
  const fetchCards = async () => {
    const cardFilter: CardFilters = {};

    if (selectedBank) cardFilter.cardBank = selectedBank;
    if (selectedCardType) cardFilter.cardType = selectedCardType;
    if (searchQuery !== "") cardFilter.cardName = searchQuery;

    console.log("📤 카드 필터 요청 데이터:", cardFilter);
    try {
      const data = await filterCards(cardFilter);

      if (data.length == 0) {
        /* data example */
        setCardList(cardExamples);
        /* data example */
      } else {
        setCardList(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  // 카드 선택 핸들러
  const handleCardSelect = (id: number) => {
    // 같은 카드 클릭 시 선택 해제
    setSelectedCardId(selectedCardId === id ? null : id);
  };

  // 내 카드에 추가 핸들러
  const handleAddCard = async (cardId: number) => {
    console.log("추가할 카드 ID:", cardId);

    try {
      const res = await addUserCard(cardId);
      console.log(res);
      alert("카드 등록이 완료되었습니다.");
      setSelectedCardId(null);
      //TODO: 성공일 경우 "성공적으로 카드 등록" alert

      //TODO: 이미 등록된 카드일 경우 "이미 등록된 카드" alert
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [selectedBank, selectedCardType]);

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
          <Text style={styles.title}>새로운 카드 등록하기</Text>
        </View>
      </View>
      <View style={styles.filterContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearchChange}
          placeholder="카드명 검색"
          onSubmitEditing={() => {
            fetchCards();
          }}
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {cardList.map((card) => (
          <View key={card.cardId}>
            <TouchableOpacity
              style={styles.cardBlock}
              onPress={() => handleCardSelect(card.cardId)}
            >
              <Image
                source={
                  card.imgUrl && card.imgUrl.trim() !== ""
                    ? { uri: card.imgUrl }
                    : require("../assets/images/card_example.png")
                }
                style={styles.cardImage}
              />
              <View>
                <Text style={styles.cardName}>{card.cardName}</Text>
                {/* 모든 혜택 description 출력 */}
              </View>
            </TouchableOpacity>
            {/* 내 카드에 추가하기 버튼 - 선택된 경우에만 표시 */}
            {selectedCardId === card.cardId && (
              <View>
                <Text>{card.benefits.summary}</Text>
                <ActionButton
                  title={"내 카드에 추가하기"}
                  onPress={() => handleAddCard(card.cardId)}
                  stylesSet={AddActionButtonStyles}
                />
              </View>
            )}
          </View>
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
  content: {
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
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

const AddActionButtonStyles = StyleSheet.create({
  materialButton: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 60,
    height: 40,
    borderRadius: 28,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.ACCENT_BLUE,
  },
  buttonContents: {
    color: Colors.ACCENT_BLUE,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    overflow: "hidden",
    includeFontPadding: false, // Android에서 불필요한 여백 제거
    textAlignVertical: "center",
  },
});
