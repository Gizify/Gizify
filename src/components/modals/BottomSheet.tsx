import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar, DateData } from "react-native-calendars";
import colors from "../../styles/colors";

interface Option {
  id: string;
  label: string;
}

type BottomSheetType = "option" | "date";

interface BottomSheetProps {
  visible: boolean;
  title: string;
  options: Option[];
  selectedOption: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
  type: BottomSheetType;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ visible, title, options, selectedOption, onSelect, onClose, type }) => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    onSelect(day.dateString);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.optionsContainer}>
            {type === "option" ? (
              options.map((option) => (
                <TouchableOpacity key={option.id} style={styles.optionItem} onPress={() => onSelect(option.id)}>
                  <View style={[styles.radioButton, selectedOption === option.id && styles.radioButtonSelected]}>{selectedOption === option.id && <View style={styles.radioButtonInner} />}</View>
                  <Text style={styles.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.calendarContainer}>
                <Calendar
                  current={selectedDate}
                  onDayPress={handleDayPress}
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      selectedColor: colors.primary,
                    },
                  }}
                  theme={{
                    calendarBackground: "white",
                    selectedDayBackgroundColor: colors.primary,
                    todayTextColor: colors.primary,
                    arrowColor: colors.primary,
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingBottom: 32,
    maxHeight: "70%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginBottom: 8,
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionItem: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    paddingVertical: 16,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: colors.primary,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  calendarContainer: {
    marginTop: 10,
  },
});

export default BottomSheet;
