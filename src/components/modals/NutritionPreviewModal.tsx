// @ts-nocheck
import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Button from "../form/Button";
import { useDispatch, useSelector } from "react-redux";
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

const NutritionPreviewModal: React.FC<Props> = ({ visible, onClose, addedNutrition, recipeId, type }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const formatDate = (date: any) => {
    if (!date) return "";

    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return "";

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  const findNutritionByDate = (date: Date) => {
    if (!date) return null;

    const targetDate = formatDate(date);
    if (!targetDate) return null;

    return user.nutrition_stats.find((item: any) => formatDate(item.date) === targetDate) || null;
  };

  const nutritionData = findNutritionByDate(selectedDate);
  const parseNumber = (value: any) => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  const getCombined = (key: keyof typeof addedNutrition) => {
    const current = parseNumber(nutritionData?.[key]);
    const added = parseNumber(addedNutrition?.[key]);
    return current + added;
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Penambahan Nutrisi</Text>
          <ScrollView>
            <NutritionBar label="Kalori" value={getCombined("calories")} limit={user.daily_nutrition_target.calories} color={colors.primary} unit="g" />
            <NutritionBar label="Karbohidrat" value={getCombined("carbs")} limit={user.daily_nutrition_target.carbs} color="#F4A261" unit="g" />
            <NutritionBar label="Lemak" value={getCombined("fat")} limit={user.daily_nutrition_target.fat} color="#E9C46A" unit="g" />
            <NutritionBar label="Protein" value={getCombined("protein")} limit={user.daily_nutrition_target.protein} color="#2A9D8F" unit="g" />

            <NutritionBar label="Serat" value={getCombined("fiber")} limit={user.daily_nutrition_target.fiber} color="#8D8741" unit="g" />
            <NutritionBar label="Gula" value={getCombined("sugar")} limit={user.daily_nutrition_target.sugar} color="#E76F51" unit="g" />
            <NutritionBar label="Garam" value={getCombined("sodium")} limit={user.daily_nutrition_target.sodium} color="#A9A9A9" unit="mg" />

            <NutritionBar label="Vitamin D" value={getCombined("vitamin_d")} limit={user.daily_nutrition_target.vitamin_d} color="#F4E04D" unit="mcg" />
            <NutritionBar label="Vitamin B12" value={getCombined("vitamin_b12")} limit={user.daily_nutrition_target.vitamin_b12} color="#6A5ACD" unit="mcg" />
            <NutritionBar label="Vitamin C" value={getCombined("vitamin_c")} limit={user.daily_nutrition_target.vitamin_c} color="#FFA500" unit="mg" />

            <NutritionBar label="Zat Besi" value={getCombined("iron")} limit={user.daily_nutrition_target.iron} color="#B22222" unit="mg" />
            <NutritionBar label="Kalsium" value={getCombined("kalsium")} limit={user.daily_nutrition_target.kalsium} color="#5F9EA0" unit="mg" />
            <NutritionBar label="Magnesium" value={getCombined("magnesium")} limit={user.daily_nutrition_target.magnesium} color="#32CD32" unit="mg" />

            <NutritionBar label="Asam Folat" value={getCombined("folic_acid")} limit={user.daily_nutrition_target.folic_acid} color="#9ACD32" unit="mcg" />
            <NutritionBar label="Yodium" value={getCombined("iodium")} limit={user.daily_nutrition_target.iodium} color="#8A2BE2" unit="mcg" />
            <NutritionBar label="Selenium" value={getCombined("selenium")} limit={user.daily_nutrition_target.selenium} color="#4682B4" unit="mcg" />

            <NutritionBar label="Air" value={getCombined("water")} limit={user.daily_nutrition_target.water} color="#1E90FF" unit="ml" />
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
