import { BackButtonStyles } from "@/src/styles/buttons/BackBtn";
import Colors from "@/src/styles/colors";
import { Card } from "@/src/types/Cards";
import { router } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import React from "react";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MenuButton } from "./components/Button";

export default function StoreDetailScreen() {
  const params = useSearchParams();
  const storeDataStr = params.get("storeData");
  const store = storeDataStr ? JSON.parse(storeDataStr) : null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Back 버튼 */}
        <MenuButton
          icon={require("../assets/images/icons/angle-left-b.png")}
          onPress={() => router.back()}
          disabled={false}
          stylesSet={BackButtonStyles}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {store.place.place_name ?? "스토어 이름"}
          </Text>
          <Text style={styles.storeInfo}>
            {store.place.category_group_name} | {store.place.road_address_name}
          </Text>
          <Pressable
            onPress={() => {
              if (store?.place?.place_url) {
                Linking.openURL(store.place.place_url);
              }
            }}
          >
            <Text style={styles.placeLink}>카카오맵에서 보기</Text>
          </Pressable>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.sectionTitle}>사용할 수 있는 카드</Text>
        {store.cards?.map((card: Card, index: number) => (
          <View key={index} style={styles.cardBlock}>
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
              <View style={styles.cardBenefitContainer}>
                {/* 혜택 출력 (예: 5% 할인) */}
                <View>
                  {card.benefit && (
                    <>
                      {/* 할인 출력 */}
                      {card.benefit.discounts &&
                        card.benefit.discounts?.length > 0 &&
                        card.benefit.discounts.slice(0, 1).map((d, idx) => (
                          <View key={`discount-${idx}`}>
                            {d.amount && d.amount > 0 && (
                              <Text style={styles.cardBenefit}>
                                {d.amount}원 할인
                              </Text>
                            )}
                            {d.rate && d.rate > 0 && (
                              <Text style={styles.cardBenefit}>
                                {d.rate * 100}% 할인
                              </Text>
                            )}
                          </View>
                        ))}

                      {/* 포인트 출력 */}
                      {card.benefit.points &&
                        card.benefit.points?.length > 0 &&
                        card.benefit.points.slice(0, 1).map((p, idx) => (
                          <View key={`point-${idx}`}>
                            {p.amount && p.amount > 0 && (
                              <Text style={styles.cardBenefit}>
                                {p.amount}포인트 적립
                              </Text>
                            )}
                            {p.rate && p.rate > 0 && (
                              <Text style={styles.cardBenefit}>
                                {p.rate * 100}% 적립
                              </Text>
                            )}
                          </View>
                        ))}

                      {/* 캐시백 출력 */}
                      {card.benefit.cashbacks &&
                        card.benefit.cashbacks?.length > 0 &&
                        card.benefit.cashbacks.slice(0, 1).map((c, idx) => (
                          <View key={`cashback-${idx}`}>
                            {c.amount && c.amount > 0 && (
                              <Text style={styles.cardBenefit}>
                                {c.amount}원 캐쉬백
                              </Text>
                            )}
                            {c.rate && c.rate > 0 && (
                              <Text style={styles.cardBenefit}>
                                {c.rate * 100}% 캐쉬백
                              </Text>
                            )}
                          </View>
                        ))}
                    </>
                  )}
                </View>

                <Text
                  style={{
                    fontSize: 15,
                    color: "#555",
                  }}
                >
                  {card.benefit?.summary}
                </Text>
              </View>
            </View>
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
    gap: 5,
    paddingBottom: 20,
    borderBottomWidth: 1.5,
    borderColor: "#eee",
  },
  title: {
    color: Colors.PRIMARY_BLUE,
    fontSize: 24,
    fontWeight: "bold",
  },
  storeInfo: {
    fontSize: 16,
    color: Colors.TEXT_SECONDARY,
  },
  placeLink: {
    color: "#1E90FF",
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  content: {
    //marginTop: 12,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.TEXT_SECONDARY,
  },
  cardBlock: {
    flexDirection: "row",
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
    fontWeight: 700,
    fontSize: 18,
    color: Colors.TEXT_PRIMARY,
  },
  cardBenefitContainer: {
    marginHorizontal: 5,
    marginVertical: 3,
  },
  cardBenefit: {
    flexDirection: "row",
    fontSize: 16,
    fontWeight: 800,
    color: Colors.ACCENT_BLUE,
  },
});
