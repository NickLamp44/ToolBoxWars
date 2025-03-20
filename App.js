import React, { useEffect, useState } from "react";
import { Alert, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app/navigation/appNavigator";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { auth, db, storage } from "./app/services/firebase"; // Ensure path is correct

const App = () => {
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  const connectionStatus = useNetInfo();

  useEffect(() => {
    console.log("🔥 Checking Firebase...");
    console.log("✅ Firestore:", db);
    console.log("✅ Auth:", auth);
    console.log("✅ Storage:", storage);

    if (!auth || !db || !storage) {
      console.error("🚨 Firebase services not loaded correctly!");
      return;
    }

    setIsFirebaseReady(true); // Firebase is ready
  }, []);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("⚠️ Connection lost!", "Please check your internet.");
    }
  }, [connectionStatus.isConnected]);

  // Show a loading screen if Firebase is not yet ready
  if (!isFirebaseReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>🔥 Initializing Firebase...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator
        db={db}
        storage={storage}
        auth={auth}
        isConnected={connectionStatus.isConnected}
      />
    </NavigationContainer>
  );
};

export default App;
