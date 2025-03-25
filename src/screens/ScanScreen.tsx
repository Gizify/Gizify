import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { CameraView, useCameraPermissions, FlashMode } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import ProductInfo from "../components/layout/ProductInfo";
import PermissionDenied from "../components/modals/PermissionDenied";
import Loading from "../components/loaders/Loading";
import Error from "../components/layout/Error";

const ScanScreen: React.FC = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState<boolean>(false);
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraType, setCameraType] = useState<"front" | "back">("back");
  const [pickedImage, setPickedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
    }
  };

  if (!permission) return <Text>Meminta izin kamera...</Text>;
  if (!permission.granted) return <PermissionDenied requestPermission={requestPermission} />;

  return (
    <View style={styles.container}>
      {!scanned ? (
        pickedImage ? (
          <Image source={{ uri: pickedImage }} style={styles.imagePreview} />
        ) : (
          <CameraView
            style={styles.camera}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "ean13", "ean8", "upc_a", "upc_e"],
            }}
            facing={cameraType}
            onBarcodeScanned={handleBarCodeScanned}
          />
        )
      ) : (
        <View style={styles.resultContainer}>
          <ScrollView style={styles.scrollContainer}>{loading ? <Loading /> : error ? <Error message={error} /> : productData && <ProductInfo productData={productData} />}</ScrollView>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setScanned(false);
              setProductData(null);
              setError(null);
              setPickedImage(null);
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
  camera: {
    width: "100%",
    height: "70%",
  },
  topControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  controlButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#007AFF",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  resultContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  zoomContainer: {
    position: "absolute",
    bottom: 20,
    width: "80%",
    alignItems: "center",
  },
  slider: {
    width: "100%",
  },
  zoomText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  imagePreview: {
    width: "100%",
    height: "70%",
    resizeMode: "contain",
  },
});

export default ScanScreen;
