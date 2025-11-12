import Colors from "@/src/styles/colors";
import { StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    onSubmitEditing: () => void;
}

export default function SearchBar({
    value,
    onChangeText,
    placeholder = '지역, 매장명으로 검색 (예: ‘강남’, ‘올리브영’)',
    onSubmitEditing
}: SearchBarProps
) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={Colors.TEXT_SECONDARY}
                returnKeyType="search"       // 키보드에서 '검색' 버튼 표시 (iOS/Android 공통)
                onSubmitEditing={onSubmitEditing}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 24,
        paddingHorizontal: 10,
        paddingVertical: 6,
        elevation: 2,
    },
    icon: {
        marginRight: 6,
    },
    input: {
        flex: 1,
        fontSize: 14,
        paddingHorizontal: 10,
    },
})