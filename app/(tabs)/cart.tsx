import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { decreaseQuantity, increaseQuantity } from "../../store/cartSlice";

export default function CartScreen() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: any) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total: number, item: any) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.box}>
          <Text style={styles.header}>Shopping Cart</Text>

          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Your shopping cart is empty</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.header}>Shopping Cart</Text>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>Items: {totalItems}</Text>

          <Text style={styles.summaryText}>
            Total Price: ${totalPrice.toFixed(2)}
          </Text>
        </View>

        <View style={styles.listBox}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={styles.info}>
                  <Text numberOfLines={2} style={styles.title}>
                    {item.title}
                  </Text>

                  <Text style={styles.price}>${item.price}</Text>

                  <View style={styles.quantityRow}>
                    <Pressable
                      style={styles.quantityButton}
                      onPress={() => dispatch(decreaseQuantity(item.id))}
                    >
                      <Ionicons name="remove" size={16} color="white" />
                    </Pressable>

                    <Text style={styles.quantity}>
                      Quantity: {item.quantity}
                    </Text>

                    <Pressable
                      style={styles.quantityButton}
                      onPress={() => dispatch(increaseQuantity(item.id))}
                    >
                      <Ionicons name="add" size={16} color="white" />
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
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
    padding: 10,
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: "#eeeeee",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
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
  },

  emptyBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  summaryBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#dddddd",
    padding: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#333",
  },

  summaryText: {
    fontWeight: "bold",
  },

  listBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#333",
    padding: 10,
  },

  cartItem: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#666",
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
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
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 8,
  },

  price: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    color: "green",
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  quantityButton: {
    backgroundColor: "#1976d2",
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  quantity: {
    fontWeight: "bold",
  },
});
