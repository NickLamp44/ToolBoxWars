import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  loginUserWithEmail,
  loginUserWithUsername,
  signInWithGoogle,
  signInWithFacebook,
} from "../services/firebaseAuth";
import { getAuth, signInAnonymously } from "firebase/auth";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = async () => {
    if (!input || !password) {
      Alert.alert(
        "❌ Error",
        "Please enter your Username or Email and Password."
      );
      return;
    }

    try {
      const isEmail = input.includes("@");
      if (isEmail) {
        await loginUserWithEmail(input, password);
      } else {
        await loginUserWithUsername(input, password);
      }
      console.log("✅ Login Successful");
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert("❌ Login Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Email or Username"
        autoCapitalize="none"
        value={input}
        onChangeText={setInput}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button onPress={onHandleLogin} color="#444daf" title="Login" />

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
        <AntDesign name="google" size={24} color="white" />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.facebookButton}
        onPress={signInWithFacebook}
      >
        <FontAwesome name="facebook" size={24} color="white" />
        <Text style={styles.buttonText}>Sign in with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => signInAnonymously(getAuth())}
      >
        <Text style={styles.buttonText}>Continue as Guest</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

/** Styles **/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#444",
    paddingBottom: 24,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    padding: 12,
  },
  orText: {
    fontSize: 16,
    color: "#444",
    marginVertical: 15,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#757083",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DB4437",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    justifyContent: "center",
    marginBottom: 10,
  },
  facebookButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3b5998",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  signupText: {
    marginTop: 10,
    fontSize: 16,
    color: "#444",
  },
});
