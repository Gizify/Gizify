import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

interface ProductInfoProps {
  productData: {
    name: string;
    brand: string;
    nutrition: any;
    ingredients: string[];
    packageSize: string;
    servingSize: string;
    image: string;
    source: string;
  };
}

const ProductInfo: React.FC<ProductInfoProps> = ({ productData }) => (
  <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
    {/* Gambar produk */}
    {productData.image ? <Image source={{ uri: productData.image }} style={styles.productImage} /> : <Text style={styles.noImageText}>Gambar tidak tersedia</Text>}

    {/* Nama produk */}
    <Text style={styles.productName}>{productData.name || "Nama produk tidak tersedia"}</Text>
    <Text style={styles.productBrand}>{productData.brand || "Merek tidak tersedia"}</Text>

    {/* Informasi nutrisi */}
    <View style={styles.nutritionSection}>
      <Text style={styles.sectionTitle}>Informasi Nutrisi per 100g</Text>
      <View style={styles.separator} />

      {[
        { label: "Kalori", value: productData.nutrition.calories, unit: "kcal" },
        { label: "Karbohidrat", value: productData.nutrition.carbs, unit: "g" },
        { label: "Protein", value: productData.nutrition.protein, unit: "g" },
        { label: "Lemak", value: productData.nutrition.fat, unit: "g" },
        { label: "Gula", value: productData.nutrition.sugar, unit: "g" },
        { label: "Gula Tambahan", value: productData.nutrition.added_sugar, unit: "g" },
        { label: "Serat", value: productData.nutrition.fiber, unit: "g" },
        { label: "Sodium", value: productData.nutrition.sodium, unit: "mg" },
        { label: "Asam Folat", value: productData.nutrition.folic_acid, unit: "µg" },
        { label: "Kalsium", value: productData.nutrition.kalsium, unit: "mg" },
        { label: "Vitamin D", value: productData.nutrition.vitamin_d, unit: "µg" },
        { label: "Vitamin B12", value: productData.nutrition.vitamin_b12, unit: "µg" },
        { label: "Vitamin B6", value: productData.nutrition.vitamin_b6, unit: "mg" },
        { label: "Vitamin C", value: productData.nutrition.vitamin_c, unit: "mg" },
        { label: "Vitamin A", value: productData.nutrition.vitamin_a, unit: "µg" },
        { label: "Vitamin E", value: productData.nutrition.vitamin_e, unit: "mg" },
        { label: "Zinc", value: productData.nutrition.zinc, unit: "mg" },
        { label: "Iodium", value: productData.nutrition.iodium, unit: "µg" },
        { label: "Air", value: productData.nutrition.water, unit: "g" },
        { label: "Zat Besi", value: productData.nutrition.iron, unit: "mg" },
        { label: "Magnesium", value: productData.nutrition.magnesium, unit: "mg" },
        { label: "Selenium", value: productData.nutrition.selenium, unit: "µg" },
      ].map((nutrition, index) => (
        <View key={index} style={styles.nutritionRow}>
          <Text style={styles.nutritionLabel}>{nutrition.label}</Text>
          <Text style={styles.nutritionValue}>{nutrition.value ? `${nutrition.value} ${nutrition.unit}` : "N/A"}</Text>
        </View>
      ))}
    </View>

    {/* Bahan produk */}
    <Text style={styles.productDetails}>Bahan: {productData.ingredients}</Text>

    {/* Ukuran kemasan dan porsi */}
    <Text style={styles.productDetails}>Sumber Data: {productData.source}</Text>
    <Text style={styles.productDetails}>Ukuran Kemasan: {productData.packageSize}g</Text>
    <Text style={styles.productDetails}>Ukuran Porsi: {productData.servingSize}g</Text>
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    alignItems: "center",
    padding: 16,
  },
  productBrand: {
    fontSize: 16,
    color: "#555",
  },
  productName: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginVertical: 10,
  },
  noImageText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 20,
  },
  productDetails: {
    fontSize: 16,
    color: "#333",
    marginVertical: 15,
    width: "100%",
  },
  nutritionSection: {
    width: "100%",
    marginVertical: 15,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginBottom: 12,
  },
  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingVertical: 4,
  },
  nutritionLabel: {
    fontSize: 16,
    color: "#34495e",
  },
  nutritionValue: {
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "500",
  },
});

export default ProductInfo;
