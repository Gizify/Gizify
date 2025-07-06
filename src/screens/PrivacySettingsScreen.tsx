import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ProfileStackParamList } from '../navigation/ProfileStackNavigator';

const PrivacySettingsScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();

    const MenuItem = ({ label, onPress }: { label: string; onPress: () => void }) => (
        <TouchableOpacity style={styles.row} onPress={onPress}>
            <Text style={styles.label}>{label}</Text>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#4B4B4B" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Pengaturan Privasi</Text>
                </View>

                <MenuItem
                    label="Kebijakan Privasi"
                    onPress={() => navigation.navigate('PrivacyPolicyScreen')}
                />
                <MenuItem
                    label="Kelola akun"
                    onPress={() => navigation.navigate('ManageAccountScreen')}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default PrivacySettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scroll: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
        gap: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#4B4B4B',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
    },
    label: {
        fontSize: 16,
        color: '#4B4B4B',
    },
});