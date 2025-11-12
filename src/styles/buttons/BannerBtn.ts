import { StyleSheet } from 'react-native';
import Colors from '../colors';

export const BannerButtonStyles = StyleSheet.create({
    materialButton: {
        flex: 1,
        backgroundColor: Colors.ACCENT_BLUE,
        borderRadius: 8,
        elevation: 2,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon: {
        width: 56,
        height: 56,
        marginLeft: 5,
    },
    buttonContentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContents: {
        color: 'white',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
        overflow: 'hidden',
        includeFontPadding: false, // Android에서 불필요한 여백 제거
        textAlign: 'center',
        transform: [{ translateY: -2 }],
    },
    disabled: {
        backgroundColor: '#ffffff61',
        borderColor: '#1f1f1f1f',
    },
    disabledContents: {
        opacity: 0.38,
    },
    disabledIcon: {
        opacity: 0.38,
    },
});
