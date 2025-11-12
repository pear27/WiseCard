import { StyleSheet } from 'react-native';
import Colors from '../colors';

export const CategoryButtonStyles = StyleSheet.create({
    materialButton: {
        backgroundColor: Colors.BACKGROUND_LIGHT,
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 16,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonIcon: {
        width: 24,
        height: 24,
        marginRight: 6,
        tintColor: '#414141'
    },
    buttonContentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContents: {
        color: Colors.TEXT_PRIMARY,
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
        overflow: 'hidden',
        includeFontPadding: false, // Android에서 불필요한 여백 제거
        textAlignVertical: 'center',
    },
    selected: {
        backgroundColor: Colors.ACCENT_BLUE,
    },
    selectedContents: {
        color: 'white'
    },
    selectedIcon: {
        tintColor: 'white'
    },
});