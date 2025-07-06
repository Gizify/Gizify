import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Linking, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

const AccountSettingsScreen = () => {
    const navigation = useNavigation();
    const user = useSelector((state: any) => state.auth.user);

    const showToast = (title: string, message: string) => {
        Toast.show({
            type: "success",
            text1: title,
            text2: message,
            position: "bottom",
            visibilityTime: 2500,
            autoHide: true,
            bottomOffset: 70,
        });
    };

    const handlePasswordChange = () => {
        showToast("🔒 Ubah Password", "Kami telah mengirim link ke email Anda.");
    };

    const handleVerifyEmail = () => {
        showToast("📧 Verifikasi Email", "Link verifikasi dikirim ke email Anda.");
    };

    const handleManageDevices = () => {
        showToast("💻 Kelola Perangkat", "Menampilkan perangkat yang login.");
    };

    const handleTwoFactorAuth = () => {
        showToast("🛡️ Autentikasi 2 Langkah", "Pengaturan keamanan lanjutan.");
    };

    const handleHelp = () => {
        Linking.openURL("mailto:gizify.report@gmail.com");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={26} color="#1D1D1D" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Pengaturan Akun</Text>
                </View>
                <View style={{ width: 26 }} />
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Informasi Akun</Text>

                <View style={styles.cardBox}>
                    <Ionicons name="mail" size={20} color="#297B77" style={styles.icon} />
                    <Text style={styles.settingText}>{user?.email}</Text>
                </View>

                <TouchableOpacity style={styles.settingItem} onPress={handlePasswordChange}>
                    <Ionicons name="lock-closed-outline" size={20} color="#297B77" style={styles.icon} />
                    <Text style={styles.settingText}>Ubah Password</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem} onPress={handleVerifyEmail}>
                    <Ionicons name="mail-outline" size={20} color="#297B77" style={styles.icon} />
                    <Text style={styles.settingText}>Verifikasi Email</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem} onPress={handleManageDevices}>
                    <Ionicons name="laptop-outline" size={20} color="#297B77" style={styles.icon} />
                    <Text style={styles.settingText}>Kelola Perangkat</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem} onPress={handleTwoFactorAuth}>
                    <Ionicons name="shield-checkmark-outline" size={20} color="#297B77" style={styles.icon} />
                    <Text style={styles.settingText}>Autentikasi 2 Langkah</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem} onPress={handleHelp}>
                    <Ionicons name="help-circle-outline" size={20} color="#297B77" style={styles.icon} />
                    <Text style={styles.settingText}>Bantuan & Dukungan</Text>
                </TouchableOpacity>
            </View>

            <Toast />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#ffffff",
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1D1D1D",
    },
    content: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1E1E1E",
        marginBottom: 16,
    },
    cardBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E6F4EC",
        padding: 14,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    settingItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        padding: 14,
        borderRadius: 12,
        elevation: 1,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 4,
        marginBottom: 12,
    },
    icon: {
        marginRight: 14,
    },
    settingText: {
        fontSize: 15,
        color: "#1E1E1E",
        fontWeight: "500",
    },
});

export default AccountSettingsScreen;