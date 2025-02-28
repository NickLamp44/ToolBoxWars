// will contain the main Merhcandise  page where a user can see the most ToolBox Wars Merch and collab tools . Would we want to use shopify to simiplify the shopping portion of this page?

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase"; // Firebase setup

const MerchScreen = () => {
  const [merch, setMerch] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMerch = async () => {
      try {
        const merchQuery = collection(db, "Merch");
        const querySnapshot = await getDocs(merchQuery);
        const merchData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMerch(merchData);
        setLoading(false);
      } catch (error) {
        console.error("🔥 Error fetching merch:", error);
        setLoading(false);
      }
    };

    fetchMerch();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToolBoxWars Merch & Collabs 🏁</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={merch}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.merchItem}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.merchTitle}>{item.name}</Text>
              <Text style={styles.merchPrice}>${item.price}</Text>
              <TouchableOpacity
                style={styles.buyButton}
                onPress={() => alert("Redirecting to Shopify...")}
              >
                <Text style={styles.buttonText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

// 🔹 Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 15 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 15,
  },
  merchItem: {
    flex: 1,
    backgroundColor: "#1F1F1F",
    padding: 10,
    borderRadius: 10,
    margin: 5,
    alignItems: "center",
  },
  image: { width: 120, height: 120, borderRadius: 10, marginBottom: 5 },
  merchTitle: { fontSize: 16, color: "#FFFFFF", fontWeight: "bold" },
  merchPrice: { fontSize: 14, color: "#BBBBBB", marginBottom: 5 },
  buyButton: { backgroundColor: "#4CAF50", padding: 8, borderRadius: 5 },
  buttonText: { color: "#FFFFFF", fontWeight: "bold" },
});

export default MerchScreen;
