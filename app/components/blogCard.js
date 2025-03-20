
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const BlogCard = ({ blogId }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        console.log(`Fetching blog data for ID: ${blogId}`);
        const blogRef = doc(db, "blogs", blogId);
        const blogSnap = await getDoc(blogRef);

        if (blogSnap.exists()) {
          setBlog(blogSnap.data());
        } else {
          setError("Blog post not found.");
        }
      } catch (err) {
        console.error("🔥 Error fetching blog data:", err);
        setError("Failed to load blog post.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [blogId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.card}>
      {blog?.imageUrl && (
        <Image source={{ uri: blog.imageUrl }} style={styles.image} />
      )}
      <Text style={styles.title}>{blog?.title || "Untitled Blog"}</Text>
      <Text style={styles.author}>By {blog?.author || "Unknown Author"}</Text>
      <Text style={styles.category}>
        Category: {blog?.category || "General"}
      </Text>
      <Text style={styles.date}>
        Published:{" "}
        {blog?.postDate ? new Date(blog.postDate).toDateString() : "N/A"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  author: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  category: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#777",
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default BlogCard;
