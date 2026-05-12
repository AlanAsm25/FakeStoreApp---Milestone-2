import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CategoryScreen() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories",
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.header}>Categories</Text>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          categories.map((cat) => (
            <Pressable
              key={cat}
              style={styles.button}
              onPress={() =>
                router.push({
                  pathname: "/products",
                  params: { category: cat },
                })
              }
            >
              <Text style={styles.text}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
            </Pressable>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  box: {
    width: "99%",
    height: "90%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#222",
    padding: 10,
  },

  header: {
    textAlign: "center",
    backgroundColor: "#3fa0cf",
    color: "white",
    padding: 10,
    fontWeight: "bold",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#333",
  },

  button: {
    backgroundColor: "#dddddd",
    paddingVertical: 14,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: "#444",
    borderRadius: 3,
    alignItems: "center",
    width: "86%",
    alignSelf: "center",
  },

  text: {
    fontSize: 20,
    color: "#1976d2",
    fontWeight: "bold",
  },
});
