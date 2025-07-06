import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicyScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Kebijakan Privasi</Text>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.paragraph}>
                    Selamat datang di Gizify. Privasi Anda penting bagi kami. Dokumen ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat menggunakan aplikasi Gizify.
                </Text>

                <Text style={styles.sectionTitle}>1. Informasi yang Kami Kumpulkan</Text>
                <Text style={styles.paragraph}>
                    Kami dapat mengumpulkan informasi pribadi yang Anda berikan secara sukarela, seperti nama, usia, berat badan, tinggi badan, kebutuhan kalori, serta preferensi makanan. Kami juga mengumpulkan data konsumsi makanan harian untuk membantu pemantauan gizi Anda.
                </Text>

                <Text style={styles.sectionTitle}>2. Penggunaan Informasi</Text>
                <Text style={styles.paragraph}>Informasi yang dikumpulkan digunakan untuk:</Text>
                <Text style={styles.bullet}>• Menghitung dan memantau asupan gizi harian Anda.</Text>
                <Text style={styles.bullet}>• Memberikan rekomendasi resep berbasis AI sesuai kebutuhan dan bahan Anda.</Text>
                <Text style={styles.bullet}>• Menampilkan riwayat konsumsi dan analisis gizi Anda.</Text>

                <Text style={styles.sectionTitle}>3. Integrasi Pihak Ketiga</Text>
                <Text style={styles.paragraph}>
                    Gizify menggunakan API dari Edamam dan Open Food Facts untuk mendapatkan informasi gizi bahan makanan dan produk kemasan. Kami hanya mengakses data gizi, tanpa mengambil data pribadi pengguna dari layanan pihak ketiga ini.
                </Text>

                <Text style={styles.sectionTitle}>4. Perlindungan Data</Text>
                <Text style={styles.paragraph}>
                    Kami menerapkan langkah-langkah teknis dan organisasi yang sesuai untuk melindungi data Anda dari akses, penggunaan, atau pengungkapan yang tidak sah.
                </Text>

                <Text style={styles.sectionTitle}>5. Hak Anda</Text>
                <Text style={styles.paragraph}>
                    Anda berhak untuk mengakses, memperbarui, atau menghapus data pribadi Anda kapan saja dengan menghubungi kami melalui layanan dukungan aplikasi.
                </Text>

                <Text style={styles.subSectionTitle}>Prosedur Penghapusan Akun</Text>
                <Text style={styles.bullet}>• Buka aplikasi Gizify dan pergi ke halaman Profile</Text>
                <Text style={styles.bullet}>• Klik menu "Hapus Akun" yang tersedia di bagian pengaturan</Text>
                <Text style={styles.bullet}>• Konfirmasi penghapusan akun dengan memasukkan password Anda</Text>
                <Text style={styles.bullet}>• Tekan "OK" untuk menyelesaikan proses penghapusan akun</Text>
                <Text style={styles.note}>
                    Catatan: Penghapusan akun bersifat permanen dan semua data Anda akan dihapus dari sistem kami.
                </Text>

                <Text style={styles.sectionTitle}>6. Perubahan Kebijakan Privasi</Text>
                <Text style={styles.paragraph}>
                    Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan diberitahukan kepada pengguna melalui aplikasi atau pembaruan di situs web kami.
                </Text>

                <Text style={styles.sectionTitle}>7. Kontak</Text>
                <Text style={styles.paragraph}>
                    Jika Anda memiliki pertanyaan atau keluhan tentang Kebijakan Privasi ini, silakan hubungi kami melalui email: <Text style={styles.highlight}>gizify.report@gmail.com</Text>.
                </Text>

                <Text style={styles.sectionTitle}>8. Pelaporan Resep AI</Text>
                <Text style={styles.paragraph}>
                    Jika Anda menemukan bahwa resep yang dihasilkan oleh AI tidak akurat, menyesatkan, atau tidak sesuai dengan kebutuhan gizi Anda, Anda dapat melaporkannya melalui fitur pelaporan yang tersedia di aplikasi.
                </Text>

                <Text style={styles.subSectionTitle}>Cara Melaporkan Resep AI</Text>
                <Text style={styles.bullet}>• Buka resep yang ingin Anda laporkan di aplikasi Gizify</Text>
                <Text style={styles.step}>Langkah 1</Text>
                <Text style={styles.bullet}>• Klik tombol "Laporkan Resep" di bagian bawah resep</Text>
                <Text style={styles.step}>Langkah 2</Text>
                <Text style={styles.bullet}>• Pilih alasan pelaporan seperti: informasi gizi tidak sesuai, bahan tidak relevan, atau kesalahan lainnya</Text>
                <Text style={styles.step}>Langkah 3</Text>
                <Text style={styles.bullet}>• Kirim laporan Anda, dan tim kami akan meninjau dalam waktu maksimal 48 jam</Text>
                <Text style={styles.note}>
                    Catatan: Resep yang dilaporkan akan diperiksa secara manual oleh tim kami. Anda dapat memberikan deskripsi tambahan untuk membantu proses peninjauan.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        gap: 12,
    },
    backButton: {
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginTop: 24,
        marginBottom: 8,
    },
    subSectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
        marginTop: 20,
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 14,
        color: '#444',
        lineHeight: 22,
        marginBottom: 10,
    },
    bullet: {
        fontSize: 14,
        color: '#444',
        lineHeight: 22,
        marginLeft: 12,
        marginBottom: 6,
    },
    step: {
        fontSize: 13,
        fontWeight: '500',
        color: '#007AFF',
        marginTop: 10,
        marginBottom: 4,
    },
    note: {
        fontSize: 13,
        fontStyle: 'italic',
        color: '#666',
        marginTop: 8,
        marginBottom: 12,
        lineHeight: 20,
        marginLeft: 8,
    },
    highlight: {
        color: '#007AFF',
        fontWeight: '500',
    },
});

export default PrivacyPolicyScreen;