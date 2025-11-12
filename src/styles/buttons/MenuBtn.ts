import { StyleSheet } from 'react-native';
import Colors from '../colors';

export const MenuButtonStyles = StyleSheet.create({
    materialButton: {
        backgroundColor: Colors.BACKGROUND_LIGHT,
        borderRadius: 8,
        elevation: 2,
        // paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
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
