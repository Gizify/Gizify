import React, { useState } from "react";
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, Alert, ActivityIndicator } from "react-native";
import Animated, { FadeInDown, FadeOutUp, Layout, Easing } from "react-native-reanimated";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthStackNavigator";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/actions/authAction";

type NavigationProps = NativeStackNavigationProp<AuthStackParamList>;

const LoginRegisterScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: any) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [agree, setAgree] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (!agree) {
      return Alert.alert("Error", "Anda harus menyetujui syarat dan ketentuan");
    }

    if (!email || !password) {
      return Alert.alert("Error", "Email dan password harus diisi");
    }

    if (!isLogin) {
      if (!name) {
        return Alert.alert("Error", "Nama lengkap harus diisi");
      }
      if (password !== confirmPassword) {
        return Alert.alert("Error", "Password tidak cocok");
      }
      if (password.length < 6) {
        return Alert.alert("Error", "Password minimal 6 karakter");
      }
    }

    try {
      if (isLogin) {
        await dispatch(loginUser(email, password) as any);
        navigation.replace("HomeScreen");
      } else {
        await dispatch(registerUser(email, password, name) as any);
        Alert.alert("Sukses", "Registrasi berhasil! Silakan login");
        navigation.replace("VerifyDataScreen");
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
      {/* Logo & Switch */}
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/logo/Logo.png")} style={styles.logo} resizeMode="contain" />
        <View style={styles.switchContainer}>
          <TouchableOpacity style={[styles.switchBtn, isLogin && styles.activeBtn]} onPress={() => setIsLogin(true)} disabled={loading}>
            <Text style={[styles.switchText, isLogin && styles.activeText]}>Masuk</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.switchBtn, !isLogin && styles.activeBtn]} onPress={() => setIsLogin(false)} disabled={loading}>
            <Text style={[styles.switchText, !isLogin && styles.activeText]}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Animated Form */}
      <Animated.View layout={Layout.duration(500).easing(Easing.out(Easing.exp))} entering={FadeInDown.duration(400)} exiting={FadeOutUp.duration(300)} style={styles.form}>
        {!isLogin && <TextInput placeholder="Nama Lengkap" style={styles.input} value={name} onChangeText={setName} editable={!loading} />}
        <TextInput placeholder="Masukkan Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" editable={!loading} />
        <TextInput placeholder="Masukkan Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} editable={!loading} />
        {!isLogin && <TextInput placeholder="Konfirmasi Password" secureTextEntry style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} editable={!loading} />}

        <View style={styles.checkboxContainer}>
          <Checkbox value={agree} onValueChange={setAgree} color="#00aaff" disabled={loading} />
          <Text style={styles.agreeText}>
            Saya telah membaca dan menyetujui <Text style={styles.link}>syarat dan ketentuan</Text> dan <Text style={styles.link}>kebijakan privasi</Text>
          </Text>
        </View>

        {/* Submit Button */}
        <Pressable style={[styles.submitBtn, loading && styles.disabledBtn]} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>{isLogin ? "Masuk" : "Daftar"}</Text>}
        </Pressable>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </Animated.View>
    </View>
  );
};

export default LoginRegisterScreen;

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
    backgroundColor: "#226655",
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
  },
  forgotText: {
    textAlign: "right",
    color: "#444",
    fontWeight: "bold",
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
    textDecorationLine: "underline",
  },
  submitBtn: {
    backgroundColor: "#226655",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#00ffaa",
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
