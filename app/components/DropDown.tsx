import Colors from "@/src/styles/colors";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface BankOption {
  label: string; // 한글 표시명
  value: string; // 영어 값
}

interface DropdownProps {
  options: BankOption[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
  placeholder?: string;
}

export function Dropdown({
  options,
  selectedValue,
  onSelect,
  placeholder = "카드사 선택",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  // 선택된 값에 해당하는 label 찾기
  const getSelectedLabel = () => {
    const selected = options.find((option) => option.value === selectedValue);
    return selected ? selected.label : placeholder;
  };

  return (
    <View style={styles.container}>
      {/* 드롭다운 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text
          style={selectedValue ? styles.buttonText : styles.placeholderText}
        >
          {getSelectedLabel()}
        </Text>
        {!selectedValue && (
          <Text style={[styles.arrow, isOpen && styles.arrowUp]}> ▼</Text>
        )}
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          <ScrollView style={styles.scrollView} nestedScrollEnabled>
            {options.map((bank) => (
              <TouchableOpacity
                key={bank.value}
                style={[
                  styles.item,
                  selectedValue === bank.value && styles.selectedItem,
                ]}
                onPress={() => handleSelect(bank.value)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.itemText,
                    selectedValue === bank.value && styles.selectedItemText,
                  ]}
                >
                  {bank.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1000,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 5,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: Colors.BACKGROUND_LIGHT,
    borderRadius: 16,
    // elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.ACCENT_BLUE,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#999",
  },
  arrow: {
    fontSize: 12,
    color: "#999",
  },
  arrowUp: {
    transform: [{ rotate: "180deg" }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  dropdown: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 10,
    maxHeight: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  scrollView: {
    maxHeight: 250,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  selectedItem: {
    backgroundColor: Colors.BACKGROUND_LIGHT,
  },
  itemText: {
    fontSize: 16,
    color: "#000",
  },
  selectedItemText: {
    fontWeight: "bold",
    color: Colors.PRIMARY_BLUE,
  },
});
