import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  async function fetchProductDetails() {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);

      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleAddToCart() {
    if (!product) {
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      }),
    );

    alert("Product added to cart");
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.header}>Product Details</Text>

        <ScrollView style={styles.contentBox}>
          <Image source={{ uri: product.image }} style={styles.image} />

          <Text style={styles.title}>{product.title}</Text>

          <Text style={styles.price}>Price: ${product.price}</Text>

          <Text style={styles.rating}>
            Rating: {product.rating.rate} / 5 ({product.rating.count} reviews)
          </Text>

          <Text style={styles.description}>{product.description}</Text>
        </ScrollView>

        <View style={styles.buttonRow}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Back</Text>
          </Pressable>

          <Pressable style={styles.cartButton} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    width: "90%",
    height: "90%",
    backgroundColor: "white",
    padding: 10,
    borderWidth: 2,
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

  contentBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#333",
    padding: 12,
  },

  image: {
    width: "100%",
    height: 180,
    resizeMode: "contain",
    marginBottom: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  price: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },

  rating: {
    fontSize: 13,
    marginBottom: 10,
  },

  description: {
    fontSize: 13,
    lineHeight: 19,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },

  backButton: {
    flex: 1,
    backgroundColor: "#1976d2",
    padding: 10,
    alignItems: "center",
  },

  cartButton: {
    flex: 1,
    backgroundColor: "#1976d2",
    padding: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
