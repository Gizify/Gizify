import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Platform, KeyboardAvoidingView, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/form/Button";
import ScreenHeader from "../components/layout/ScreenHeader";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RecipeStackParamList } from "../types/navigation";
import Chip from "../components/form/Chip";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { generateRecipe } from "../redux/actions/recipeAction";

const CreateResepAiScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("Mudah");
  const [cuisine, setCuisine] = useState("Indonesia");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);

  const formatDate = (date: any) => {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const findNutritionByDate = (date: Date) => {
    const targetDate = formatDate(date);

    const nutritionData = user.nutrition_stats.find((item: any) => {
      const itemDate = formatDate(item.date);
      return itemDate === targetDate;
    });

    return nutritionData || null;
  };

  const nutritionData = findNutritionByDate(selectedDate);

  const addIngredient = () => {
    const trimmed = ingredientInput.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients((prev) => [...prev, trimmed]);
      setIngredientInput("");
    }
  };

  const removeIngredient = (item: string) => {
    setIngredients((prev) => prev.filter((i) => i !== item));
  };

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const recipeData = {
      ingredients: ingredients,
      difficulty: difficulty,
      cuisine: cuisine,
      daily_nutrition_target: user.daily_nutrition_target,
      nutrition_stats: nutritionData,
    };
    try {
      await dispatch(generateRecipe(recipeData, token) as any);
      navigation.navigate("ResultResepAi");
    } catch (err) {
      Alert.alert("Gagal", "Gagal membuat resep");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container} keyboardShouldPersistTaps="handled">
          <ScreenHeader title="Buat dengan AI" showBack style={styles.header} />

          <Text style={styles.label}>Bahan yang ingin digunakan</Text>
          <View style={styles.inputRow}>
            <TextInput placeholder="Contoh: Tempe" value={ingredientInput} onChangeText={setIngredientInput} onSubmitEditing={addIngredient} style={styles.input} returnKeyType="done" />
            <TouchableOpacity onPress={addIngredient}>
              <Ionicons name="add-circle" size={28} color="#555" />
            </TouchableOpacity>
          </View>

          <View style={styles.chipsWrapper}>
            {ingredients.map((item) => (
              <Chip key={item} label={item} onRemove={() => removeIngredient(item)} />
            ))}
          </View>

          <Text style={styles.label}>Tingkat Kesulitan</Text>
          <View style={styles.dropdown}>
            <RNPickerSelect
              onValueChange={setDifficulty}
              value={difficulty}
              items={[
                { label: "Mudah", value: "Mudah" },
                { label: "Sedang", value: "Sedang" },
                { label: "Sulit", value: "Sulit" },
              ]}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              Icon={() => <Ionicons name="chevron-down" size={20} color="#999" />}
            />
          </View>

          <Text style={styles.label}>Jenis Masakan</Text>
          <View style={styles.dropdown}>
            <RNPickerSelect
              onValueChange={setCuisine}
              value={cuisine}
              items={[
                { label: "Indonesia", value: "Indonesia" },
                { label: "Oriental", value: "Oriental" },
                { label: "Western", value: "Western" },
                { label: "Eropa", value: "Eropa" },
              ]}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              Icon={() => <Ionicons name="chevron-down" size={20} color="#999" />}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <Button title="Buat Resep" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  header: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 20,
    color: "#333",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#FAFAFA",
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  chipsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    marginBottom: 12,
  },
  buttonWrapper: {
    marginTop: 32,
    marginBottom: 50,
    alignItems: "center",
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 10,
  },
  inputAndroid: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 10,
  },
  iconContainer: {
    top: 12,
    right: 10,
  },
};

export default CreateResepAiScreen;
