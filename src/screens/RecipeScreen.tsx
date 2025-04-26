import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Recipe } from "../types/recipe";
import { RecipeStackParamList } from "../types/navigation";

import ScreenHeader from "../components/layout/ScreenHeader";
import SearchBar from "../components/form/SearchBar";
import RecipeCard from "../components/cards/RecipeCard";
import globalStyles from "../styles/globalStyles";
import Button from "../components/form/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../redux/actions/recipeAction";

const RecipeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RecipeStackParamList>>();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const { recipes = [], loading, error } = useSelector((state: any) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes() as any);
  }, [dispatch]);

  const buatDenganAi = () => {
    navigation.navigate("CreateResepAi");
  };

  const toggleFavorite = (id: string) => {
    // Logic toggle favorite
  };

  // Gunakan recipes || [] untuk menghindari error jika recipes undefined
  const filteredRecipes = (recipes || []).filter((recipe: any) => recipe.title?.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) {
    return (
      <View>
        <ScreenHeader title="Memuat..." />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <ScreenHeader title={`Error: ${error}`} />
      </View>
    );
  }

  // Tambahkan pengecekan jika recipes null/undefined
  if (!recipes) {
    return (
      <View>
        <ScreenHeader title="Resep tidak tersedia" />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <ScreenHeader title="Cari Resep" />
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => <RecipeCard recipe={item} onToggleFavorite={toggleFavorite} />}
        ListEmptyComponent={<Text style={{ textAlign: "center" }}>Tidak ada resep yang ditemukan.</Text>}
      />
      <View style={styles.floatingButton}>
        <Button title="Buat Dengan Ai" onPress={buatDenganAi} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 16,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RecipeScreen;
