// will contain the User Profile page that will contain ( if they are logged in ) Their Name (f & L ) Username, Birthdate * , Email, Home * (Town,City,State,region,County)

// any contents followed by a star are optional
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase"; // Firebase setup

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "Users", currentUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        }
      } catch (error) {
        console.error("🔥 Error fetching user data:", error);
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#4CAF50" />;

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>👤 {user.userName}</Text>
          <Text style={styles.info}>📧 {user.email}</Text>
          {user.firstName && user.lastName && (
            <Text style={styles.info}>
              📝 {user.firstName} {user.lastName}
            </Text>
          )}
          {user.birthdate && (
            <Text style={styles.info}>🎂 {user.birthdate}</Text>
          )}
          {user.home && <Text style={styles.info}>📍 {user.home}</Text>}
        </>
      ) : (
        <Text style={styles.info}>Please log in to view your profile.</Text>
      )}
    </View>
  );
};

// 🔹 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  info: { fontSize: 16, color: "#BBBBBB", marginBottom: 5 },
});

export default ProfileScreen;
