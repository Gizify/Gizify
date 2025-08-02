import React, { useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Define navigation stack types
type ProfileStackParamList = {
    ManageAccountScreen: undefined;
    DeleteAccountScreen: undefined;
};

// Define navigation and route prop types for this screen
type NavigationProp = StackNavigationProp<ProfileStackParamList, "ManageAccountScreen">;
type RoutePropType = RouteProp<ProfileStackParamList, "ManageAccountScreen">;

// Component props
interface Props {
    navigation: NavigationProp;
    route: RoutePropType;
}

const ManageAccountScreen: React.FC<Props> = ({ navigation }) => {
    // Animation value for fade-in effect
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Animation value for button scaling
    const scaleAnim = useRef(new Animated.Value(1)).current;

    // Trigger fade-in animation when the screen mounts
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, []);

    // Scale down the button slightly on press in
    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.97,
            useNativeDriver: true,
        }).start();
    };

    // Restore button scale on press out
    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            {/* Background gradient */}
            <LinearGradient
                colors={["#ffffff", "#bfd6ff"]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={StyleSheet.absoluteFill}
            />

            {/* Header with back button */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="#1c1c1e" />
                    <Text style={styles.backText}>Kembali</Text>
                </TouchableOpacity>
            </View>

            {/* Scrollable content area */}
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.title}>Kelola Akun</Text>

                {/* Animated delete account button with glow effect */}
                <Animated.View style={[styles.glowWrapper, { transform: [{ scale: scaleAnim }] }]}>
                    <TouchableOpacity
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        onPress={() => navigation.navigate("DeleteAccountScreen")}
                        activeOpacity={0.85}
                        style={styles.deleteButton}
                    >
                        <Text style={styles.deleteText}>Hapus Akun</Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        </Animated.View>
    );
};

export default ManageAccountScreen;

// Stylesheet for layout and design
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 50, // Adjust for safe area / status bar
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    backText: {
        color: "#1c1c1e",
        fontSize: 16,
        marginLeft: 4,
        fontWeight: "500",
    },
    scroll: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#1c1c1e",
        marginBottom: 40,
    },
    glowWrapper: {
        width: "100%",
        borderRadius: 12,
        shadowColor: "#FF3B30", // iOS glow color
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 8, // Android shadow
        backgroundColor: "#ffe5e5", // subtle red background
    },
    deleteButton: {
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: "center",
        backgroundColor: "#FF3B30", // red button color
    },
    deleteText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 1,
        textTransform: "uppercase",
    },
});