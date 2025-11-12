import { StyleSheet } from 'react-native';

export const ksiButtonStyles = StyleSheet.create({
    materialButton: {
        backgroundColor: '#FEE500', // 변경
        // borderWidth: 1,
        // borderColor: '#747775',
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: 400,
        minWidth: 64,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
    },
    buttonIcon: {
        width: 28,
        // height: 28,
        resizeMode: 'contain',
        aspectRatio: 1,
        marginRight: 12,
    },
    buttonContentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContents: {
        color: '#000000',   // 변경
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
        overflow: 'hidden',
        includeFontPadding: false, // Android에서 불필요한 여백 제거
        textAlignVertical: 'center',
    },
    disabled: {
        backgroundColor: '#FEE50061',   // 변경
        // borderColor: '#1f1f1f1f',
    },
    disabledContents: {
        opacity: 0.38,
    },
    disabledIcon: {
        opacity: 0.38,
    },
});
