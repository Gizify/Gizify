import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import globalStyles from "../styles/globalStyles";
import { RecipeStackParamList } from "../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import colors from "../styles/colors";

interface RecipeDetailScreenProps {
  route: RouteProp<RecipeStackParamList, "RecipeDetail">;
  navigation: StackNavigationProp<RecipeStackParamList, "RecipeDetail">;
}

const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({ route }) => {
  const { recipe } = route.params;
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<"recipe" | "nutrition">("recipe");

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{recipe.title}</Text>
        <View style={{ width: 24 }} />
      </View>

      <Image source={{ uri: recipe.image }} style={styles.recipeImage} />

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tabButton, activeTab === "recipe" && styles.activeTab]} onPress={() => setActiveTab("recipe")}>
          <Text style={[styles.tabText, activeTab === "recipe" && styles.activeTabText]}>Resep</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === "nutrition" && styles.activeTab]} onPress={() => setActiveTab("nutrition")}>
          <Text style={[styles.tabText, activeTab === "nutrition" && styles.activeTabText]}>Gizi</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>
        {activeTab === "recipe" ? (
          <>
            <Text style={styles.sectionTitle}>Bahan-bahan:</Text>
            <FlatList
              data={recipe.ingredients}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />

            <Text style={styles.sectionTitle}>Cara Membuat:</Text>
            <FlatList
              data={recipe.steps}
              renderItem={({ item, index }) => (
                <View style={styles.stepItem}>
                  <Text style={styles.stepNumber}>{index + 1}.</Text>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          </>
        ) : (
          <View style={styles.nutritionContainer}>
            <View style={styles.nutritionRow}>
              <Text style={styles.nutritionLabel}>Kalori</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition.calories} kkal</Text>
            </View>
            <View style={styles.nutritionRow}>
              <Text style={styles.nutritionLabel}>Protein</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition.protein} g</Text>
            </View>
            <View style={styles.nutritionRow}>
              <Text style={styles.nutritionLabel}>Karbohidrat</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition.carbs} g</Text>
            </View>
            <View style={styles.nutritionRow}>
              <Text style={styles.nutritionLabel}>Lemak</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition.fat} g</Text>
            </View>
            <View style={styles.nutritionRow}>
              <Text style={styles.nutritionLabel}>Serat</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition.fiber} g</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingVertical: 16,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  recipeImage: {
    width: "100%",
    height: width * 0.6,
    resizeMode: "cover",
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: "#888",
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: "bold",
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "flex-start",
  },
  bullet: {
    marginRight: 8,
    color: "#333",
  },
  listText: {
    flex: 1,
    fontSize: 16,
    color: "#555",
  },
  stepItem: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  stepNumber: {
    marginRight: 8,
    color: "#333",
    fontWeight: "bold",
  },
  nutritionContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
  },
  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  nutritionLabel: {
    fontSize: 16,
    color: "#555",
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default RecipeDetailScreen;
