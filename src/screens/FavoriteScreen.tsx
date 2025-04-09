import React, { useState } from "react";
import { View, StyleSheet, FlatList, Dimensions, Image, Text, TouchableOpacity } from "react-native";
import { INITIAL_RECIPES } from "../utils/recipes";
import { Recipe } from "../types/recipe";
import ScreenHeader from "../components/layout/ScreenHeader";
import SearchBar from "../components/form/SearchBar";
import globalStyles from "../styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";

const FavoriteScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [active, setActive] = useState("resep");
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);

  const toggleFavorite = (id: string) => {
    setRecipes(recipes.map((recipe) => (recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe)));
  };

  const filteredRecipes = recipes.filter((recipe) => recipe.isFavorite && recipe.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderRecipeItem = ({ item }: { item: Recipe }) => (
    <View style={styles.recipeContainer}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.recipeDetails}>
        <Text style={styles.caloriesText}>{item.nutrition.calories} kcal</Text>
        <Text style={styles.titleText}>{item.title}</Text>
        <TouchableOpacity style={styles.viewRecipeButton}>
          <Text style={styles.viewRecipeText}>Lihat Resep</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(item.id)}>
        <Ionicons name={item.isFavorite ? "heart" : "heart-outline"} size={24} color={item.isFavorite ? "red" : "gray"} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <ScreenHeader title="Favorite" />
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: active === "resep" ? colors.primary : colors.white }]} onPress={() => setActive("resep")}>
          <Text style={{ color: active === "resep" ? colors.white : "black" }}>Resep</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: active === "ai" ? colors.primary : colors.white }]} onPress={() => setActive("ai")}>
          <Text style={{ color: active === "ai" ? colors.white : "black" }}>Buatan AI</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={filteredRecipes} renderItem={renderRecipeItem} keyExtractor={(item) => item.id} contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  listContainer: {
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  recipeContainer: {
    flexDirection: "row",
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  recipeDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  caloriesText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  viewRecipeButton: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
  },
  viewRecipeText: {
    fontSize: 14,
    color: colors.primary,
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 4,
  },
});

export default FavoriteScreen;
