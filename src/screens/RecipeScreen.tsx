import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from "react-native";
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

  const handleRetry = () => {
    dispatch(fetchRecipes() as any);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#5271FF" />
        <Text style={styles.loadingText}>Sedang memuat resep...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Terjadi kesalahan: {error}</Text>
        <Button title="Coba Lagi" onPress={handleRetry} />
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    marginBottom: 16,
    fontSize: 16,
    color: "#FF4D4F",
    textAlign: "center",
  },
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
