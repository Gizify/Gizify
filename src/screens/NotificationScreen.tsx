import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Switch,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = () => {
    const navigation = useNavigation();

    const [generalNotif, setGeneralNotif] = useState(true);
    const [sound, setSound] = useState(false);
    const [vibration, setVibration] = useState(true);
    const [updateApp, setUpdateApp] = useState(false);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const general = await AsyncStorage.getItem('generalNotif');
                const soundVal = await AsyncStorage.getItem('sound');
                const vibrate = await AsyncStorage.getItem('vibration');
                const update = await AsyncStorage.getItem('updateApp');

                if (general !== null) setGeneralNotif(JSON.parse(general));
                if (soundVal !== null) setSound(JSON.parse(soundVal));
                if (vibrate !== null) setVibration(JSON.parse(vibrate));
                if (update !== null) setUpdateApp(JSON.parse(update));
            } catch (error) {
                console.log('Gagal memuat data dari AsyncStorage:', error);
            }
        };

        loadSettings();
    }, []);

    const updateSetting = async (key: string, value: boolean, setter: (v: boolean) => void) => {
        try {
            setter(value);
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(`Gagal menyimpan ${key}:`, error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#4B4B4B" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Notifikasi</Text>
                </View>

                {/* General Notifications */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Umum</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Pemberitahuan Umum</Text>
                        <Switch
                            value={generalNotif}
                            onValueChange={(val) => updateSetting('generalNotif', val, setGeneralNotif)}
                            trackColor={{ false: '#ccc', true: '#298c87' }}
                            thumbColor={generalNotif ? '#fff' : '#f4f3f4'}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Suara</Text>
                        <Switch
                            value={sound}
                            onValueChange={(val) => updateSetting('sound', val, setSound)}
                            trackColor={{ false: '#ccc', true: '#298c87' }}
                            thumbColor={sound ? '#fff' : '#f4f3f4'}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Getaran</Text>
                        <Switch
                            value={vibration}
                            onValueChange={(val) => updateSetting('vibration', val, setVibration)}
                            trackColor={{ false: '#ccc', true: '#298c87' }}
                            thumbColor={vibration ? '#fff' : '#f4f3f4'}
                        />
                    </View>
                </View>

                {/* System & App Updates */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pembaruan sistem & layanan</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Update Aplikasi</Text>
                        <Switch
                            value={updateApp}
                            onValueChange={(val) => updateSetting('updateApp', val, setUpdateApp)}
                            trackColor={{ false: '#ccc', true: '#298c87' }}
                            thumbColor={updateApp ? '#fff' : '#f4f3f4'}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default NotificationScreen;

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
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontWeight: '700',
        fontSize: 14,
        color: '#4B4B4B',
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
    },
    label: {
        fontSize: 14,
        color: '#4B4B4B',
    },
});