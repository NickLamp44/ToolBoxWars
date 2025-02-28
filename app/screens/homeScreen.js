import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Navigation Bar */}
      <View style={styles.navBar}>
        {[
          { name: "Home", screen: "Home" },
          { name: "Blog", screen: "Blog" },
          { name: "Showcase", screen: "Showcase" },
          { name: "Merch", screen: "Merch" },
          { name: "Profile", screen: "Profile" },
        ].map((item) => (
          <TouchableOpacity
            key={item.screen}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text style={styles.navItem}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🔹 Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Welcome to ToolBoxWars!</Text>
        <Text style={styles.subtitle}>
          Your ultimate resource for everything Mech-related.
        </Text>

        {/* 🔹 Placeholder Sections for Future Content */}
        {[
          {
            title: "Latest Blogs",
            content: "Stay updated with the latest trends.",
          },
          {
            title: "Showcase",
            content: "Check out amazing builds from the community.",
          },
          { title: "Merch", content: "Dive deep into Merch for Mechanics." },
        ].map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// 🔹 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#1F1F1F",
  },
  navItem: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#BBBBBB",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  section: {
    backgroundColor: "#1F1F1F",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: "#BBBBBB",
  },
});

export default HomeScreen;
