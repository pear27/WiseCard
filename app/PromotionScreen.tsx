import { cardCompanies } from "@/src/constants/cardCompanies";
import {
  filterCardCompanies,
  filterPromotions,
} from "@/src/hooks/usePromotion";
import { BackButtonStyles } from "@/src/styles/buttons/BackBtn";
import Colors from "@/src/styles/colors";
import { Promotion } from "@/src/types/Promotions";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MenuButton } from "./components/Button";
import { BankOption, Dropdown } from "./components/DropDown";

export default function PromotionScreen() {
  const [filteredCardCompanies, setFilteredCardCompanies] = useState<
    BankOption[]
  >([]);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  const fetchPromotions = async () => {
    const filteredPromotions = await filterPromotions(selectedBank);
    setPromotions(filteredPromotions);
  };

  const formatKoreanDate = (isoString: string) => {
    const date = new Date(isoString);

    // toLocaleDateString을 KST 기준으로 강제 설정
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Seoul",
    });
  };

  useEffect(() => {
    const loadCompanies = async () => {
      const result = await filterCardCompanies();
      setFilteredCardCompanies(result);
      setSelectedBank(result[0].value);
    };

    loadCompanies();
  }, []);

  useEffect(() => {
    fetchPromotions();
  }, [selectedBank]);

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
          <Text style={styles.title}>기간 한정 프로모션</Text>
          <Text style={styles.subtitle}>
            내 카드로 누릴 수 있는 기간 한정 프로모션은?
          </Text>
        </View>
      </View>
      <View>
        <Dropdown
          options={filteredCardCompanies}
          selectedValue={selectedBank}
          onSelect={setSelectedBank}
          placeholder="카드사 선택"
        />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.eventContainer}
      >
        {promotions &&
          promotions.map((prom) => (
            <Pressable
              onPress={() => {
                if (prom.url) {
                  Linking.openURL(prom.url);
                }
              }}
              style={styles.cardBlock}
            >
              <Text style={{ color: "#777" }}>
                {cardCompanies.find((card) => card.value === prom.cardCompany)
                  ?.label ?? ""}
              </Text>
              <Text
                style={{
                  color: Colors.TEXT_PRIMARY,
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {prom.description}
              </Text>
              <Text>
                {formatKoreanDate(prom.startDate)} ~{" "}
                {formatKoreanDate(prom.endDate)}
              </Text>
            </Pressable>
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
  eventContainer: {
    gap: 5,
    paddingBottom: 60,
  },
  cardBlock: {
    paddingVertical: 10,
    gap: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
