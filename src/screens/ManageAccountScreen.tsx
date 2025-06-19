import React, { useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type ProfileStackParamList = {
    ManageAccountScreen: undefined;
    DownloadDataScreen: undefined;
    DeactivateAccountScreen: undefined;
    DeleteAccountScreen: undefined;
};

type NavigationProp = StackNavigationProp<ProfileStackParamList, "ManageAccountScreen">;
type RoutePropType = RouteProp<ProfileStackParamList, "ManageAccountScreen">;

interface Props {
    navigation: NavigationProp;
    route: RoutePropType;
}

const ManageAccountScreen: React.FC<Props> = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const renderButton = (
        label: string,
        onPress: () => void,
        options: { color?: string; glowColor?: string } = {}
    ) => {
        const scale = useRef(new Animated.Value(1)).current;
        const animatedStyle = { transform: [{ scale }] };

        const buttonColor = options.color || "#1f1f3a";
        const glowColor = options.glowColor || "#00FFE0";

        return (
            <Animated.View
                style={[
                    styles.glowButton,
                    {
                        shadowColor: glowColor,
                        backgroundColor: `${glowColor}22`,
                    },
                ]}
            >
                <TouchableOpacity
                    onPressIn={() => {
                        Animated.spring(scale, {
                            toValue: 0.96,
                            useNativeDriver: true,
                        }).start();
                    }}
                    onPressOut={() => {
                        Animated.spring(scale, {
                            toValue: 1,
                            useNativeDriver: true,
                        }).start();
                    }}
                    onPress={onPress}
                    activeOpacity={0.85}
                >
                    <Animated.View
                        style={[
                            styles.button,
                            animatedStyle,
                            { backgroundColor: buttonColor },
                        ]}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                { color: glowColor },
                            ]}
                        >
                            {label}
                        </Text>
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Kelola Akun</Text>

                {renderButton("Unduh Data", () => navigation.navigate("DownloadDataScreen"))}
                {renderButton("Nonaktifkan Akun", () => navigation.navigate("DeactivateAccountScreen"))}
                {renderButton("Hapus Akun", () => navigation.navigate("DeleteAccountScreen"), {
                    color: "#2a0e0e",
                    glowColor: "#FF4C4C",
                })}
            </ScrollView>
        </Animated.View>
    );
};

export default ManageAccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0d0c1d",
    },
    scrollContent: {
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 30,
        textAlign: "center",
        textShadowColor: "#00FFE0",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 12,
        letterSpacing: 1.5,
    },
    glowButton: {
        width: "100%",
        marginVertical: 12,
        borderRadius: 16,
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 25,
        elevation: 12,
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 16,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 1.3,
    },
});