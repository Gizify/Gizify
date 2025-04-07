import React, { useState } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { INITIAL_RECIPES } from "../utils/recipes";
import { Recipe } from "../types/recipe";
import ScreenHeader from "../components/layout/ScreenHeader";
import SearchBar from "../components/form/SearchBar";
import RecipeCard from "../components/cards/RecipeCard";
import globalStyles from "../styles/globalStyles";

const FavoriteScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);

  const toggleFavorite = (id: string) => {
    setRecipes(recipes.map((recipe) => (recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe)));
  };

  const filteredRecipes = recipes.filter((recipe) => recipe.isFavorite && recipe.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={globalStyles.container}>
      <ScreenHeader title="Favorite" />
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <FlatList data={filteredRecipes} keyExtractor={(item) => item.id} numColumns={2} contentContainerStyle={styles.listContainer} renderItem={({ item }) => <RecipeCard recipe={item} onToggleFavorite={toggleFavorite} />} />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 16,
  },
});

export default FavoriteScreen;
