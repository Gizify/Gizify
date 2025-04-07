import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../styles/colors";
import globalStyles from "../styles/globalStyles";
import CustomPicker from "../components/common/CustomPicker";

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

  const users = [
    { label: "User 1", value: "User 1", imageUrl: "https://static.vecteezy.com/system/resources/previews/019/896/008/non_2x/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" },
    { label: "User 2", value: "User 2", imageUrl: "https://static.vecteezy.com/system/resources/previews/019/896/012/non_2x/female-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" },
  ];

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
          <CustomPicker selectedValue={selectedUser} onValueChange={(itemValue) => setSelectedUser(itemValue)} items={users} />
        </View>
      </View>

      {/* Rounded Rectangle */}
      <View style={styles.roundedContainer}>
        <View style={styles.rectangle}>
          <Text style={{ color: colors.background }}>0 Kal</Text>
        </View>
        <View style={styles.circle}>
          <Text style={{ color: colors.text }}>2500</Text>
        </View>
      </View>

      {/* Nutrition Bars */}
      <View style={styles.nutritionContainer}>
        <View style={styles.barGroup}>
          <NutritionBar label="Karbohidrat" value={70} color="#FF6666" limit={225} />
          <NutritionBar label="Lemak" value={50} color="#FFD700" limit={75} />
          <NutritionBar label="Protein" value={80} color="#66CCFF" limit={80} />
        </View>
      </View>
      <View style={styles.nutritionContainer}>
        <View style={styles.barGroup}>
          <NutritionBar label="Serat" value={70} color="#FF6666" limit={225} />
          <NutritionBar label="Gula" value={50} color="#FFD700" limit={75} />
          <NutritionBar label="Garam" value={80} color="#66CCFF" limit={80} />
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
      <View style={styles.table}>
        <View style={styles.tableTextContainer}>
          <Text style={styles.totalEnergy}>Total Energi: 0 kcal</Text>
          <AntDesign name="up" size={24} color="black" />
        </View>
        <View style={styles.separator} />
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Nama</Text>
          <Text style={styles.tableHeader}>Jumlah</Text>
          <Text style={styles.tableHeader}>kcal</Text>
          <Text style={styles.tableHeader}>Karbo</Text>
          <Text style={styles.tableHeader}>Protein</Text>
          <Text style={styles.tableHeader}>Serat</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  profileContainer: { flexDirection: "row", alignItems: "center" },
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
  tableTextContainer: { flexDirection: "row", justifyContent: "space-between" },
  totalEnergy: { fontWeight: "bold", fontSize: 16, textAlign: "center" },
  separator: { borderBottomWidth: 1, borderColor: "#ddd", marginVertical: 5 },
  tableRow: { flexDirection: "row", justifyContent: "space-between" },
  tableHeader: { fontWeight: "bold", flex: 1, textAlign: "center" },
});

export default HomeScreen;
