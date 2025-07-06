import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

const ForgotPasswordScreen = () => {
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

    // Validasi email
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(email));
    }, [email]);

    // Validasi OTP
    useEffect(() => {
        setIsOtpComplete(otp.every(digit => digit !== ''));
    }, [otp]);

    // Validasi password
    useEffect(() => {
        setIsPasswordValid(
            password.length >= 6 &&
            confirmPassword.length >= 6 &&
            password === confirmPassword
        );
    }, [password, confirmPassword]);

    // Countdown timer
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

        // Auto focus next input
        if (value && index < 4 && otpInputs[index + 1]?.current) {
            otpInputs[index + 1].current?.focus();
        }
    };

    const handleResendOtp = () => {
        setCountdown(60);
        // Logika kirim ulang OTP
    };

    const handleSubmit = () => {
        Keyboard.dismiss();
        if (step === 1 && isEmailValid) {
            setStep(2);
        } else if (step === 2 && isOtpComplete) {
            setStep(3);
        } else if (step === 3 && isPasswordValid) {
            setStep(4); // Success screen
        }
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
                            Silahkan masukkan email Anda untuk mengatur ulang kata sandi!
                        </Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Masukkan Email"
                                placeholderTextColor="#888"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                !isEmailValid ? styles.disabledButton : styles.enabledButton
                            ]}
                            onPress={handleSubmit}
                            disabled={!isEmailValid}
                        >
                            <Text style={styles.buttonText}>Reset password</Text>
                        </TouchableOpacity>
                    </>
                );

            case 2:
                return (
                    <>
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
                                    value={digit}
                                    onChangeText={(value) => handleOtpChange(value, index)}
                                    keyboardType="numeric"
                                    maxLength={1}
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
                            <Text style={[
                                styles.resendText,
                                countdown > 0 && styles.disabledText
                            ]}>
                                Belum menerima kode? Kirim ulang
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                !isOtpComplete ? styles.disabledButton : styles.enabledButton
                            ]}
                            onPress={handleSubmit}
                            disabled={!isOtpComplete}
                        >
                            <Text style={styles.buttonText}>Verifikasi</Text>
                        </TouchableOpacity>
                    </>
                );

            case 3:
                return (
                    <>
                        <Text style={styles.subtitle}>
                            Buat kata sandi baru. Pastikan kata sandi tersebut berbeda dari kata sandi sebelumnya demi keamanan
                        </Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Masukkan password baru"
                                placeholderTextColor="#888"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Konfirmasi password baru"
                                placeholderTextColor="#888"
                                secureTextEntry
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                !isPasswordValid ? styles.disabledButton : styles.enabledButton
                            ]}
                            onPress={handleSubmit}
                            disabled={!isPasswordValid}
                        >
                            <Text style={styles.buttonText}>Perbarui password</Text>
                        </TouchableOpacity>
                    </>
                );

            case 4:
                return (
                    <View style={styles.successContainer}>
                        <Text style={styles.successTitle}>Selamat!</Text>
                        <Text style={styles.successText}>
                            Kata sandi Anda telah diubah,
                            Silahkan Klik Lanjutkan untuk masuk.
                        </Text>

                        <TouchableOpacity
                            style={styles.successButton}
                            onPress={() => console.log('Navigate to login')}
                        >
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
                <Text style={styles.title}>
                    {step === 1 || step === 3 ? 'Reset password' :
                        step === 2 ? 'Verifikasi' :
                            step === 4 ? 'Selamat!' : ''}
                </Text>

                {renderStepContent()}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        color: '#555',
        lineHeight: 22,
    },
    emailText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    otpInput: {
        width: 50,
        height: 60,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 24,
        marginHorizontal: 5,
        backgroundColor: '#f9f9f9',
    },
    countdown: {
        textAlign: 'center',
        color: '#888',
        marginBottom: 15,
        fontSize: 14,
    },
    resendButton: {
        alignSelf: 'center',
        marginBottom: 30,
    },
    resendText: {
        color: '#1E88E5',
        fontWeight: 'bold',
        fontSize: 16,
    },
    disabledText: {
        color: '#aaa',
    },
    button: {
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    enabledButton: {
        backgroundColor: '#297B77',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    successContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    successTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 20,
    },
    successText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        color: '#555',
        lineHeight: 24,
    },
    successButton: {
        backgroundColor: '#1E88E5',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 40,
    },
    successButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ForgotPasswordScreen;