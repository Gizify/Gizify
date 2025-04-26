import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Recipe } from "../../types/recipe";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RecipeStackParamList } from "../../types/navigation";

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite: (id: string) => void;
}

type RecipeCardNavigationProp = StackNavigationProp<RecipeStackParamList, "RecipeList">;

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 36) / 2;

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onToggleFavorite }) => {
  const navigation = useNavigation<RecipeCardNavigationProp>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("RecipeDetail", { recipe })} style={styles.recipeCard}>
      <Image source={recipe.image ? { uri: recipe.image } : require("../../../assets/image/default_recipe.jpg")} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle} numberOfLines={1}>
          {recipe.title}
        </Text>
        <TouchableOpacity style={styles.favoriteButton} onPress={() => onToggleFavorite(recipe._id)}>
          <MaterialIcons name={recipe.isFavorite ? "favorite" : "favorite-border"} size={20} color={recipe.isFavorite ? "red" : "#333"} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    width: CARD_WIDTH,
    marginRight: 12,
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recipeImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  recipeInfo: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recipeTitle: {
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
    marginRight: 8,
  },
  favoriteButton: {
    padding: 4,
  },
});

export default RecipeCard;
