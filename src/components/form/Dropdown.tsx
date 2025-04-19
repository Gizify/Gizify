import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface DropdownProps {
    label: string;
    selected: string;
    onSelect: (value: string) => void;
    options: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, selected, onSelect, options }) => {
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity style={styles.dropdown} onPress={() => setOpen(!open)}>
                <Text style={styles.selected}>{selected}</Text>
                <Ionicons name={open ? "chevron-up" : "chevron-down"} size={20} />
            </TouchableOpacity>
            {open && (
                <FlatList
                    data={options}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => {
                                onSelect(item);
                                setOpen(false);
                            }}
                        >
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
    },
    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
    },
    selected: {
        fontSize: 16,
    },
    option: {
        backgroundColor: "#f8f8f8",
        padding: 10,
    },
});

export default Dropdown;