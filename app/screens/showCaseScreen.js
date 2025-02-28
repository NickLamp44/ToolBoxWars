// will contain the main showCase post page where a user can see the most recent showCase Cycling Tool Box build that are entered by the community... every year we do a Tool Box of the Year award and other awards as well as sort them by (Date Posted, author, etc) There will then be the blog topic filters of ( View all , Past Winners of TBOY , ShowCase blog posts, etc )

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
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../services/firebase"; // Firebase setup

const ShowCaseScreen = () => {
  const [showcases, setShowcases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchShowcases = async () => {
      try {
        let showcaseQuery = query(
          collection(db, "Showcases"),
          orderBy("datePosted", "desc")
        );
        if (filter !== "All") {
          showcaseQuery = query(
            collection(db, "Showcases"),
            where("category", "==", filter),
            orderBy("datePosted", "desc")
          );
        }

        const querySnapshot = await getDocs(showcaseQuery);
        const showcaseData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setShowcases(showcaseData);
        setLoading(false);
      } catch (error) {
        console.error("🔥 Error fetching showcases:", error);
        setLoading(false);
      }
    };

    fetchShowcases();
  }, [filter]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToolBoxWars Showcases 🚲</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={showcases}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postMeta}>
                🏆 {item.author} | 📅{" "}
                {new Date(item.datePosted.toDate()).toLocaleDateString()}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ShowCaseScreen;
