import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AvatarType, avatarList } from "../utils/avatars";
import AvatarModal from "../components/modals/AvatarModal";
import { updateUserProfile } from "../redux/actions/authAction";
import BottomSheet from "../components/modals/BottomSheet";

const EditProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state: any) => state.auth);

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");
    const [height, setHeight] = useState(user?.height?.toString() || "");
    const [weight, setWeight] = useState(user?.weight?.toString() || "");
    const [birthdate, setBirthdate] = useState(
        user?.birthdate
            ? new Date(user.birthdate).toLocaleDateString("en-GB").replace(/\//g, "/")
            : ""
    );
    const [birthdateError, setBirthdateError] = useState("");
    const [activityLevel, setActivityLevel] = useState(user?.activity_level || "");
    const [medicalHistory, setMedicalHistory] = useState(
        Array.isArray(user?.medical_history) ? user.medical_history.join(", ") : ""
    );
    const [pregnancyMonth, setPregnancyMonth] = useState(user?.gestational_age?.months?.toString() || "");
    const [pregnancyDay, setPregnancyDay] = useState(user?.gestational_age?.days?.toString() || "");

    const [photoOption, setPhotoOption] = useState<AvatarType | null>(
        avatarList.find((a) => a.id === user?.photoOption) || null
    );

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState<AvatarType | null>(photoOption);
    const [showActivityModal, setShowActivityModal] = useState(false);
    const [showHealthHistoryModal, setShowHealthHistoryModal] = useState(false);
    const [tempActivity, setTempActivity] = useState<string | null>(null);
    const [tempHealthHistory, setTempHealthHistory] = useState<string | null>(null);

    const isValidDate = (dateStr: string) => {
        const regex = /^([0-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        return regex.test(dateStr);
    };

    const formatDateInput = (input: string) => {
        const cleaned = input.replace(/\D/g, "");
        const parts = [];
        if (cleaned.length > 0) parts.push(cleaned.substring(0, 2));
        if (cleaned.length > 2) parts.push(cleaned.substring(2, 4));
        if (cleaned.length > 4) parts.push(cleaned.substring(4, 8));
        return parts.join("/");
    };

    const parseBirthdateToISO = (dateStr: string) => {
        const [day, month, year] = dateStr.split("/");
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    };

    const handleSelectAvatar = useCallback((avatar: AvatarType) => {
        setSelectedAvatar(avatar);
    }, []);

    const handleConfirmAvatar = useCallback(() => {
        setPhotoOption(selectedAvatar);
        setModalVisible(false);
    }, [selectedAvatar]);

    const handleSubmit = useCallback(async () => {
        if (!isValidDate(birthdate)) {
            Alert.alert("Error", "Format tanggal lahir tidak valid. Gunakan DD/MM/YYYY");
            return;
        }

        if (
            !name ||
            !email ||
            !height ||
            !weight ||
            !birthdate ||
            !activityLevel ||
            !medicalHistory ||
            !pregnancyMonth ||
            !pregnancyDay
        ) {
            Alert.alert("Error", "Mohon lengkapi semua data terlebih dahulu");
            return;
        }

        const updatedData = {
            name,
            email,
            ...(password && { password }),
            height: parseFloat(height),
            weight: parseFloat(weight),
            birthdate: parseBirthdateToISO(birthdate),
            activity_level: activityLevel,
            medical_history: medicalHistory === "Tidak ada" ? [] : [medicalHistory],
            gestational_age: {
                months: parseInt(pregnancyMonth),
                days: parseInt(pregnancyDay),
            },
            photoOption: photoOption?.id || null,
        };

        try {
            await dispatch(updateUserProfile(updatedData) as any);
            Alert.alert("Sukses", "Profil berhasil diperbarui");
            navigation.goBack();
        } catch (err) {
            console.error(err);
            Alert.alert("Gagal", "Terjadi kesalahan saat memperbarui profil");
        }
    }, [
        name,
        email,
        password,
        height,
        weight,
        birthdate,
        activityLevel,
        medicalHistory,
        pregnancyMonth,
        pregnancyDay,
        photoOption,
    ]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                removeClippedSubviews={true}
            >
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.header}>Pengaturan Akun</Text>
                </View>

                <View style={styles.profileImage}>
                    <Image
                        source={photoOption?.source || require("../../assets/avatar/default-avatar.png")}
                        style={styles.image}
                    />
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text style={styles.imageText}>Ganti foto</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Nama</Text>
                <TextInput style={styles.input} placeholder="Nama" value={name} onChangeText={setName} />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Password Baru</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password baru"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <Text style={styles.label}>Tinggi dan Berat Badan</Text>
                <View style={styles.row}>
                    <TextInput
                        style={styles.inputHalf}
                        placeholder="Tinggi Badan (cm)"
                        value={height}
                        onChangeText={setHeight}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.inputHalf}
                        placeholder="Berat Badan (kg)"
                        value={weight}
                        onChangeText={setWeight}
                        keyboardType="numeric"
                    />
                </View>

                <Text style={styles.label}>Tanggal Lahir</Text>
                <TextInput
                    style={styles.input}
                    placeholder="DD/MM/YYYY"
                    value={birthdate}
                    onChangeText={(text) => {
                        const formatted = formatDateInput(text);
                        setBirthdate(formatted);
                        setBirthdateError("");
                    }}
                    onBlur={() => {
                        if (birthdate && !isValidDate(birthdate)) {
                            setBirthdateError("Format tanggal tidak valid (contoh: 31/12/2000)");
                        }
                    }}
                    keyboardType="numeric"
                    maxLength={10}
                />
                {birthdateError ? (
                    <Text style={{ color: "red", marginBottom: 12 }}>{birthdateError}</Text>
                ) : null}

                <Text style={styles.label}>Tingkat Aktivitas</Text>
                <TouchableOpacity
                    style={[styles.input, styles.selectContainer]}
                    onPress={() => setShowActivityModal(true)}
                >
                    <Text style={[styles.selectText, { color: activityLevel ? "#333" : "#777" }]}>
                        {activityLevel || "Pilih tingkat aktivitas"}
                    </Text>
                    <Ionicons name="chevron-forward" size={20} color="#777" />
                </TouchableOpacity>

                <Text style={styles.label}>Usia Kehamilan</Text>
                <View style={styles.row}>
                    <TextInput
                        style={styles.inputHalf}
                        placeholder="Bulan Kehamilan"
                        value={pregnancyMonth}
                        onChangeText={setPregnancyMonth}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.inputHalf}
                        placeholder="Hari Kehamilan"
                        value={pregnancyDay}
                        onChangeText={setPregnancyDay}
                        keyboardType="numeric"
                    />
                </View>

                <Text style={styles.label}>Riwayat Kesehatan</Text>
                <TouchableOpacity
                    style={[styles.input, styles.selectContainer]}
                    onPress={() => setShowHealthHistoryModal(true)}
                >
                    <Text style={[styles.selectText, { color: medicalHistory ? "#333" : "#777" }]}>
                        {medicalHistory || "Pilih riwayat kesehatan"}
                    </Text>
                    <Ionicons name="chevron-forward" size={20} color="#777" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Simpan</Text>
                </TouchableOpacity>

                {/* Modals */}
                <AvatarModal
                    visible={modalVisible}
                    selectedAvatar={selectedAvatar}
                    onSelect={handleSelectAvatar}
                    onClose={() => setModalVisible(false)}
                    onConfirm={handleConfirmAvatar}
                    avatarList={avatarList}
                    currentAvatar={photoOption}
                />

                <BottomSheet
                    visible={showActivityModal}
                    title="Aktivitas"
                    options={[
                        { id: "Ringan", label: "Ringan" },
                        { id: "Sedang", label: "Sedang" },
                        { id: "Berat", label: "Berat" },
                    ]}
                    selectedOption={tempActivity || activityLevel}
                    onSelect={setTempActivity}
                    onClose={() => setShowActivityModal(false)}
                    type="option"
                    showContinueButton
                    onContinue={() => {
                        if (tempActivity) {
                            setActivityLevel(tempActivity);
                            setTempActivity(null);
                        }
                        setShowActivityModal(false);
                    }}
                />

                <BottomSheet
                    visible={showHealthHistoryModal}
                    title="Riwayat Kesehatan"
                    options={[
                        { id: "Anemia", label: "Anemia" },
                        { id: "Diabetes", label: "Diabetes" },
                        { id: "Hipertensi", label: "Hipertensi" },
                        { id: "TBC", label: "TBC" },
                        { id: "Tidak ada", label: "Tidak ada" },
                    ]}
                    selectedOption={tempHealthHistory || medicalHistory}
                    onSelect={setTempHealthHistory}
                    onClose={() => setShowHealthHistoryModal(false)}
                    type="option"
                    showContinueButton
                    onContinue={() => {
                        if (tempHealthHistory) {
                            setMedicalHistory(tempHealthHistory);
                            setTempHealthHistory(null);
                        }
                        setShowHealthHistoryModal(false);
                    }}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: "#fff",
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 16,
    },
    profileImage: {
        alignItems: "center",
        marginBottom: 24,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    imageText: {
        marginTop: 8,
        color: "#777",
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
        marginTop: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#F3F3F3",
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        backgroundColor: "#FAFAFA",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    inputHalf: {
        width: "48%",
        borderWidth: 1,
        borderColor: "#F3F3F3",
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        backgroundColor: "#FAFAFA",
    },
    selectContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
    },
    selectText: {
        fontSize: 14,
    },
    button: {
        marginTop: 16,
        backgroundColor: "#297872",
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default React.memo(EditProfileScreen);