import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { INITIAL_RECIPES } from "../utils/recipes";
import { Recipe } from "../types/recipe";
import { RecipeStackParamList } from "../types/navigation";

import ScreenHeader from "../components/layout/ScreenHeader";
import SearchBar from "../components/form/SearchBar";
import RecipeCard from "../components/cards/RecipeCard";
import globalStyles from "../styles/globalStyles";
import Button from "../components/form/Button";

const RecipeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RecipeStackParamList>>();

  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);

  const buatDenganAi = () => {
    navigation.navigate("CreateResepAi");
  };

  const toggleFavorite = (id: string) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
      )
    );
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={globalStyles.container}>
      <ScreenHeader title="Cari Resep" />
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} onToggleFavorite={toggleFavorite} />
        )}
      />
      <View style={[globalStyles.floating, { alignItems: "center" }]}>
        <Button title="Buat Dengan Ai" onPress={buatDenganAi} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 16,
  },
});

export default RecipeScreen;