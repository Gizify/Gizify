// @ts-nocheck
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert, LayoutAnimation, Platform, UIManager } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ScreenHeader from "../components/layout/ScreenHeader";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RecipeStackParamList } from "../types/navigation";
import Button from "../components/form/Button";
import { useDispatch, useSelector } from "react-redux";
import { addConsumption } from "../redux/actions/authAction";
import ReportButton from "../components/layout/ReportButton";
import colors from "../styles/colors";

const AccordionItem = ({ title, title2 = "", nutrients = [] }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity onPress={toggleExpand} style={styles.accordionHeader} activeOpacity={0.7}>
        <Text style={styles.accordionTitle}>
          {title} / {title2}
        </Text>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={20} color="#555" />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.accordionContent}>
          {nutrients.map((n, idx) => (
            <View key={idx} style={styles.nutrientRow}>
              <Text style={styles.nutrientName}>{n.nutrient}</Text>
              <Text style={styles.nutrientValue}>
                {n.value} {n.unit}
              </Text>
              <Text style={styles.nutrientSource}>{n.source}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const NutritionRow = ({ label, value, unit }) => (
  <View style={styles.nutrientRow}>
    <Text style={styles.nutrientName}>{label}</Text>
    <Text style={styles.nutrientValue}>
      {value} {unit}
    </Text>
  </View>
);

const UploadResultScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { upRecipe } = useSelector((state: any) => state.recipes);
  const { data } = upRecipe;
  const summary = data.nutrition_info;
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const token = useSelector((state: any) => state.auth.token);
  if (!upRecipe) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Resep tidak ditemukan</Text>
        <Button title="Kembali" onPress={() => navigation.goBack()} style={styles.backButton} />
      </View>
    );
  }

  const handleAddToConsumption = async () => {
    try {
      await dispatch(addConsumption("upload", upRecipe.data._id, 1, userTimeZone, token) as any);
      navigation.reset({
        index: 0,
        routes: [{ name: "Beranda" }] as any,
      });
    } catch (err) {
      Alert.alert("Gagal", "Gagal menambahkan konsumsi harian.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Hasil Resep AI" showBack onBackPress={() => navigation.goBack()} style={{ marginBottom: 12 }} />
        {/* Title */}
        <Text style={styles.recipeTitle}>{data.title}</Text>

        {/* Nutrition Summary Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ringkasan Nutrisi</Text>
          <View style={styles.nutritionCard}>
            {/* Makronutrien utama */}
            <View style={styles.macrosContainer}>
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{summary.calories}</Text>
                <Text style={styles.macroLabel}>Kalori</Text>
              </View>
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{summary.protein}</Text>
                <Text style={styles.macroLabel}>Protein</Text>
              </View>
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{summary.carbs}</Text>
                <Text style={styles.macroLabel}>Karbo</Text>
              </View>
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{summary.fat}</Text>
                <Text style={styles.macroLabel}>Lemak</Text>
              </View>
            </View>

            {/* Rincian nutrisi lainnya */}
            <View style={styles.nutritionDetails}>
              <NutritionRow label="Serat" value={summary.fiber} unit="g" />
              <NutritionRow label="Gula" value={summary.sugar} unit="g" />
              <NutritionRow label="Gula tambahan" value={summary.added_sugar} unit="" />
              <NutritionRow label="Sodium" value={summary.sodium} unit="mg" />
              <NutritionRow label="Zat Besi" value={summary.iron} unit="mg" />
              <NutritionRow label="Kalsium" value={summary.kalsium} unit="mg" />
              <NutritionRow label="Magnesium" value={summary.magnesium} unit="mg" />
              <NutritionRow label="Zinc" value={summary.zinc} unit="mg" />
              <NutritionRow label="Selenium" value={summary.selenium} unit="µg" />
              <NutritionRow label="Iodium" value={summary.iodium} unit="µg" />
              <NutritionRow label="Vitamin A" value={summary.vitamin_a} unit="µg" />
              <NutritionRow label="Vitamin C" value={summary.vitamin_c} unit="mg" />
              <NutritionRow label="Vitamin D" value={summary.vitamin_d} unit="µg" />
              <NutritionRow label="Vitamin E" value={summary.vitamin_e} unit="mg" />
              <NutritionRow label="Vitamin B6" value={summary.vitamin_b6} unit="mg" />
              <NutritionRow label="Vitamin B12" value={summary.vitamin_b12} unit="µg" />
              <NutritionRow label="Asam Folat" value={summary.folic_acid} unit="µg" />
              <NutritionRow label="Air" value={summary.water} unit="g" />
            </View>
          </View>
        </View>

        {/* Per Ingredient Nutrients */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Detail Nutrisi per Bahan</Text>
          {data.ingredients.map((ing, idx) => (
            <AccordionItem key={idx} title={ing.name} title2={ing.name_en} nutrients={ing.nutrients} />
          ))}
        </View>

        <View style={styles.dataWarningContainer}>
          <View style={styles.warningHeader}>
            <MaterialIcons name="error-outline" size={20} color="#D32F2F" />
            <Text style={styles.warningTitle}>Akurasi Data Nutrisi</Text>
          </View>
          <Text style={styles.warningText}>Informasi nutrisi berasal dari database USDA dan TKPI yang mungkin memiliki keterbatasan:</Text>
          <View style={styles.bulletList}>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Nama bahan mungkin tidak cocok 100% dengan produk lokal</Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Beberapa nilai nutrisi bisa kosong/tidak tersedia</Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Variasi alami bahan makanan mempengaruhi akurasi</Text>
            </View>
          </View>
          <Text style={styles.warningFooter}>Untuk kebutuhan medis/diet khusus, konsultasikan ke ahli gizi sebelum menggunakan resep ini.</Text>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      {/* Fixed Button at Bottom */}
      <View style={styles.buttonContainer}>
        <View style={styles.reportButton}>
          <ReportButton reportedItem={upRecipe.recipeId} />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToConsumption} activeOpacity={0.8}>
          <Ionicons name="add" size={20} color="white" />
          <Text style={styles.addButtonText}>Tambah ke konsumsi harian</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    color: "#e74c3c",
    textAlign: "center",
  },
  backButton: {
    width: "80%",
    marginTop: 20,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  recipeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
    textAlign: "center",
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#2c3e50",
    borderBottomWidth: 2,
    borderBottomColor: "#e1e5eb",
    paddingBottom: 6,
  },
  ingredientsList: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 12,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#3498db",
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 15,
    color: "#34495e",
    flex: 1,
  },
  stepsList: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 12,
  },
  stepItem: {
    flexDirection: "row",
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  stepNumberText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: "#34495e",
  },
  nutritionCard: {
    backgroundColor: "#edf2f6",
    borderRadius: 10,
    padding: 16,
  },
  macrosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#d6e0ea",
  },
  macroItem: {
    alignItems: "center",
  },
  macroValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  macroLabel: {
    fontSize: 12,
    color: "#7f8c8d",
    marginTop: 4,
  },
  nutritionDetails: {
    paddingHorizontal: 8,
  },
  nutrientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  nutrientName: {
    fontSize: 14,
    color: "#34495e",
  },
  nutrientValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2c3e50",
  },
  accordionContainer: {
    marginBottom: 10,
    backgroundColor: "#f0f4f7",
    borderRadius: 10,
    overflow: "hidden",
  },
  accordionHeader: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accordionTitle: {
    fontWeight: "600",
    fontSize: 16,
    color: "#2c3e50",
  },
  accordionContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#f8fafc",
  },
  nutrientRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: 4,
    gap: 8,
  },

  nutrientName: {
    flex: 2,
    fontSize: 14,
    color: "#34495e",
  },

  nutrientValue: {
    flex: 1,
    fontSize: 14,
    textAlign: "right",
    color: "#2c3e50",
  },

  nutrientSource: {
    flex: 1,
    fontSize: 12,
    textAlign: "right",
    color: "#95a5a6",
    fontStyle: "italic",
  },
  spacer: {
    height: 30,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,

    gap: 10,
  },
  reportButton: {
    flex: 1,
  },
  addButton: {
    flex: 3,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dataWarningContainer: {
    backgroundColor: "#FFEBEE",
    borderLeftWidth: 4,
    borderLeftColor: "#D32F2F",
    borderRadius: 4,
    padding: 16,
    marginVertical: 16,
  },
  warningHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D32F2F",
    marginLeft: 8,
  },
  warningText: {
    fontSize: 14,
    color: "#5D4037",
    marginBottom: 8,
    lineHeight: 20,
  },
  bulletList: {
    marginLeft: 8,
    marginBottom: 8,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bullet: {
    color: "#D32F2F",
    marginRight: 8,
  },
  bulletText: {
    fontSize: 14,
    color: "#5D4037",
    flex: 1,
    lineHeight: 20,
  },
  warningFooter: {
    fontSize: 14,
    color: "#D32F2F",
    fontWeight: "500",
    marginTop: 8,
    fontStyle: "italic",
  },
  addButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 16,
  },
});

export default UploadResultScreen;
