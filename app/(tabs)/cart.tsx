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
        <Text style={styles.header}>Shopping Cart</Text>
        <Text style={styles.emptyText}>Your shopping cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping Cart</Text>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>Items: {totalItems}</Text>
        <Text style={styles.summaryText}>
          Total Price: ${totalPrice.toFixed(2)}
        </Text>
      </View>

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

                <Text style={styles.quantity}>Quantity: {item.quantity}</Text>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    backgroundColor: "#3fa7d6",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  emptyText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
  },
  summaryBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#3fa7d6",
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  summaryText: {
    color: "white",
    fontWeight: "bold",
  },
  cartItem: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#999",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
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
    fontSize: 13,
  },
  price: {
    color: "green",
    fontWeight: "bold",
    marginVertical: 4,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  quantityButton: {
    backgroundColor: "green",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  quantity: {
    fontWeight: "bold",
  },
});
