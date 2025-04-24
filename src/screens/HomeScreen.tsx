import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../styles/colors";
import globalStyles from "../styles/globalStyles";
import CustomPicker from "../components/common/CustomPicker";
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
  const [selectedUser, setSelectedUser] = useState("User 1");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const user = useSelector((state: any) => state.auth.user);

  const users = [
    { label: user.name, value: user.name, imageUrl: "https://static.vecteezy.com/system/resources/previews/019/896/008/non_2x/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" },
    { label: "User 2", value: "User 2", imageUrl: "https://static.vecteezy.com/system/resources/previews/019/896/012/non_2x/female-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" },
  ];

  const formatDate = (date: any) => {
    // Handle both string and Date objects
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const findNutritionByDate = (date: Date) => {
    const targetDate = formatDate(date);

    const nutritionData = user.nutrition_stats.find((item: any) => {
      const itemDate = formatDate(item.date);
      return itemDate === targetDate;
    });

    return nutritionData || null;
  };

  const nutritionData = findNutritionByDate(selectedDate);
  const filteredLogs = user.meal_logs?.find((log: any) => formatDate(log.date) === formatDate(selectedDate));
  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Harian</Text>
        <View style={styles.profileContainer}>
          <Text style={styles.sectionTitle}>{user.name}</Text>
          <Image style={styles.selectedItemImage} source={{ uri: "https://static.vecteezy.com/system/resources/previews/019/896/008/non_2x/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" }}></Image>
        </View>
      </View>

      {/* Rounded Rectangle */}
      <View style={styles.roundedContainer}>
        <View style={styles.rectangle}>
          <Text style={{ color: colors.background }}>{nutritionData?.total_calories.toFixed() ?? 0}</Text>
        </View>
        <View style={styles.circle}>
          <Text style={{ color: colors.text }}>{user.daily_nutrition_target?.calories}</Text>
        </View>
      </View>

      {/* Nutrition Bars */}
      <View style={styles.nutritionContainer}>
        <View style={styles.barGroup}>
          <NutritionBar label="Karbohidrat" value={nutritionData?.total_carbs.toFixed() ?? 0} color="#FF6666" limit={user.daily_nutrition_target?.carbs} />
          <NutritionBar label="Lemak" value={nutritionData?.total_fat.toFixed() ?? 0} color="#FFD700" limit={user.daily_nutrition_target?.protein} />
          <NutritionBar label="Protein" value={nutritionData?.total_protein.toFixed() ?? 0} color="#66CCFF" limit={user.daily_nutrition_target?.protein} />
        </View>
      </View>
      <View style={styles.nutritionContainer}>
        <View style={styles.barGroup}>
          <NutritionBar label="Serat" value={nutritionData?.total_fiber.toFixed() ?? 0} color="#FF6666" limit={user.daily_nutrition_target?.fiber} />
          <NutritionBar label="Gula" value={nutritionData?.total_sugar.toFixed() ?? 0} color="#FFD700" limit={user.daily_nutrition_target?.sugar} />
          <NutritionBar label="Garam" value={nutritionData?.total_sodium.toFixed() ?? 0} color="#66CCFF" limit={user.daily_nutrition_target?.sodium} />
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
        {/* <Image source={require("../../assets/Logo.png")} style={styles.image} /> */}
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
        {filteredLogs?.meals.map((meal: any, index: any) => (
          <View key={index} style={styles.table}>
            <View style={styles.tableTextContainer}>
              <AntDesign name="up" size={24} color="black" />
              <Text style={styles.totalEnergy}>{meal.name}</Text>
            </View>

            <View style={styles.separator} />

            <ScrollView horizontal>
              <View style={[styles.tableContent]}>
                {/* Header */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Kalori</Text>
                  <Text style={styles.tableHeader}>Karbo</Text>
                  <Text style={styles.tableHeader}>Protein</Text>
                  <Text style={styles.tableHeader}>Lemak</Text>
                  <Text style={styles.tableHeader}>Serat</Text>
                  <Text style={styles.tableHeader}>Gula</Text>
                  <Text style={styles.tableHeader}>Garam</Text>
                </View>

                {/* Data meal */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>{meal.nutrition_info.calories.toFixed()}</Text>
                  <Text style={styles.tableCell}>{meal.nutrition_info.carbs.toFixed()}</Text>
                  <Text style={styles.tableCell}>{meal.nutrition_info.protein.toFixed()}</Text>
                  <Text style={styles.tableCell}>{meal.nutrition_info.fat.toFixed()}</Text>
                  <Text style={styles.tableCell}>{meal.nutrition_info.fiber.toFixed()}</Text>
                  <Text style={styles.tableCell}>{meal.nutrition_info.sugar.toFixed()}</Text>
                  <Text style={styles.tableCell}>{meal.nutrition_info.sodium.toFixed()}</Text>
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
  nutritionContainer: { marginVertical: 10, backgroundColor: colors.secondary, paddingVertical: 20, borderRadius: 15 },
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
