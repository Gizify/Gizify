// @ts-nocheck
import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Button from "../form/Button";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addConsumption } from "../../redux/actions/authAction";
import colors from "../../styles/colors";

interface Props {
  visible: boolean;
  onClose: () => void;
  addedNutrition: any;
  target: {
    carbs: number;
    fat: number;
    protein: number;
  };
}

const NutritionBar: React.FC<NutritionBarProps> = ({ label, value, color, limit }) => {
  const percentage = (value / limit) * 100;

  return (
    <View>
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
      <View style={styles.nutritionText}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.label}>
          {value}/{limit}
        </Text>
      </View>
    </View>
  );
};

const NutritionPreviewModal: React.FC<Props> = ({ visible, onClose, addedNutrition, current, target, recipeId, userTimeZone, token, type }) => {
  const getCombined = (key: keyof typeof addedNutrition) => {
    return (current[key] || 0) + (addedNutrition[key] || 0);
  };
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Penambahan Nutrisi</Text>
          <ScrollView>
            <NutritionBar label="Kalori" value={getCombined("calories")} limit={target.calories} color={colors.primary} unit="g" />
            <NutritionBar label="Karbohidrat" value={getCombined("carbs")} limit={target.carbs} color="#F4A261" unit="g" />
            <NutritionBar label="Lemak" value={getCombined("fat")} limit={target.fat} color="#E9C46A" unit="g" />
            <NutritionBar label="Protein" value={getCombined("protein")} limit={target.protein} color="#2A9D8F" unit="g" />

            <NutritionBar label="Serat" value={getCombined("fiber")} limit={target.fiber} color="#8D8741" unit="g" />
            <NutritionBar label="Gula" value={getCombined("sugar")} limit={target.sugar} color="#E76F51" unit="g" />
            <NutritionBar label="Garam" value={getCombined("sodium")} limit={target.sodium} color="#A9A9A9" unit="mg" />

            <NutritionBar label="Vitamin D" value={getCombined("vitamin_d")} limit={target.vitamin_d} color="#F4E04D" unit="mcg" />
            <NutritionBar label="Vitamin B12" value={getCombined("vitamin_b12")} limit={target.vitamin_b12} color="#6A5ACD" unit="mcg" />
            <NutritionBar label="Vitamin C" value={getCombined("vitamin_c")} limit={target.vitamin_c} color="#FFA500" unit="mg" />

            <NutritionBar label="Zat Besi" value={getCombined("iron")} limit={target.iron} color="#B22222" unit="mg" />
            <NutritionBar label="Kalsium" value={getCombined("kalsium")} limit={target.kalsium} color="#5F9EA0" unit="mg" />
            <NutritionBar label="Magnesium" value={getCombined("magnesium")} limit={target.magnesium} color="#32CD32" unit="mg" />

            <NutritionBar label="Asam Folat" value={getCombined("folic_acid")} limit={target.folic_acid} color="#9ACD32" unit="mcg" />
            <NutritionBar label="Yodium" value={getCombined("iodium")} limit={target.iodium} color="#8A2BE2" unit="mcg" />
            <NutritionBar label="Selenium" value={getCombined("selenium")} limit={target.selenium} color="#4682B4" unit="mcg" />

            <NutritionBar label="Air" value={getCombined("water")} limit={target.water} color="#1E90FF" unit="ml" />
          </ScrollView>
          <Button
            title="Tambah Ke Konsumsi Harian"
            onPress={async () => {
              try {
                await dispatch(addConsumption(type, recipeId, 1, userTimeZone, token));
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Beranda" }],
                });
              } catch (err) {
                console.log(err);
                Alert.alert("Gagal", "Gagal menambahkan konsumsi harian.");
              }
            }}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NutritionPreviewModal;

const styles = StyleSheet.create({
  barContainer: {
    width: "100%",
    height: 10,
    backgroundColor: "#ddd",
    overflow: "hidden",
  },
  bar: {
    height: "100%",
  },
  nutritionText: { flexDirection: "row", justifyContent: "space-between", width: 90 },
  sectionTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  barGroup: { flexDirection: "row", justifyContent: "space-around" },
  waterCon: { justifyContent: "space-between", paddingHorizontal: 10 },
  label: {
    fontSize: 7,
    fontWeight: "bold",
    marginBottom: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
  },
  closeText: {
    fontWeight: "bold",
  },
});
