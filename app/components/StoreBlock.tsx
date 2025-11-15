import Colors from "@/src/styles/colors";
import { Store } from "@/src/types/Stores";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function StoreBlock({
  store,
  onPress,
}: //stylesSet
{
  store: Store;
  onPress: () => void;
  //stylesSet: any;
}) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View>
        <Text style={styles.storeName}>{store.place.place_name}</Text>
        <Text>
          {store.place.category_group_name} | {store.place.road_address_name}
        </Text>
      </View>
      <View style={styles.cardContainer}>
        {store.cards.map((card, index) => (
          <View key={index}>
            <Image
              source={
                card.imgUrl && card.imgUrl.trim() !== ""
                  ? { uri: card.imgUrl }
                  : require("../../assets/images/card_example.png")
              }
              style={{
                width: 88,
                height: 56,
                resizeMode: "contain",
              }}
            />
          </View>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    //flexDirection: 'row',
    //alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 16,
    // elevation: 2,
    borderBottomWidth: 0.5,
    borderColor: Colors.TEXT_SECONDARY,
    gap: 8,
  },
  storeName: {
    color: Colors.TEXT_PRIMARY,
    fontSize: 20,
    fontWeight: 700,
  },
  cardContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
    gap: 5,
  },
  cardName: {
    backgroundColor: "#ddd",
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 20,
  },
  storeInfo: {
    color: Colors.PRIMARY_BLUE,
    fontWeight: 500,
  },
});
