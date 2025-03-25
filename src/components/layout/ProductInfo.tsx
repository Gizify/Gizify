import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface ProductInfoProps {
  productData: any;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ productData }) => (
  <View style={styles.productInfo}>
    <Text style={styles.productName}>{productData.product_name || "Nama produk tidak tersedia"}</Text>

    {productData.image_url ? <Image source={{ uri: productData.image_url }} style={styles.productImage} /> : <Text style={styles.noImageText}>Gambar tidak tersedia</Text>}

    <Text style={styles.productDetails}>Merek: {productData.brands || "Tidak diketahui"}</Text>
    <Text style={styles.productDetails}>Kuantitas: {productData.quantity || "Tidak tersedia"}</Text>

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
          <Text style={styles.nutritionValue}>{nutrition.value ? `${nutrition.value}${nutrition.unit}` : "N/A"}</Text>
        </View>
      ))}
    </View>

    <Text style={styles.productDetails}>Bahan: {productData.ingredients_text || "Tidak tersedia"}</Text>
  </View>
);

const styles = StyleSheet.create({
  productInfo: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  productName: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
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
  },
  productDetails: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  nutritionSection: {
    width: "100%",
    marginVertical: 15,
    padding: 10,
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
    marginBottom: 6,
  },
  nutritionLabel: {
    fontSize: 14,
    color: "#34495e",
    flex: 2,
  },
  nutritionValue: {
    fontSize: 14,
    color: "#2c3e50",
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
});

export default ProductInfo;
