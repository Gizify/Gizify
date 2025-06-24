import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity } from "react-native";
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
import colors from "../styles/colors";

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

  const uploadResep = () => {
    navigation.navigate("UploadResep");
  };

  const toggleFavorite = (id: string) => {
    // Logic toggle favorite
  };

  // Gunakan recipes || [] untuk menghindari error jika recipes undefined
  const filteredRecipes = (recipes || []).filter((recipe: any) => recipe.title?.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleRetry = () => {
    dispatch(fetchRecipes() as any);
  };

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
        ListEmptyComponent={!loading ? <Text style={{ textAlign: "center" }}>Tidak ada resep yang ditemukan.</Text> : null}
        ListFooterComponent={
          loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#5271FF" />
              <Text style={styles.loadingText}>Sedang memuat resep...</Text>
            </View>
          ) : null
        }
      />

      <View style={styles.floatingButtonsContainer}>
        <TouchableOpacity style={[styles.floatingButton, styles.uploadButton]} onPress={uploadResep} activeOpacity={0.7}>
          <Text style={styles.floatingButtonText}>Upload Resep</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.floatingButton, styles.aiButton]} onPress={buatDenganAi} activeOpacity={0.7}>
          <Text style={styles.floatingButtonText}>Buat Dengan AI</Text>
        </TouchableOpacity>
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
  loadingContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
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
    paddingBottom: 40,
  },
  floatingButtonsContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    left: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  floatingButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  aiButton: {
    backgroundColor: colors.primary,
  },
  uploadButton: {
    backgroundColor: colors.primary,
  },
  floatingButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default RecipeScreen;
