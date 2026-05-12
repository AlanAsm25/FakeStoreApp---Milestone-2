import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSelector } from "react-redux";

export default function TabLayout() {
  const cartItems = useSelector((state: any) => state.cart.items);

  const totalQuantity = cartItems.reduce(
    (total: number, item: any) => total + item.quantity,
    0,
  );

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Products",
          headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Shopping Cart",
          headerShown: false,

          tabBarBadge: totalQuantity > 0 ? totalQuantity : undefined,

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
