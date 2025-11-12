import { Store } from "@/src/constants/storeExamples";
import Colors from "@/src/styles/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
      <Text style={styles.storeName}>{store.placeName}</Text>
      <View style={styles.cardNameContainer}>
        {store.availableCards.map((card) => (
          <Text key={card.cardId} style={styles.cardName}>
            {card.cardName}
          </Text>
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
  cardNameContainer: {
    flexDirection: "row",
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
