import { StyleSheet } from "react-native";

export const DeleteActionButtonStyles = StyleSheet.create({
  materialButton: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 60,
    height: 40,
    borderRadius: 28,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "red",
  },
  buttonContents: {
    color: "red",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    overflow: "hidden",
    includeFontPadding: false, // Android에서 불필요한 여백 제거
    textAlignVertical: "center",
  },
});
