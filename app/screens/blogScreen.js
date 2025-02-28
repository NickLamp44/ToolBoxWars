// will contain the main blog post page where a user can see the most recent blogposts as well as sort them by (Date Posted, author, etc) There will then be the blog topic filters of ( View all , only Social Media Posts, Blogs, How To's, or Maintenance)

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../services/firebase"; // Firebase setup

const BlogScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("datePosted"); // Default sort by Date
  const [filter, setFilter] = useState("All"); // Default to 'All' topics

  // Fetch Blog Posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let blogQuery = query(collection(db, "Blogs"), orderBy(sortBy, "desc"));

        // Apply category filter
        if (filter !== "All") {
          blogQuery = query(
            collection(db, "Blogs"),
            where("category", "==", filter),
            orderBy(sortBy, "desc")
          );
        }

        const querySnapshot = await getDocs(blogQuery);
        const blogData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(blogData);
        setLoading(false);
      } catch (error) {
        console.error("🔥 Error fetching blog posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [sortBy, filter]); // Re-run on sort/filter change

  // Sorting Options
  const sortOptions = ["datePosted", "author"];

  // Blog Categories
  const categories = [
    "All",
    "Social Media Posts",
    "Blogs",
    "How-To's",
    "Maintenance",
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>ToolBoxWars Blogs 🏁</Text>

      {/* Sorting Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.filterText}>Sort By:</Text>
        {sortOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.sortButton,
              sortBy === option && styles.activeButton,
            ]}
            onPress={() => setSortBy(option)}
          >
            <Text style={styles.buttonText}>
              {option.replace(/([A-Z])/g, " $1")}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Category Filter */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Filter By:</Text>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === item && styles.activeButton,
              ]}
              onPress={() => setFilter(item)}
            >
              <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Blog List */}
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postMeta}>
                📝 {item.author} | 📅{" "}
                {new Date(item.datePosted.toDate()).toLocaleDateString()}
              </Text>
              <Text style={styles.postExcerpt}>{item.excerpt}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

// 🔹 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 15,
  },
  sortContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  filterText: {
    color: "#FFFFFF",
    marginRight: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  sortButton: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  filterButton: {
    backgroundColor: "#444",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  post: {
    backgroundColor: "#1F1F1F",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 5,
  },
  postMeta: {
    fontSize: 14,
    color: "#BBBBBB",
    marginBottom: 5,
  },
  postExcerpt: {
    fontSize: 16,
    color: "#DDDDDD",
  },
});

export default BlogScreen;
