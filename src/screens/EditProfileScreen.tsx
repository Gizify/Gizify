import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AvatarType, avatarList } from "../utils/avatars";
import BottomSheet from "../components/modals/BottomSheet";
import AvatarModal from "../components/modals/AvatarModal";
import { updateUserProfile } from "../redux/actions/authAction";

const EditProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state: any) => state.auth);

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");
    const [height, setHeight] = useState(user?.height?.toString() || "");
    const [weight, setWeight] = useState(user?.weight?.toString() || "");
    const [birthdate, setBirthdate] = useState(user?.birthdate || "");
    const [activity, setActivity] = useState(user?.activity || "");
    const [healthHistory, setHealthHistory] = useState(user?.healthHistory || "");
    const [pregnancyMonth, setPregnancyMonth] = useState(user?.pregnancyMonth?.toString() || "");
    const [pregnancyDay, setPregnancyDay] = useState(user?.pregnancyDay?.toString() || "");
    const [photoOption, setPhotoOption] = useState<AvatarType | null>(
        avatarList.find((a) => a.id === user?.photoOption) || null
    );

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState<AvatarType | null>(photoOption);

    const handleSelectAvatar = (avatar: AvatarType) => setSelectedAvatar(avatar);

    const handleConfirmAvatar = () => {
        setPhotoOption(selectedAvatar);
        setModalVisible(false);
    };

    const handleSubmit = async () => {
        if (!name || !email || !height || !weight || !birthdate || !activity || !healthHistory || !pregnancyMonth || !pregnancyDay) {
            Alert.alert("Error", "Mohon lengkapi semua data terlebih dahulu");
            return;
        }

        const updatedData = {
            name,
            email,
            ...(password && { password }),
            height: parseFloat(height),
            weight: parseFloat(weight),
            birthdate,
            activity,
            healthHistory,
            pregnancyMonth: parseInt(pregnancyMonth),
            pregnancyDay: parseInt(pregnancyDay),
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
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
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

            <TextInput style={styles.input} placeholder="Nama" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Password baru" value={password} onChangeText={setPassword} secureTextEntry />

            <View style={styles.row}>
                <TextInput style={styles.inputHalf} placeholder="Tinggi Badan (cm)" value={height} onChangeText={setHeight} keyboardType="numeric" />
                <TextInput style={styles.inputHalf} placeholder="Berat Badan (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" />
            </View>

            <TextInput style={styles.input} placeholder="Tanggal Lahir" value={birthdate} onChangeText={setBirthdate} />
            <TextInput style={styles.input} placeholder="Aktivitas" value={activity} onChangeText={setActivity} />

            <View style={styles.row}>
                <TextInput style={styles.inputHalf} placeholder="Bulan Kehamilan" value={pregnancyMonth} onChangeText={setPregnancyMonth} keyboardType="numeric" />
                <TextInput style={styles.inputHalf} placeholder="Hari Kehamilan" value={pregnancyDay} onChangeText={setPregnancyDay} keyboardType="numeric" />
            </View>

            <TextInput style={styles.input} placeholder="Riwayat Kesehatan" value={healthHistory} onChangeText={setHealthHistory} />


            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Simpan</Text>
            </TouchableOpacity>

            <AvatarModal
                visible={modalVisible}
                selectedAvatar={selectedAvatar}
                onSelect={handleSelectAvatar}
                onClose={() => setModalVisible(false)}
                onConfirm={handleConfirmAvatar}
                avatarList={avatarList}
                currentAvatar={photoOption}
            />
        </ScrollView>
    );
};

export default EditProfileScreen;

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
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#F3F3F3",
    },
    imageText: {
        marginTop: 8,
        color: "#777",
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