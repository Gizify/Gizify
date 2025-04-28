import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenHeader from "../components/layout/ScreenHeader";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RecipeStackParamList } from "../types/navigation";
import Button from "../components/form/Button";
import { useDispatch, useSelector } from "react-redux";
import { addConsumption } from "../redux/actions/authAction";

const ResultResepAiScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const { aiRecipe } = useSelector((state: any) => state.recipes);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const token = useSelector((state: any) => state.auth.token);

  const handleAddToConsumption = async () => {
    try {
      await dispatch(addConsumption("recipe", aiRecipe.recipeId, 1, userTimeZone, token) as any);
      navigation.reset({
        index: 0,
        routes: [{ name: "Beranda" }] as any,
      });
    } catch (err) {
      Alert.alert("Gagal", "Gagal menambahkan konsumsi harian.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScreenHeader title="Hasil Resep AI" showBack onBackPress={() => navigation.goBack()} style={{ marginBottom: 12 }} />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.recipeTitle}>{aiRecipe.result.title}</Text>

          {/* Nutrition Table */}
          <View style={styles.nutritionTable}>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Kalori</Text>
              <Text style={styles.tableValue}>{aiRecipe.result.gizi.calories} kcal</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Karbo</Text>
              <Text style={styles.tableValue}>{aiRecipe.result.gizi.carbs} g</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Protein</Text>
              <Text style={styles.tableValue}>{aiRecipe.result.gizi.protein} g</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Serat</Text>
              <Text style={styles.tableValue}>{aiRecipe.result.gizi.fiber} g</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Lemak</Text>
              <Text style={styles.tableValue}>{aiRecipe.result.gizi.fat} g</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Gula</Text>
              <Text style={styles.tableValue}>{aiRecipe.result.gizi.sugar} g</Text>
            </View>
            <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.tableLabel}>Sodium</Text>
              <Text style={styles.tableValue}>{aiRecipe.result.gizi.sodium} mg</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Ingredients Section */}
          <Text style={styles.sectionTitle}>Bahan-bahan</Text>
          <View style={styles.ingredientsContainer}>
            {aiRecipe.result.bahan.map((item: any, index: any) => (
              <View key={index} style={styles.ingredientRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.ingredientText}>
                  {item.quantity} {item.unit} {item.name}
                </Text>
              </View>
            ))}
          </View>

          {/* Steps Section */}
          <Text style={styles.sectionTitle}>Cara Membuat</Text>
          <View style={styles.stepsContainer}>
            {aiRecipe.result.langkah.map((step: any, index: any) => (
              <View key={index} style={styles.stepRow}>
                <Text style={styles.stepNumber}>{index + 1}.</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Fixed Button at Bottom */}
        <View style={styles.buttonContainer}>
          <Button title="Tambah ke konsumsi harian" onPress={handleAddToConsumption} icon={<Ionicons name="add" size={20} color="white" />} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  nutritionTable: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 16,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableLabel: {
    flex: 1,
    fontSize: 14,
    color: "#555",
  },
  tableValue: {
    width: 100,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "right",
  },
  tableUnit: {
    width: 40,
    fontSize: 14,
    color: "#777",
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  ingredientsContainer: {
    marginBottom: 24,
  },
  ingredientRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bullet: {
    marginRight: 8,
    color: "#555",
  },
  ingredientText: {
    flex: 1,
    fontSize: 15,
    color: "#555",
  },
  stepsContainer: {
    marginBottom: 24,
  },
  stepRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  stepNumber: {
    fontWeight: "bold",
    marginRight: 8,
    color: "#555",
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: "#555",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
  },
});

export default ResultResepAiScreen;
