import { Store } from "@/src/types/Stores";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import StoreBlock from "./StoreBlock";

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  stores?: Store[];
}

export function BottomSheet({ isVisible, onClose, stores }: BottomSheetProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["15%", "50%", "80%"], []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  const renderBackdrop = useCallback(() => null, []);

  useEffect(() => {
    if (isVisible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isVisible]);

  // renders
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={2}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
    >
      <BottomSheetScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {stores &&
          stores.map((store, index) => (
            <StoreBlock
              key={index}
              store={store}
              onPress={() =>
                router.push({
                  pathname: "/StoreDetailScreen",
                  params: {
                    storeData: JSON.stringify(store),
                  },
                })
              }
            />
          ))}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    margin: 20,
    gap: 10,
  },
});
