import React, { useState } from 'react';
import {
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    Alert,
} from 'react-native';
import Animated, { FadeInDown, FadeOutUp, Layout, Easing } from 'react-native-reanimated';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStackNavigator';

type NavigationProps = NativeStackNavigationProp<AuthStackParamList>;

const LoginRegisterScreen = () => {
    const navigation = useNavigation<NavigationProps>();

    const [isLogin, setIsLogin] = useState(true);
    const [agree, setAgree] = useState(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        if (!agree) {
            return Alert.alert('Error', 'Kamu harus menyetujui syarat dan ketentuan');
        }

        if (!email || !password) {
            return Alert.alert('Error', 'Email dan password harus diisi');
        }

        if (!isLogin && password !== confirmPassword) {
            return Alert.alert('Error', 'Password tidak cocok');
        }

        const url = isLogin
            ? 'http://localhost:3000/api/login'
            : 'http://localhost:3000/api/register';

        const payload = isLogin
            ? { email, password }
            : { name, email, password };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Terjadi kesalahan');
            }

            if (isLogin) {
                navigation.replace('HomeScreen');
            } else {
                navigation.replace('StartScreen');
            }
        } catch (error: any) {
            Alert.alert('Gagal', error.message);
        }
    };

    return (
        <View style={styles.container}>
            {/* Logo & Switch */}
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/logo/Logo.png')} style={styles.logo} resizeMode="contain" />
                <View style={styles.switchContainer}>
                    <TouchableOpacity
                        style={[styles.switchBtn, isLogin && styles.activeBtn]}
                        onPress={() => setIsLogin(true)}
                    >
                        <Text style={[styles.switchText, isLogin && styles.activeText]}>Masuk</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.switchBtn, !isLogin && styles.activeBtn]}
                        onPress={() => setIsLogin(false)}
                    >
                        <Text style={[styles.switchText, !isLogin && styles.activeText]}>Daftar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Animated Form */}
            <Animated.View
                layout={Layout.duration(500).easing(Easing.out(Easing.exp))}
                entering={FadeInDown.duration(400)}
                exiting={FadeOutUp.duration(300)}
                style={styles.form}
            >
                {!isLogin && (
                    <TextInput
                        placeholder="Nama Lengkap"
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                )}
                <TextInput
                    placeholder="Masukkan Email / Username"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="Masukkan Password"
                    secureTextEntry
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />
                {!isLogin && (
                    <TextInput
                        placeholder="Konfirmasi Password"
                        secureTextEntry
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                )}

                {isLogin && <Text style={styles.forgotText}>Lupa Password ?</Text>}

                <View style={styles.checkboxContainer}>
                    <Checkbox value={agree} onValueChange={setAgree} color="#00aaff" />
                    <Text style={styles.agreeText}>
                        Saya telah membaca dan menyetujui{' '}
                        <Text style={styles.link}>syarat dan ketentuan</Text> dan{' '}
                        <Text style={styles.link}>kebijakan privasi</Text>
                    </Text>
                </View>

                {/* Submit Button */}
                <Pressable style={styles.submitBtn} onPress={handleSubmit}>
                    <Text style={styles.submitText}>{isLogin ? 'Masuk' : 'Daftar'}</Text>
                </Pressable>
            </Animated.View>
        </View>
    );
};

export default LoginRegisterScreen;

// Styles tetap sama
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        paddingTop: 60,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    logo: {
        width: 150,
        height: 50,
        marginBottom: 16,
    },
    switchContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 16,
        overflow: 'hidden',
        borderColor: '#aaa',
        width: '100%',
        maxWidth: 300,
        alignSelf: 'center',
    },
    switchBtn: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    switchText: {
        fontSize: 16,
        color: '#226655',
    },
    activeBtn: {
        backgroundColor: '#226655',
    },
    activeText: {
        color: 'white',
        fontWeight: 'bold',
    },
    form: {
        marginTop: 16,
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 16,
        paddingVertical: 10,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    forgotText: {
        textAlign: 'right',
        color: '#444',
        fontWeight: 'bold',
        fontSize: 13,
        marginBottom: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    agreeText: {
        marginLeft: 8,
        flex: 1,
        fontSize: 13,
        color: '#333',
    },
    link: {
        color: '#007bff',
        textDecorationLine: 'underline',
    },
    submitBtn: {
        backgroundColor: '#226655',
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#00ffaa',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },
    submitText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});