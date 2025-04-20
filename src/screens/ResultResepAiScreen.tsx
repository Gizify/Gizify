import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenHeader from "../components/layout/ScreenHeader";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RecipeStackParamList } from "../types/navigation";
import Button from "../components/form/Button";

type ResultResepAiRouteProp = RouteProp<RecipeStackParamList, "ResultResepAi">;

const ResultResepAiScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RecipeStackParamList>>();
    const route = useRoute<ResultResepAiRouteProp>();

    const recipeData = {
        title: "Tempe Telur Orek Kecap",
        nutrition: {
            weight: "195",
            weightUnit: "Gr",
            calories: "218 Kcal",
            carbs: "45.8 gr",
            protein: "4.5 gr",
            fiber: "3.5 gr",
            fat: "1.6 gr",
        },
        ingredients: [
            "1/2 papan tempe, potong potong",
            "1 butir telur",
            "2 sdm kecap manis",
            "1/2 sdt kaldu bubuk",
            "2 buah cabe hijau",
            "3 siung bawang merah",
        ],
        steps: [
            "Potong tempe kecil-kecil atau sesuai selera.",
            "Iris bawang merah dan cabe hijau.",
            "Kocok telur dalam mangkuk, beri sedikit garam.",
            "Panaskan minyak, tumis bawang merah hingga harum.",
            "Masukkan tempe, aduk hingga setengah matang.",
            "Tuang kocokan telur, aduk rata dengan tempe.",
            "Tambahkan kecap manis, kaldu bubuk, dan cabe hijau.",
            "Aduk terus hingga semua bahan matang dan tercampur rata.",
            "Koreksi rasa, tambahkan garam jika diperlukan.",
            "Sajikan hangat dengan nasi putih.",
        ],
    };

    const handleAddToConsumption = () => {
        console.log("Added to consumption");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScreenHeader
                    title="Hasil Resep AI"
                    showBack
                    onBackPress={() => navigation.goBack()}
                    style={{ marginBottom: 12 }}
                />

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.recipeTitle}>{recipeData.title}</Text>

                    {/* Nutrition Table */}
                    <View style={styles.nutritionTable}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableLabel}>Berat</Text>
                            <Text style={styles.tableValue}>{recipeData.nutrition.weight}</Text>
                            <Text style={styles.tableUnit}>{recipeData.nutrition.weightUnit}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableLabel}>Kalori</Text>
                            <Text style={styles.tableValue}>{recipeData.nutrition.calories}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableLabel}>Karbo</Text>
                            <Text style={styles.tableValue}>{recipeData.nutrition.carbs}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableLabel}>Protein</Text>
                            <Text style={styles.tableValue}>{recipeData.nutrition.protein}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableLabel}>Serat</Text>
                            <Text style={styles.tableValue}>{recipeData.nutrition.fiber}</Text>
                        </View>
                        <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
                            <Text style={styles.tableLabel}>Lemak</Text>
                            <Text style={styles.tableValue}>{recipeData.nutrition.fat}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Ingredients Section */}
                    <Text style={styles.sectionTitle}>Bahan-bahan</Text>
                    <View style={styles.ingredientsContainer}>
                        {recipeData.ingredients.map((item, index) => (
                            <View key={index} style={styles.ingredientRow}>
                                <Text style={styles.bullet}>•</Text>
                                <Text style={styles.ingredientText}>{item}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Steps Section */}
                    <Text style={styles.sectionTitle}>Cara membuat</Text>
                    <View style={styles.stepsContainer}>
                        {recipeData.steps.map((step, index) => (
                            <View key={index} style={styles.stepRow}>
                                <Text style={styles.stepNumber}>{index + 1}.</Text>
                                <Text style={styles.stepText}>{step}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                {/* Fixed Button at Bottom */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Tambah ke konsumsi harian"
                        onPress={handleAddToConsumption}
                        icon={<Ionicons name="add" size={20} color="white" />}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 30,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    recipeTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    nutritionTable: {
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginBottom: 16,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    tableLabel: {
        flex: 1,
        fontSize: 14,
        color: '#555',
    },
    tableValue: {
        width: 100,
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        textAlign: 'right',
    },
    tableUnit: {
        width: 40,
        fontSize: 14,
        color: '#777',
        textAlign: 'right',
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    ingredientsContainer: {
        marginBottom: 24,
    },
    ingredientRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    bullet: {
        marginRight: 8,
        color: '#555',
    },
    ingredientText: {
        flex: 1,
        fontSize: 15,
        color: '#555',
    },
    stepsContainer: {
        marginBottom: 24,
    },
    stepRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    stepNumber: {
        fontWeight: 'bold',
        marginRight: 8,
        color: '#555',
    },
    stepText: {
        flex: 1,
        fontSize: 15,
        color: '#555',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
    },
});

export default ResultResepAiScreen;