import { StyleSheet } from 'react-native';
import Colors from '../colors';

export const StoreActionButtonStyles = StyleSheet.create({
    materialButton: {
        backgroundColor: Colors.ACCENT_BLUE,
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: 400,
        minWidth: 64,
        height: 40,
        borderRadius: 28,
        justifyContent: 'center',
    },
    buttonContents: {
        color: 'white',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
        overflow: 'hidden',
        includeFontPadding: false, // Android에서 불필요한 여백 제거
        textAlignVertical: 'center',
    },
    added: {
        backgroundColor: 'white',
        borderColor: Colors.ACCENT_BLUE,
        borderWidth: 1,
    },
    addedContents: {
        color: Colors.ACCENT_BLUE,
    },
});
