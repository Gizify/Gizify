import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/actions/productAction";
import { addConsumptionFromBarcode } from "../redux/actions/authAction";

type Props = NativeStackScreenProps<BottomTabParamList, "Scan">;

const ScanScreen: React.FC<Props> = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector((state: any) => state.product);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const [cameraType, setCameraType] = useState<"front" | "back">("back");
  const token = useSelector((state: any) => state.auth.token);

  console.log(error);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    dispatch(fetchProduct(data) as any);
  };

  const handleBack = () => {
    if (scanned) {
      setScanned(false);
    } else if (isStarted) {
      setIsStarted(false);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {!isStarted && (
          <View style={styles.instructionContainer}>
            <Image source={require("../../assets/icons/barcode.png")} style={styles.logo} />
            <Text style={styles.instructionText}>Pastikan kode pemindai dalam kondisi jelas</Text>
            <Button title="Mulai Scan" onPress={() => setIsStarted(true)} />
          </View>
        )}

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
            <View style={styles.productContainer}>{loading ? <Loading /> : error ? <Error message={error} /> : product ? <ProductInfo productData={product} /> : null}</View>
            <View style={styles.intakeButton}>
              <Button
                title="Tambah Ke Konsumsi Harian"
                onPress={async () => {
                  try {
                    await dispatch(addConsumptionFromBarcode(product.barcode, 1, userTimeZone, token) as any);
                    navigation.navigate("Beranda");
                  } catch (err) {
                    Alert.alert("Gagal", "Gagal menambahkan konsumsi harian.");
                  }
                }}
              />
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
    paddingTop: 50,
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
