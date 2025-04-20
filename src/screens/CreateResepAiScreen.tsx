import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Button from "../components/form/Button";
import ScreenHeader from "../components/layout/ScreenHeader";
import globalStyles from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RecipeStackParamList } from "../types/navigation";

const CreateResepAiScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RecipeStackParamList>>();

    const [ingredients, setIngredients] = useState<string>("");
    const [difficulty, setDifficulty] = useState<string>("Mudah");
    const [cuisine, setCuisine] = useState<string>("Indonesia");

    const handleSubmit = () => {
        const ingredientList = ingredients.split(",").map((item) => item.trim());
        navigation.navigate("ResultResepAi", {
            resepRequest: {
                ingredients: ingredientList,
                difficulty,
                cuisine,
            },
        });
    };

    return (
        <ScrollView style={globalStyles.container}>
            <ScreenHeader title="Buat Resep dengan AI" />
            <View style={styles.form}>
                <Text style={styles.label}>Tingkat Kesulitan</Text>
                <RNPickerSelect
                    onValueChange={setDifficulty}
                    items={[
                        { label: "Mudah", value: "Mudah" },
                        { label: "Sedang", value: "Sedang" },
                        { label: "Sukar", value: "Sukar" },
                    ]}
                    value={difficulty}
                    style={pickerSelectStyles}
                />

                <Text style={styles.label}>Jenis Masakan</Text>
                <RNPickerSelect
                    onValueChange={setCuisine}
                    items={[
                        { label: "Indonesia", value: "Indonesia" },
                        { label: "Oriental", value: "Oriental" },
                        { label: "Western", value: "Western" },
                        { label: "Eropa", value: "Eropa" },
                    ]}
                    value={cuisine}
                    style={pickerSelectStyles}
                />

                <Text style={styles.label}>Bahan Makanan (pisahkan dengan koma)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="contoh: ayam, bawang, cabai"
                    value={ingredients}
                    onChangeText={setIngredients}
                    multiline
                />

                <Button title="Buat Resep" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        gap: 16,
        padding: 16,
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        minHeight: 80,
        textAlignVertical: "top",
    },
});

const pickerSelectStyles = {
    inputIOS: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        color: "black",
        marginBottom: 16,
    },
    inputAndroid: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        color: "black",
        marginBottom: 16,
    },
};

export default CreateResepAiScreen;
