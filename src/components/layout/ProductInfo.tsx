import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

interface ProductInfoProps {
  productData: any;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ productData }) => (
  <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
    {productData.image_url ? <Image source={{ uri: productData.image_url }} style={styles.productImage} /> : <Text style={styles.noImageText}>Gambar tidak tersedia</Text>}

    <Text style={styles.productName}>{productData.product_name || "Nama produk tidak tersedia"}</Text>

    <View style={styles.nutritionSection}>
      <Text style={styles.sectionTitle}>Informasi Nutrisi per 100g</Text>
      <View style={styles.separator} />

      {[
        { label: "Energi", value: productData.nutriments?.["energy-kcal_100g"], unit: "kcal" },
        { label: "Lemak", value: productData.nutriments?.["fat_100g"], unit: "g" },
        { label: "Lemak Jenuh", value: productData.nutriments?.["saturated-fat_100g"], unit: "g" },
        { label: "Karbohidrat", value: productData.nutriments?.["carbohydrates_100g"], unit: "g" },
        { label: "Gula", value: productData.nutriments?.["sugars_100g"], unit: "g" },
        { label: "Protein", value: productData.nutriments?.["proteins_100g"], unit: "g" },
        { label: "Garam", value: productData.nutriments?.["salt_100g"], unit: "g" },
      ].map((nutrition, index) => (
        <View key={index} style={styles.nutritionRow}>
          <Text style={styles.nutritionLabel}>{nutrition.label}</Text>
          <Text style={styles.nutritionValue}>{nutrition.value ? `${nutrition.value} ${nutrition.unit}` : "N/A"}</Text>
        </View>
      ))}
    </View>

    <Text style={styles.productDetails}>Bahan: {productData.ingredients_text || "Tidak tersedia"}</Text>
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
