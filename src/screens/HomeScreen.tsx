import React, { use, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../styles/colors";
import globalStyles from "../styles/globalStyles";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

type NutritionBarProps = {
  label: string;
  value: number;
  color: string;
  limit: number;
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

  // Render nutrition bar dengan aman
  const renderNutritionBar = (label: string, valueKey: string, color: string, limitKey: string) => (
    <NutritionBar label={label} value={safeToFixed(nutritionData?.[valueKey]) as any} color={color} limit={user?.daily_nutrition_target?.[limitKey]} />
  );

  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Harian</Text>
        <View style={styles.profileContainer}>
          <Text style={styles.sectionTitle}>{user?.name || "User"}</Text>
          <Image
            style={styles.selectedItemImage}
            source={{ uri: "https://static.vecteezy.com/system/resources/previews/019/896/008/non_2x/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" }}
            onError={() => console.log("Error loading image")}
          />
        </View>
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
          {renderNutritionBar("Karbohidrat", "carbs", "#FF6666", "carbs")}
          {renderNutritionBar("Lemak", "fat", "#FFD700", "protein")}
          {renderNutritionBar("Protein", "protein", "#66CCFF", "protein")}
        </View>
        <View style={styles.barGroup}>
          {renderNutritionBar("Serat", "fiber", "#FF6666", "fiber")}
          {renderNutritionBar("Gula", "sugar", "#FFD700", "sugar")}
          {renderNutritionBar("Garam", "sodium", "#66CCFF", "sodium")}
        </View>
      </View>

      <View style={styles.nutritionContainer}>
        <View style={styles.barGroup}>
          {renderNutritionBar("Vitamin D", "vitamin_d", "#FFA500", "vitamin_d")}
          {renderNutritionBar("Air (ml)", "water", "#00BFFF", "water")}
          {renderNutritionBar("Zat Besi", "iron", "#B22222", "iron")}
        </View>

        <View style={styles.barGroup}>
          {renderNutritionBar("Asam Folat", "folic_acid", "#9ACD32", "folic_acid")}
          {renderNutritionBar("Kalsium", "calsium", "#4682B4", "kalsium")}
          {renderNutritionBar("Yodium", "iodium", "#8A2BE2", "iodium")}
        </View>

        <View style={styles.barGroup}>
          {renderNutritionBar("Vitamin B6", "vitamin_b16", "#00CED1", "vitamin_b16")}
          {renderNutritionBar("Vitamin B12", "vitamin_b12", "#9370DB", "vitamin_b12")}
          {renderNutritionBar("Vitamin C", "vitamin_c", "#FF8C00", "vitamin_c")}
        </View>
      </View>

      {/* Date Selector */}
      <View style={styles.dateSelector}>
        <View style={styles.dateSelector}>
          <TouchableOpacity onPress={() => changeDate(-1)}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text>{selectedDate.toLocaleDateString("id-ID", { weekday: "long" })}</Text>
        </View>
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
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  profileContainer: { flexDirection: "row", alignItems: "center", gap: 16, justifyContent: "center" },
  profileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  picker: { height: 40, width: 120 },
  roundedContainer: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  rectangle: { width: "85%", height: 50, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, backgroundColor: colors.primary, flex: 1, justifyContent: "center", alignItems: "center" },
  circle: { width: 60, height: 60, borderRadius: 30, marginLeft: -20, justifyContent: "center", alignItems: "center", backgroundColor: colors.background, borderWidth: 2 },
  nutritionContainer: { marginVertical: 10, backgroundColor: colors.secondary, paddingVertical: 20, borderRadius: 15, display: "flex", flexDirection: "column" },
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
});

export default HomeScreen;
