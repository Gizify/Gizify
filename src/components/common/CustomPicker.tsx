import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ListRenderItem } from "react-native";
import { CustomDropdownProps, DropdownItem } from "../../types/customDropdown";

const CustomDropdown: React.FC<CustomDropdownProps> = ({ selectedValue, onValueChange, items }) => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const renderItem: ListRenderItem<DropdownItem> = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        onValueChange(item.value);
        setDropdownVisible(false);
      }}
    >
      <Text style={styles.itemText}>{item.label}</Text>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
        <View style={styles.selectedItemContainer}>
          <Text style={styles.selectedItemText}>{items.find((item) => item.value === selectedValue)?.label}</Text>
          <Image
            source={{
              uri: items.find((item) => item.value === selectedValue)?.imageUrl,
            }}
            style={styles.selectedItemImage}
          />
        </View>
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdownContainer}>
          <FlatList data={items} renderItem={renderItem} keyExtractor={(item) => item.value} style={styles.dropdownList} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  selectedItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedItemImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  selectedItemText: {
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  itemText: {
    fontSize: 16,
  },
  dropdownContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    maxHeight: 200,
    backgroundColor: "white",
    zIndex: 1000,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownList: {
    width: "100%",
  },
});

export default CustomDropdown;
