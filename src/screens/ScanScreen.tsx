import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import ProductInfo from "../components/layout/ProductInfo";
import PermissionDenied from "../components/modals/PermissionDenied";
import Loading from "../components/loaders/Loading";
import Error from "../components/layout/Error";
import Button from "../components/form/Button";
import { BottomTabParamList } from "../types/navigation";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<BottomTabParamList, "Scan">;

const ScanScreen: React.FC<Props> = ({ navigation }: Props) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraType, setCameraType] = useState<"front" | "back">("back");

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

  const handleBack = () => {
    if (scanned) {
      setScanned(false);
      setProductData(null);
    } else if (isStarted) {
      setIsStarted(false);
    } else {
      navigation.goBack();
    }
  };

  if (!permission) return <Text>Meminta izin kamera...</Text>;
  if (!permission.granted) return <PermissionDenied requestPermission={requestPermission} />;

  return (
    <View style={styles.container}>
      {/* Main content */}
      <View style={styles.content}>
        {!isStarted && (
          <View style={styles.instructionContainer}>
            <Image source={require("../../assets/icons/barcode.png")} style={styles.logo} />
            <Text style={styles.instructionText}>Pastikan kode pemindai dalam kondisi jelas</Text>
            <Button title="Mulai Scan" onPress={() => setIsStarted(true)}></Button>
          </View>
        )}

        {/* Kondisi: Kamera aktif untuk scan */}
        {isStarted && !scanned && (
          <CameraView
            style={styles.camera}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "ean13", "ean8", "upc_a", "upc_e"],
            }}
            facing={cameraType}
            onBarcodeScanned={handleBarCodeScanned}
          />
        )}

        {scanned && (
          <View style={styles.resultContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.title}>Hasil Scan</Text>
            </View>
            <View style={styles.productContainer}>{loading ? <Loading /> : error ? <Error message={error} /> : productData && <ProductInfo productData={productData} />}</View>
            <View style={styles.intakeButton}>
              <Button title="Tambah Ke Konsumsi Harian" onPress={() => navigation.navigate("Beranda")} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingTop: 50, // Adjust for status bar
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  instructionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  startButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  camera: {
    flex: 1,
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
  },
  productContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  intakeButton: {
    alignItems: "center",
  },
});

export default ScanScreen;
