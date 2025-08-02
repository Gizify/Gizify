import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
  Linking,
} from "react-native";
import Animated, { FadeInDown, FadeOutUp, Layout, Easing } from "react-native-reanimated";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthStackNavigator";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/actions/authAction";

// Type definition for navigation
type NavigationProps = NativeStackNavigationProp<AuthStackParamList>;

const LoginRegisterScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: any) => state.auth); // Get auth state from Redux

  // Local state for form input and view state
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [agree, setAgree] = useState(false); // Checkbox for terms
  const [name, setName] = useState(""); // Name input for register
  const [email, setEmail] = useState(""); // Email input
  const [password, setPassword] = useState(""); // Password input
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password input

  // Handle press on link to privacy policy
  const handleLinkPress = () => {
    Linking.openURL("https://kebijakan-privasi-gizify.vercel.app/");
  };

  // Handle form submit for login/register
  const handleSubmit = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Email dan password harus diisi");
    }

    if (!isLogin) {
      if (!agree) return Alert.alert("Error", "Anda harus menyetujui syarat dan ketentuan");
      if (!name) return Alert.alert("Error", "Nama lengkap harus diisi");
      if (password !== confirmPassword) return Alert.alert("Error", "Password tidak cocok");
      if (password.length < 6) return Alert.alert("Error", "Password minimal 6 karakter");
    }

    try {
      if (isLogin) {
        // Dispatch login action
        await dispatch(loginUser(email, password) as any);
      } else {
        // Dispatch register action and navigate to StartScreen
        await dispatch(registerUser(email, password, name) as any);
        navigation.replace("StartScreen");
        // Reset form fields
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {/* App Logo and Auth Mode Switch (Login/Register) */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo/Logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.switchContainer}>
          {/* Login Tab */}
          <TouchableOpacity
            style={[styles.switchBtn, isLogin && styles.activeBtn]}
            onPress={() => setIsLogin(true)}
            disabled={loading}
          >
            <Text style={[styles.switchText, isLogin && styles.activeText]}>Masuk</Text>
          </TouchableOpacity>
          {/* Register Tab */}
          <TouchableOpacity
            style={[styles.switchBtn, !isLogin && styles.activeBtn]}
            onPress={() => setIsLogin(false)}
            disabled={loading}
          >
            <Text style={[styles.switchText, !isLogin && styles.activeText]}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Animated Form Section */}
      <Animated.View
        layout={Layout.duration(500).easing(Easing.out(Easing.exp))}
        entering={FadeInDown.duration(400)}
        exiting={FadeOutUp.duration(300)}
        style={styles.form}
      >
        {/* Full Name input (only in register mode) */}
        {!isLogin && (
          <TextInput
            placeholder="Nama Lengkap"
            placeholderTextColor="#888"
            style={styles.input}
            value={name}
            onChangeText={setName}
            editable={!loading}
          />
        )}

        {/* Email input */}
        <TextInput
          placeholder="Masukkan Email"
          placeholderTextColor="#888"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        {/* Password input */}
        <TextInput
          placeholder="Masukkan Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        {/* Forgot password link (only in login mode) */}
        {isLogin && (
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen")}>
            <Text style={styles.forgotText}>Lupa Password?</Text>
          </TouchableOpacity>
        )}

        {/* Confirm password input (only in register mode) */}
        {!isLogin && (
          <TextInput
            placeholder="Konfirmasi Password"
            placeholderTextColor="#888"
            secureTextEntry
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!loading}
          />
        )}

        {/* Agreement checkbox (only in register mode) */}
        {!isLogin && (
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={agree}
              onValueChange={setAgree}
              color="#00aaff"
              disabled={loading}
            />
            <Text style={styles.agreeText}>
              Saya telah membaca dan menyetujui
              <TouchableOpacity onPress={handleLinkPress}>
                <Text style={styles.link}> syarat dan kebijakan privasi</Text>
              </TouchableOpacity>
            </Text>
          </View>
        )}

        {/* Submit button */}
        <Pressable
          style={[styles.submitBtn, loading && styles.disabledBtn]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>{isLogin ? "Masuk" : "Daftar"}</Text>
          )}
        </Pressable>

        {/* Error message from Redux */}
        {error && (
          <Text style={styles.errorText}>
            {typeof error === "string" ? error : error?.message || "Terjadi kesalahan"}
          </Text>
        )}
      </Animated.View>
    </View>
  );
};

export default LoginRegisterScreen;

// Styles for login/register screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 150,
    height: 50,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
    borderColor: "#aaa",
    width: "100%",
    maxWidth: 300,
    alignSelf: "center",
  },
  switchBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  switchText: {
    fontSize: 16,
    color: "#226655",
  },
  activeBtn: {
    backgroundColor: "#297B77",
  },
  activeText: {
    color: "white",
    fontWeight: "bold",
  },
  form: {
    marginTop: 16,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 14,
    color: "#000",
  },
  forgotText: {
    textAlign: "right",
    color: "#666",
    fontWeight: "500",
    fontSize: 13,
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  agreeText: {
    marginLeft: 8,
    flex: 1,
    fontSize: 13,
    color: "#333",
  },
  link: {
    color: "#007bff",
  },
  submitBtn: {
    backgroundColor: "#297B77",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  disabledBtn: {
    opacity: 0.7,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});