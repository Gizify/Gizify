import React from "react";
import { Text, View, StyleSheet } from "react-native";

type Props = {
    label: string;
};

const IngredientPill: React.FC<Props> = ({ label }) => {
    return (
        <View style={styles.pill}>
            <Text style={styles.text}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    pill: {
        backgroundColor: "#e0e0e0",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
    },
    text: {
        fontSize: 14,
    },
});

export default IngredientPill;