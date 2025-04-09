import React, { useState } from "react";
import { View, Button } from "react-native";
import BottomSheet from "../components/modals/BottomSheet";

const ExampleScreen = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
    { id: "3", label: "Option 3" },
  ];

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Open Bottom Sheet" onPress={() => setIsBottomSheetVisible(true)} />

      <BottomSheet visible={isBottomSheetVisible} title="Pilih Opsi" options={options} selectedOption={selectedOption} onSelect={(id) => setSelectedOption(id)} onClose={() => setIsBottomSheetVisible(false)} />
    </View>
  );
};

export default ExampleScreen;
