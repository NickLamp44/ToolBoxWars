import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Screens
import HomeScreen from "../screens/homeScreen";
import BlogScreen from "../screens/blogScreen";
import ShowCaseScreen from "../screens/showCaseScreen";
import MerchScreen from "../screens/merchScreen";
import ProfileScreen from "../screens/profileScreen";
import LoginScreen from "../screens/loginScreen";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const auth = getAuth(); // Initialize Firebase Auth

// 🔹 Logout Screen
const LogoutScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login"); // Ensure LoginScreen is registered in the navigator
    } catch (error) {
      console.error("🔥 Error logging out:", error);
    }
  };

  return (
    <View style={styles.logoutContainer}>
      <Text style={styles.logoutText}>Are you sure you want to log out?</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// 🔹 Bottom Tab Navigator (Main Navigation)
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: "home",
            Blog: "newspaper-outline",
            Showcase: "images-outline",
            Merch: "cart-outline",
            Profile: "person-circle-outline",
          };
          return (
            <Ionicons name={icons[route.name]} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Blog" component={BlogScreen} />
      <Tab.Screen name="Showcase" component={ShowCaseScreen} />
      <Tab.Screen name="Merch" component={MerchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// 🔹 Drawer Navigator
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: "#4CAF50",
        drawerInactiveTintColor: "gray",
      }}
    >
      <Drawer.Screen name="Main" component={TabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

// 🔹 Stack Navigator
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// 🔹 Main App Navigator with Authentication Handling
const AppNavigator = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return null; // Optional: Add a loading spinner

  return (
    <NavigationContainer>
      {user ? <StackNavigator /> : <LoginScreen />}
    </NavigationContainer>
  );
};

// 🔹 Styles
const styles = {
  logoutContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  logoutText: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
};

export default AppNavigator;
