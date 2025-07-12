import React, { use, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";
import globalStyles from "../styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";
import { differenceInDays } from "date-fns";

type NutritionBarProps = {
  label: string;
  value: number;
  color: string;
  limit: number;
};

const calculateTrimester = (lmp: string) => {
  const startDate = new Date(lmp);
  const daysSinceLMP = differenceInDays(new Date(), startDate);
  const weeks = Math.floor(daysSinceLMP / 7);

  if (weeks < 13) return 1;
  if (weeks < 27) return 2;
  return 3;
};

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

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const user = useSelector((state: any) => state.auth.user);
  const navigation = useNavigation() as any;
  const dispatch = useDispatch();
  const hasReminder = user?.last_menstrual_period ? user.trimester !== calculateTrimester(user.last_menstrual_period) : false;

  useEffect(() => {
    // Hanya dispatch kalau value hasReminder berubah dari yang sebelumnya
    if (user?.hasReminder !== hasReminder) {
      dispatch({ type: "SET_HAS_REMINDER", payload: hasReminder });
    }
  }, [user?.hasReminder, hasReminder, dispatch]);

  // Helper function untuk handle toFixed dengan aman
  const safeToFixed = (value: number | undefined | null, digits = 0) => {
    return (value ?? 0).toFixed(digits);
  };

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

  const filteredLogs = user?.meal_logs?.find((log: any) => formatDate(log.date) === formatDate(selectedDate));

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);

    // Validasi tanggal
    if (!isNaN(newDate.getTime())) {
      setSelectedDate(newDate);
    }
  };
  const getPregnancyAge = (lmp: string) => {
    if (!lmp) return null;
    const lmpDate = new Date(lmp);
    const today = new Date();

    const diffInDays = Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffInDays / 30);
    const days = diffInDays % 30;

    return { months, days };
  };

  const pregnancyAge = getPregnancyAge(user?.last_menstrual_period);

  // Render nutrition bar dengan aman
  const renderNutritionBar = (label: string, valueKey: string, color: string, limitKey: string) => (
    <NutritionBar label={label} value={safeToFixed(nutritionData?.[valueKey]) as any} color={color} limit={user?.daily_nutrition_target?.[limitKey]} />
  );

  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.nameText}>{user?.name}</Text>
          {pregnancyAge && (
            <Text style={styles.subText}>
              Usia kehamilan {pregnancyAge.months} bulan {pregnancyAge.days} hari
            </Text>
          )}
          <Text style={styles.subText}>Trimester ke-{user.trimester}</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Notif")} style={styles.notifButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          {hasReminder && <View style={styles.badge} />}
        </TouchableOpacity>
      </View>

      {/* Rounded Rectangle */}
      <View style={styles.roundedContainer}>
        <View style={styles.rectangle}>
          <Text style={{ color: colors.background }}>{safeToFixed(nutritionData?.calories)}</Text>
        </View>
        <View style={styles.circle}>
          <Text style={{ color: colors.text }}>{safeToFixed(user?.daily_nutrition_target?.calories)}</Text>
        </View>
      </View>

      {/* Nutrition Bars */}
      <View style={styles.nutritionContainer}>
        <View style={styles.barGroup}>
          {renderNutritionBar("Karbohidrat", "carbs", "#F4A261", "carbs")}
          {renderNutritionBar("Lemak", "fat", "#E9C46A", "fat")}
          {renderNutritionBar("Protein", "protein", "#2A9D8F", "protein")}
        </View>

        <View style={styles.barGroup}>
          {renderNutritionBar("Serat", "fiber", "#8D8741", "fiber")}
          {renderNutritionBar("Gula", "sugar", "#E76F51", "sugar")}
          {renderNutritionBar("Garam", "sodium", "#A9A9A9", "sodium")}
        </View>
      </View>

      <View style={styles.nutritionContainer}>
        {/* Vitamins and Minerals */}
        <View style={styles.barGroup}>
          {renderNutritionBar("Vitamin D", "vitamin_d", "#F4E04D", "vitamin_d")}
          {renderNutritionBar("Zat Besi", "iron", "#B22222", "iron")}
          {renderNutritionBar("Vitamin A", "vitamin_a", "#FF8C00", "vitamin_a")}
        </View>

        <View style={styles.barGroup}>
          {renderNutritionBar("Asam Folat", "folic_acid", "#9ACD32", "folic_acid")}
          {renderNutritionBar("Kalsium", "kalsium", "#5F9EA0", "kalsium")}
          {renderNutritionBar("Yodium", "iodium", "#8A2BE2", "iodium")}
        </View>

        <View style={styles.barGroup}>
          {renderNutritionBar("Vitamin B6", "vitamin_b6", "#20B2AA", "vitamin_b6")}
          {renderNutritionBar("Vitamin B12", "vitamin_b12", "#6A5ACD", "vitamin_b12")}
          {renderNutritionBar("Vitamin C", "vitamin_c", "#FFA500", "vitamin_c")}
        </View>

        <View style={styles.barGroup}>
          {renderNutritionBar("Magnesium", "magnesium", "#32CD32", "magnesium")}
          {renderNutritionBar("Selenium", "selenium", "#4682B4", "selenium")}
          {renderNutritionBar("Vitamin E", "vitamin_e", "#DAA520", "vitamin_e")}
        </View>

        {/* Water */}
        <View style={styles.waterCon}>{renderNutritionBar("Air (ml)", "water", "#1E90FF", "water")}</View>
      </View>

      {/* Date Selector */}
      <View style={styles.dateSelector}>
        <View style={styles.dateSelector}>
          <TouchableOpacity onPress={() => changeDate(-1)}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text>{selectedDate.toLocaleDateString("id-ID", { weekday: "long" })}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("History")}>
          <Text style={styles.buttonText}>Riwayat</Text>
        </TouchableOpacity>
        <View style={styles.dateSelector}>
          <Text>
            {selectedDate.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Text>
          <TouchableOpacity onPress={() => changeDate(1)}>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Table */}
      <ScrollView>
        {filteredLogs?.meals?.map((meal: any, index: any) => (
          <View key={index} style={styles.table}>
            <View style={styles.tableTextContainer}>
              <AntDesign name="up" size={24} color="black" />
              <Text style={styles.totalEnergy}>{meal.name}</Text>
            </View>

            <View style={styles.separator} />

            <ScrollView horizontal>
              <View style={styles.tableContent}>
                {/* Header */}
                <View style={styles.tableRow}>
                  {["Kalori", "Karbo", "Protein", "Lemak", "Serat", "Gula", "Garam", "Asam Folat", "Kalsium", "Vitamin D", "Vit B12", "Vit C", "Zinc", "Iodium", "Air", "Zat Besi"].map((header) => (
                    <Text key={header} style={styles.tableHeader}>
                      {header}
                    </Text>
                  ))}
                </View>

                {/* Data meal */}
                <View style={styles.tableRow}>
                  {["calories", "carbs", "protein", "fat", "fiber", "sugar", "sodium", "folic_acid", "kalsium", "vitamin_d", "vitamin_b12", "vitamin_c", "zinc", "iodium", "water", "iron"].map((key) => (
                    <Text key={key} style={styles.tableCell}>
                      {safeToFixed(meal.nutrition_info?.[key])}
                    </Text>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  selectedItemImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  header: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flex: 1,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  subText: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  notifButton: {
    padding: 8,
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "red",
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  picker: { height: 40, width: 120 },
  roundedContainer: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  rectangle: { width: "85%", height: 50, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, backgroundColor: colors.primary, flex: 1, justifyContent: "center", alignItems: "center" },
  circle: { width: 60, height: 60, borderRadius: 30, marginLeft: -20, justifyContent: "center", alignItems: "center", backgroundColor: colors.background, borderWidth: 2 },
  nutritionContainer: { marginVertical: 10, backgroundColor: colors.secondary, paddingVertical: 10, borderRadius: 15, display: "flex", flexDirection: "column" },
  label: {
    fontSize: 7,
    fontWeight: "bold",
    marginBottom: 5,
  },
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
  image: { height: 10, aspectRatio: 1 },
  dateSelector: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 10 },
  table: { marginTop: 20, borderWidth: 1, borderColor: "#ddd", padding: 10, backgroundColor: colors.background },
  tableTextContainer: { flexDirection: "row", gap: 16 },
  totalEnergy: { fontWeight: "bold", fontSize: 16, textAlign: "center" },
  separator: { borderBottomWidth: 1, borderColor: "#ddd", marginVertical: 5 },
  tableRow: { flexDirection: "row", justifyContent: "space-between", width: "100%", gap: 16 },
  tableHeader: { fontWeight: "bold", flex: 1, textAlign: "center" },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  tableContent: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
