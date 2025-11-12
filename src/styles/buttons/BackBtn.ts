import { StyleSheet } from "react-native";

export const BackButtonStyles = StyleSheet.create({
    materialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: 24,
      height: 24,
    },
    buttonIcon: {
      width: 24,
      height: 24,
      // marginRight: 12,
    },
    disabled: {
      backgroundColor: '#ffffff61',
      borderColor: '#1f1f1f1f',
    },
    disabledIcon: {
      opacity: 0.38,
    },
  });
  