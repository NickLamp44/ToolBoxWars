import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInAnonymously } from "firebase/auth";

import BlogCard from "../components/blogCard";

const HomeScreen = () => {
  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#090C08");
  const navigation = useNavigation();
  const auth = getAuth();

  const signInUser = async () => {
    if (!name.trim()) {
      Alert.alert("⚠️ Error", "Please enter a name before proceeding.");
      return;
    }

    try {
      const result = await signInAnonymously(auth);
      navigation.replace("Chat", {
        userID: result.user.uid,
        name: name,
        backgroundColor: backgroundColor,
      });
      Alert.alert("✅ Success", "Signed in as a guest!");
    } catch (error) {
      console.error("🔥 Error during anonymous sign-in:", error);
      Alert.alert("❌ Sign-in Failed", "Please try again later.");
    }
  };

  // Handle Enter key submission for better UX
  const handleKeyPress = (e) => {
    if (e.nativeEvent.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      signInUser();
    }
  };

  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to ToolBox Wars!</Text>
      </View>
      <BlogCard />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: "20%",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 40,
  },
  inputContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "88%",
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#757083",
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.8,
  },
  colorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    marginBottom: 10,
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: "#000",
  },
  button: {
    backgroundColor: "#757083",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginVertical: 5,
  },
  loginButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default HomeScreen;
