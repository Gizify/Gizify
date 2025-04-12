import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import BottomSheet from "../components/modals/BottomSheet";

const ExampleScreen = () => {
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const options = [
    { id: "1", label: "Option A" },
    { id: "2", label: "Option B" },
    { id: "3", label: "Option C" },
  ];

  const handleOptionSelect = (id: string) => {
    setSelectedOption(id);
    setShowOptionModal(false);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowDateModal(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Show Option Modal" onPress={() => setShowOptionModal(true)} />
      <Button title="Show Date Modal" onPress={() => setShowDateModal(true)} />

      <Text>Selected Option: {selectedOption}</Text>
      <Text>Selected Date: {selectedDate}</Text>

      {/* Option BottomSheet */}
      <BottomSheet visible={showOptionModal} title="Select Option" options={options} selectedOption={selectedOption} onSelect={handleOptionSelect} onClose={() => setShowOptionModal(false)} type="option" />

      {/* Date BottomSheet */}
      <BottomSheet visible={showDateModal} title="Select Date" options={[]} selectedOption={selectedDate} onSelect={handleDateSelect} onClose={() => setShowDateModal(false)} type="date" />
    </View>
  );
};

export default ExampleScreen;
