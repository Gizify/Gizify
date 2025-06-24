// @ts-nocheck
import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import * as shape from "d3-shape";
import { useSelector } from "react-redux";
import colors from "../styles/colors";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

const timeOptions = [30, 7, 1];

const nutrientOptions = ["calories", "protein", "carbs", "fat", "fiber", "sugar", "sodium", "folic_acid", "kalsium", "vitamin_d", "vitamin_b12", "vitamin_c", "zinc", "iodium", "water", "iron"];

export default function HistoryScreen() {
  const [selectedDays, setSelectedDays] = useState(7);
  const [selectedNutrient, setSelectedNutrient] = useState("calories");
  const user = useSelector((state: any) => state.auth.user);
  const recentStats = useMemo(() => {
    const sorted = [...user.nutrition_stats].sort((a: any, b: any) => (new Date(a.date) as any) - (new Date(b.date) as any));
    return sorted.slice(-selectedDays);
  }, [user.nutrition_stats, selectedDays]);

  const navigation = useNavigation();

  const nutrientData = recentStats.map((stat) => stat[selectedNutrient] || 0);
  const target = user.daily_nutrition_target?.[selectedNutrient] || 0;

  const meals = useMemo(() => {
    return user.meal_logs
      .filter((log: any) => {
        const date = new Date(log.date) as any;
        const now = new Date() as any;
        const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        return diff < selectedDays;
      })
      .sort((a: any, b: any) => (new Date(b.date) as any) - (new Date(a.date) as any));
  }, [user.meal_logs, selectedDays]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Riwayat Nutrisi</Text>
      </View>

      <View style={styles.timeSelector}>
        {timeOptions.map((days) => (
          <TouchableOpacity key={days} onPress={() => setSelectedDays(days)} style={[styles.timeButton, selectedDays === days && styles.timeButtonActive]}>
            <Text style={[styles.timeButtonText, selectedDays === days && styles.timeButtonTextActive]}>{days === 1 ? "Hari Ini" : `${days} Hari`}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.nutrientScroll}>
        {nutrientOptions.map((nutrient) => (
          <TouchableOpacity key={nutrient} onPress={() => setSelectedNutrient(nutrient)} style={[styles.nutrientButton, selectedNutrient === nutrient && styles.nutrientButtonActive]}>
            <Text style={[styles.nutrientText, selectedNutrient === nutrient && styles.nutrientTextActive]}>{nutrient}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: recentStats.map((s) =>
              new Date(s.date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
              })
            ),
            datasets: [
              {
                data: nutrientData,
                color: () => "#5271FF",
                strokeWidth: 2,
              },
              {
                data: Array(recentStats.length).fill(target),
                color: () => "#FF66C4",
                strokeWidth: 1,
              },
            ],
            legend: ["Realisasi", "Target"],
          }}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(82, 113, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#5271FF",
            },
          }}
          bezier
          style={{ borderRadius: 12 }}
        />
      </View>

      <Text style={styles.sectionTitle}>Log Makanan</Text>
      {meals.map((log: any) => (
        <View key={log.date} style={styles.logItem}>
          <Text style={styles.logDate}>{new Date(log.date).toDateString()}</Text>
          {log.meals.map((meal: any, idx: any) => (
            <View key={idx} style={styles.mealCard}>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealInfo}>Porsi: {meal.portion_size}</Text>
              <Text style={styles.mealInfo}>
                {selectedNutrient}: {meal.nutrition_info?.[selectedNutrient] || 0}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    paddingVertical: 16,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  timeSelector: {
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "space-around",
  },
  timeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 4,
  },
  timeButtonActive: {
    backgroundColor: colors.primary,
  },
  timeButtonText: {
    color: "#333",
    fontWeight: "500",
  },
  timeButtonTextActive: {
    color: "#fff",
  },
  nutrientScroll: {
    marginBottom: 16,
  },
  nutrientButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#F0F0F0",
    marginRight: 8,
  },
  nutrientButtonActive: {
    backgroundColor: colors.primary,
  },
  nutrientText: {
    color: "#333",
    fontSize: 14,
  },
  nutrientTextActive: {
    color: "#fff",
  },
  chartContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },

  targetLabel: {
    position: "absolute",
    right: 5,
    fontSize: 12,
    color: "#FF66C4",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  logItem: {
    marginBottom: 16,
  },
  logDate: {
    fontWeight: "600",
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
  },
  mealCard: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  mealName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  mealInfo: {
    fontSize: 14,
    color: "#555",
  },
});
