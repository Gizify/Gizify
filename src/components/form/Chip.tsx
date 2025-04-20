import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ChipProps = {
    label: string;
    onRemove: () => void;
};

const Chip: React.FC<ChipProps> = ({ label, onRemove }) => {
    return (
        <View style={styles.chip}>
            <Text style={styles.text}>{label}</Text>
            <TouchableOpacity onPress={onRemove}>
                <Ionicons name="close-circle-outline" size={18} color="#555" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    chip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F1F1F1",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    text: {
        marginRight: 6,
        fontSize: 14,
        fontWeight: "500",
    },
});

export default Chip;
