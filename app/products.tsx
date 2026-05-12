import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function ProductsScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  async function fetchProducts() {
    try {
      setLoading(true);

      const response = await fetch(
        `https://fakestoreapi.com/products/category/${category}`,
      );

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.header}>{category}</Text>

        <View style={styles.contentBox}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator
              renderItem={({ item }) => (
                <Pressable
                  style={styles.card}
                  onPress={() =>
                    router.push({
                      pathname: "/product-details",
                      params: { id: item.id.toString() },
                    })
                  }
                >
                  <Image source={{ uri: item.image }} style={styles.image} />

                  <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={2}>
                      {item.title}
                    </Text>

                    <Text style={styles.price}>Price: ${item.price}</Text>
                  </View>
                </Pressable>
              )}
            />
          )}
        </View>

        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    width: "90%",
    height: "90%",
    backgroundColor: "white",
    padding: 10,
    borderWidth: 2,
    borderColor: "#222",
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
    textTransform: "capitalize",
  },

  contentBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#333",
    padding: 10,
  },

  card: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#666",
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "white",
  },

  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginRight: 10,
  },

  info: {
    flex: 1,
  },

  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },

  price: {
    fontSize: 12,
  },

  backButton: {
    backgroundColor: "#1976d2",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },

  backText: {
    color: "white",
    fontWeight: "bold",
  },
});
