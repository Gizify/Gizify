// @ts-nocheck
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Platform, KeyboardAvoidingView, Alert, ActivityIndicator, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/form/Button";
import ScreenHeader from "../components/layout/ScreenHeader";
import { useNavigation } from "@react-navigation/native";
import Chip from "../components/form/Chip";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import colors from "../styles/colors";
import { Picker } from "@react-native-picker/picker";
import { fetchNutrition } from "../redux/actions/recipeAction";

const UploadRecipeScrenn: React.FC = () => {
  const navigation = useNavigation<any>();
  const token = useSelector((state: any) => state.auth.token);
  const units = ["gr", "ml", "sdm", "sdt", "piring", "gelas", "potong", "butir", "buah"];

  const { upRecipe, upLoading, upError } = useSelector((state: any) => state.recipes);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("gr");
  const [ingredientList, setIngredientList] = useState([]);

  const handleAdd = () => {
    if (!ingredient || !quantity || isNaN(quantity)) {
      Alert.alert("Input tidak valid", "Mohon masukkan bahan dan jumlah yang benar.");
      return;
    }

    const entry = `${quantity} ${unit} ${ingredient}`;
    setIngredientList([...ingredientList, entry]);
    setIngredient("");
    setQuantity("");
    setUnit("gr");
  };

  const handleRemove = (indexToRemove) => {
    const updatedList = ingredientList.filter((_, index) => index !== indexToRemove);
    setIngredientList(updatedList);
  };

  const handleSubmit = async () => {
    if (!title || ingredientList.length === 0) {
      Alert.alert("Data tidak lengkap", "Judul dan bahan harus diisi.");
      return;
    }

    try {
      await dispatch(fetchNutrition({ title, ingredients: ingredientList }, token) as any);
      navigation.navigate("ResultRecipe");
    } catch (err) {
      Alert.alert("Gagal", "Gagal upload resep");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <ScreenHeader title="Upload Resep" showBack onBackPress={() => navigation.goBack()} style={{ marginBottom: 12 }} />

        {/* Semua input dan FlatList di dalam ScrollView */}
        <Text style={styles.label}>Judul Makanan</Text>
        <TextInput style={styles.input} placeholder="Contoh: Orek Tempe" value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Bahan Makanan</Text>
        <TextInput style={styles.input} placeholder="Contoh: Tempe" value={ingredient} onChangeText={setIngredient} />

        <Text style={styles.label}>Jumlah dan Satuan</Text>
        <View style={styles.row}>
          <TextInput style={[styles.input, { flex: 1, marginRight: 10 }]} placeholder="Contoh: 200" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
          <View style={styles.pickerContainer}>
            <Picker selectedValue={unit} onValueChange={(itemValue) => setUnit(itemValue)} itemStyle={{ color: "black" }}>
              {units.map((u) => (
                <Picker.Item label={u} value={u} key={u} />
              ))}
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Tambah Bahan</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Daftar Bahan:</Text>
        {ingredientList.length === 0 ? (
          <Text style={styles.emptyText}>Belum ada bahan ditambahkan</Text>
        ) : (
          ingredientList.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableText}>
                {index + 1}. {item}
              </Text>
              <TouchableOpacity onPress={() => handleRemove(index)}>
                <Ionicons name="trash" size={20} color="#c00" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Tombol tetap di bawah layar */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderColor: "#ccc",
        }}
      >
        {upLoading ? <ActivityIndicator size="large" color={colors.primary} /> : <Button title="Analisis Resep" onPress={handleSubmit} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff", flex: 1 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    marginTop: 8,
    height: 38,
    flex: 1,
  },
  row: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
  tableRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tableText: { fontSize: 15 },
  emptyText: { fontStyle: "italic", color: "#999", marginTop: 8 },
  buttonWrapper: {
    marginTop: 32,
    marginBottom: 50,
    alignItems: "center",
  },
});

export default UploadRecipeScrenn;
