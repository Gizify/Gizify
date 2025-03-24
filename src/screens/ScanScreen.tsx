import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { CameraView, useCameraPermissions, BarcodeScanningResult } from "expo-camera";
import axios from "axios";

const ScanScreen: React.FC = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState<boolean>(false);
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  console.log(productData);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = async ({ data }: BarcodeScanningResult) => {
    setScanned(true);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);
      if (response.data.status === 1) {
        setProductData(response.data.product);
      } else {
        setError("Produk tidak ditemukan dalam database.");
        setProductData(null);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data produk.");
      setProductData(null);
    } finally {
      setLoading(false);
    }
  };

  // Jika izin belum diminta atau ditolak
  if (!permission) {
    return <Text>Meminta izin kamera...</Text>;
  }
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Akses kamera tidak diizinkan</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Izinkan Kamera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "ean13", "ean8", "upc_a", "upc_e"],
          }}
          onBarcodeScanned={handleBarCodeScanned}
        />
      ) : (
        <View style={styles.resultContainer}>
          <ScrollView style={styles.scrollContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#007AFF" />
            ) : error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : (
              productData && (
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{productData.product_name || "Nama produk tidak tersedia"}</Text>
                  {productData.image_url ? <Image source={{ uri: productData.image_url }} style={styles.productImage} /> : <Text style={styles.noImageText}>Gambar tidak tersedia</Text>}

                  <Text style={styles.productDetails}>Merek: {productData.brands || "Tidak diketahui"}</Text>
                  <Text style={styles.productDetails}>Kuantitas: {productData.quantity || "Tidak tersedia"}</Text>

                  {/* Tambahan Data Nutrisi */}
                  <View style={styles.nutritionSection}>
                    <Text style={styles.sectionTitle}>Informasi Nutrisi per 100g</Text>
                    <View style={styles.separator} />

                    <View style={styles.nutritionRow}>
                      <Text style={styles.nutritionLabel}>Energi</Text>
                      <Text style={styles.nutritionValue}>{productData.nutriments?.["energy-kcal_100g"] || "N/A"} kcal</Text>
                    </View>

                    <View style={styles.nutritionRow}>
                      <Text style={styles.nutritionLabel}>Lemak</Text>
                      <Text style={styles.nutritionValue}>{productData.nutriments?.["fat_100g"] || "N/A"}g</Text>
                    </View>

                    <View style={styles.nutritionRow}>
                      <Text style={styles.nutritionLabel}>Lemak Jenuh</Text>
                      <Text style={styles.nutritionValue}>{productData.nutriments?.["saturated-fat_100g"] || "N/A"}g</Text>
                    </View>

                    <View style={styles.nutritionRow}>
                      <Text style={styles.nutritionLabel}>Karbohidrat</Text>
                      <Text style={styles.nutritionValue}>{productData.nutriments?.["carbohydrates_100g"] || "N/A"}g</Text>
                    </View>

                    <View style={styles.nutritionRow}>
                      <Text style={styles.nutritionLabel}>Gula</Text>
                      <Text style={styles.nutritionValue}>{productData.nutriments?.["sugars_100g"] || "N/A"}g</Text>
                    </View>

                    <View style={styles.nutritionRow}>
                      <Text style={styles.nutritionLabel}>Protein</Text>
                      <Text style={styles.nutritionValue}>{productData.nutriments?.["proteins_100g"] || "N/A"}g</Text>
                    </View>

                    <View style={styles.nutritionRow}>
                      <Text style={styles.nutritionLabel}>Garam</Text>
                      <Text style={styles.nutritionValue}>{productData.nutriments?.["salt_100g"] || "N/A"}g</Text>
                    </View>
                  </View>

                  <Text style={styles.productDetails}>Bahan: {productData.ingredients_text || "Tidak tersedia"}</Text>
                </View>
              )
            )}
          </ScrollView>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setScanned(false);
              setProductData(null);
              setError(null);
            }}
          >
            <Text style={styles.buttonText}>Pindai Lagi</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  permissionText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  errorContainer: {
    backgroundColor: "#ffcccc",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  errorText: {
    fontSize: 16,
    color: "#cc0000",
    textAlign: "center",
  },
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
  scrollContainer: {
    flex: 1,
    width: "100%",
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

export default ScanScreen;
