import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  registerUser,
  signInWithGoogle,
  signInWithFacebook,
} from "../services/firebaseAuth";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onHandleSignUp = async () => {
    if (!email || !password || !userName) {
      Alert.alert("⚠️ Error", "Please fill in all fields.");
      return;
    }

    try {
      await registerUser(userName, email, password);
      Alert.alert("✅ Success!", "Account created!");
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("❌ Signup Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        autoCapitalize="none"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={onHandleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity
        style={[styles.button, styles.googleButton]}
        onPress={signInWithGoogle}
      >
        <Text style={styles.buttonText}>Sign Up with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.facebookButton]}
        onPress={signInWithFacebook}
      >
        <Text style={styles.buttonText}>Sign Up with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Already have an account? Log in</Text>
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
    paddingHorizontal: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#444",
    marginBottom: 20,
  },
  input: {
    width: "90%",
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
    backgroundColor: "#6391b7",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
    marginVertical: 5,
  },
  googleButton: {
    backgroundColor: "#DB4437",
  },
  facebookButton: {
    backgroundColor: "#4267B2",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loginText: {
    marginTop: 10,
    fontSize: 16,
    color: "#444",
  },
});
