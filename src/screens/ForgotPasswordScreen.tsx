import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStackNavigator';
import { Ionicons } from '@expo/vector-icons';


type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ForgotPasswordScreen'>;

const ForgotPasswordScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '']);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [countdown, setCountdown] = useState(60);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isOtpComplete, setIsOtpComplete] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const otpInputs = Array(5).fill(0).map(() => useRef<TextInput>(null));

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(email));
    }, [email]);

    useEffect(() => {
        setIsOtpComplete(otp.every((digit) => digit !== ''));
    }, [otp]);

    useEffect(() => {
        setIsPasswordValid(
            password.length >= 6 &&
            confirmPassword.length >= 6 &&
            password === confirmPassword
        );
    }, [password, confirmPassword]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (step === 2 && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown, step]);

    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 4 && otpInputs[index + 1]?.current) {
            otpInputs[index + 1].current?.focus();
        }
    };

    const handleResendOtp = () => {
        setCountdown(60);
    };

    const handleSubmit = () => {
        Keyboard.dismiss();
        if (step === 1 && isEmailValid) {
            setStep(2);
        } else if (step === 2 && isOtpComplete) {
            setStep(3);
        } else if (step === 4 && isPasswordValid) {
            setStep(5);
        }
    };

    const handleConfirmOtp = () => {
        setStep(4);
    };

    const handleSuccess = () => {
        navigation.navigate('LoginRegisterScreen');
    };

    const maskEmail = (email: string) => {
        const [username, domain] = email.split('@');
        return `${username[0]}${'*'.repeat(3)}${username.slice(-1)}@${domain}`;
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <Text style={styles.subtitle}>
                            Silahkan masukkan email Anda untuk mengatur ulang kata sandi
                        </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Masukkan Email"
                                placeholderTextColor="#BDBDBD"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                        <TouchableOpacity
                            style={[styles.button, isEmailValid ? styles.enabledButton : styles.disabledButton]}
                            disabled={!isEmailValid}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonText}>Reset password</Text>
                        </TouchableOpacity>
                    </>
                );

            case 2:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.subtitle}>
                            Periksa email, masukkan kode 5 digit yang telah dikirim ke
                        </Text>
                        <Text style={styles.emailText}>{maskEmail(email)}</Text>

                        <View style={styles.otpContainer}>
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={otpInputs[index]}
                                    style={styles.otpInput}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChangeText={(value) => handleOtpChange(value, index)}
                                />
                            ))}
                        </View>

                        <Text style={styles.countdown}>
                            Tunggu {countdown} detik sebelum meminta kode lainnya
                        </Text>

                        <TouchableOpacity
                            style={styles.resendButton}
                            onPress={handleResendOtp}
                            disabled={countdown > 0}
                        >
                            <Text style={[styles.resendText, countdown > 0 && styles.disabledText]}>
                                Belum menerima kode? <Text style={{ textDecorationLine: 'underline' }}>Kirim ulang</Text>
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.bottomAction}>
                            <TouchableOpacity
                                style={[styles.button, isOtpComplete ? styles.enabledButton : styles.disabledButton]}
                                disabled={!isOtpComplete}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.buttonText}>Kode verifikasi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );

            case 3:
                return (
                    <View style={styles.confirmContainer}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name="arrow-back" size={24} color="#000" />
                            </TouchableOpacity>
                            <Text style={styles.title}>Reset password</Text>
                        </View>
                        <Text style={styles.subtitle}>
                            Kata sandi Anda telah berhasil diatur ulang. Klik konfirmasi untuk mengatur kata sandi baru
                        </Text>
                        <TouchableOpacity
                            style={[styles.button, styles.enabledButton]}
                            onPress={handleConfirmOtp}
                        >
                            <Text style={styles.buttonText}>Konfirmasi</Text>
                        </TouchableOpacity>
                    </View>
                );

            case 4:
                return (
                    <>
                        <Text style={styles.subtitle}>
                            Buat kata sandi baru. Pastikan kata sandi tersebut berbeda dari kata sandi sebelumnya demi keamanan
                        </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Masukkan password baru"
                                placeholderTextColor="#BDBDBD"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Konfirmasi password baru"
                                placeholderTextColor="#BDBDBD"
                                secureTextEntry
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                        </View>
                        <TouchableOpacity
                            style={[styles.button, isPasswordValid ? styles.enabledButton : styles.disabledButton]}
                            disabled={!isPasswordValid}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonText}>Konfirmasi</Text>
                        </TouchableOpacity>
                    </>
                );

            case 5:
                return (
                    <View style={styles.successContainer}>
                        <View style={styles.successIcon}>
                            <Text style={styles.successIconText}>✓</Text>
                        </View>
                        <Text style={styles.successTitle}>Selamat!</Text>
                        <Text style={styles.successText}>
                            Kata sandi Anda telah diubah,{"\n"}Silahkan Klik Lanjutkan untuk masuk.
                        </Text>
                        <TouchableOpacity style={styles.successButton} onPress={handleSuccess}>
                            <Text style={styles.successButtonText}>Lanjutkan</Text>
                        </TouchableOpacity>
                    </View>
                );

            default:
                return null;
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {(step !== 5 && step !== 3) && (
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={24} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.title}>
                            {step === 1 || step === 4 ? 'Reset password' :
                                step === 2 ? 'Verifikasi' : ''}
                        </Text>
                    </View>
                )}
                {renderStepContent()}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingRight: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#000',
        flex: 1,
        marginLeft: 12,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        paddingTop: 40,
    },
    stepContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    subtitle: {
        fontSize: 14,
        color: '#6A6A6A',
        marginBottom: 20,
        lineHeight: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 48,
        borderRadius: 10,
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 16,
        fontSize: 14,
        color: '#000',
    },
    button: {
        height: 48,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    enabledButton: {
        backgroundColor: '#297B77',
    },
    disabledButton: {
        backgroundColor: '#aaa',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    bottomAction: {
        marginTop: 'auto',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    otpInput: {
        width: 50,
        height: 55,
        borderRadius: 10,
        backgroundColor: '#F2F2F2',
        textAlign: 'center',
        fontSize: 22,
        color: '#000',
    },
    countdown: {
        fontSize: 13,
        textAlign: 'center',
        color: '#888',
        marginBottom: 10,
    },
    resendButton: {
        alignItems: 'center',
        marginBottom: 30,
    },
    resendText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#1E88E5',
    },
    disabledText: {
        color: '#aaa',
    },
    emailText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: '600',
    },
    successContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        paddingHorizontal: 20,
    },
    successIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#CDE7E5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    successIconText: {
        fontSize: 40,
        color: '#297B77',
    },
    successTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#297B77',
        marginBottom: 10,
    },
    successText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#6A6A6A',
        marginBottom: 30,
        lineHeight: 22,
    },
    successButton: {
        backgroundColor: '#297B77',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 40,
    },
    successButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    confirmContainer: {
        paddingBottom: 40,
    },
});