import { addOrderIntent, updateCart } from "@/API";
import { delete_Icon } from "@/assets/images";
import EmptyCart from "@/component/emptyCart";
import ConfirmModal from "@/component/global/DeleteModal";
import ThemedText from "@/component/global/ThemedText";
import ThemedTextOpposite from "@/component/global/ThemedTextOpposite";
import ThemedView from "@/component/global/ThemedView";
import ThemedViewOpposite from "@/component/global/ThemedViewOpposite";
import { Colors } from "@/constants/Colors";
import { useCartContext } from "@/contexts/CartContext";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import {
  currencyFormatter,
  errorNotification,
  infoNotification,
  successNotification,
} from "@/utils/helpers";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartOrder() {
  const [selected, setSelected] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [submitting, setsubmitting] = useState(false);

  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const glStyles = globalStyles();
  const { getFromCart, deleteCartItem } = useCartContext();
  const router = useRouter();
  const [refetch, setRefetch] = useState(false);
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   setRefetch(!refetch);
  // }, [isFocused]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const result = await getFromCart();
        setCartItems(result);
      } catch (err) {
        console.log("Error fetching cart:", err);
        setCartItems({ items: [] });
      }
    };
    fetchCartData();
  }, [getFromCart, refetch, isFocused]);

  const calculateTotalPrice = () =>
    cartItems?.items?.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
      0
    );

  const totalPrice = calculateTotalPrice();
  // const totalPrice = 300;

  const handleOrderIntent = async () => {
    setsubmitting(true);
    const storedToken = await AsyncStorage.getItem("authToken");
    if (!storedToken) {
      infoNotification("Please login first to checkout");
    } else {
      try {
        const res = await addOrderIntent({
          totalAmount: cartItems?.summary?.subtotal,
        });
        console.log("res", res?.data);
        if (res?.status?.toString().includes("20")) {
          const clientSecret = String(res?.data?.clientSecret);
          router.push({
            pathname: "/cart-checkout",
            params: { clientSecret },
          });
        } else {
          errorNotification("Failed to create order intent.");
        }
      } catch (error) {
        console.error(error);
        errorNotification("Something went wrong creating order intent.");
      }
    }
    setsubmitting(false);
  };

  const handleDeleteItem = async () => {
    try {
      // Get selected product IDs
      const selectedIds = Object.keys(selected).filter((id) => selected[id]);

      // Case 1: No items selected
      if (selectedIds.length === 0) {
        errorNotification("Please select at least one item to delete.");
        return;
      }

      // Case 2: Delete all selected
      await Promise.all(
        selectedIds.map(async (pid) => {
          const itemToDelete = cartItems?.items.find(
            (i) => i.productId === pid
          );
          if (itemToDelete) {
            await deleteCartItem(
              itemToDelete.productId,
              itemToDelete.size,
              itemToDelete.color
            );
          }
        })
      );

      // Update UI after deletion
      // setCartItems((prev) => {
      //   let its = prev?.items.filter(
      //     (item) => !selectedIds.includes(item.productId)
      //   );
      //   return { items: its };
      // });
      setRefetch(!refetch);
      setSelected({});
      successNotification("Selected items deleted successfully.");
    } catch (error) {
      console.error("Error deleting items:", error);
      errorNotification("Failed to delete selected items.");
    }
  };

  const toggleSelect = (productId) => {
    setSelected((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedItem = cartItems?.items.find(
      (item) => item.productId === productId
    );
    if (!updatedItem) return;

    try {
      // setCartItems((prev) => {
      //   let its = prev?.items.map((item) =>
      //     item.productId === productId
      //       ? { ...item, quantity: newQuantity }
      //       : item
      //   );
      //   return {
      //     items: its,
      //   };
      // });

      await updateCart({
        productId: updatedItem.productId,
        quantity: newQuantity,
      });
      setRefetch(!refetch);
    } catch (error) {
      console.error(error);
      errorNotification("Failed to update quantity");
    }
  };

  const addQuantity = (productId) => {
    const item = cartItems?.items.find((item) => item.productId === productId);
    if (item) updateQuantity(productId, item.quantity + 1);
  };

  const removeQuantity = (productId) => {
    const item = cartItems?.items.find((item) => item.productId === productId);
    if (item && item.quantity > 1) updateQuantity(productId, item.quantity - 1);
  };

  const CartItem = ({ item }) => (
    <ThemedView style={[styles.cartBox, { shadowColor: theme.shadowColor }]}>
      <Pressable
        onPress={() => toggleSelect(item.productId)}
        style={[
          styles.circleCheckbox,
          { borderColor: theme.title },
          selected[item.productId] && {
            borderColor: theme.title,
            // backgroundColor: theme.navBackground,
          },
        ]}
      >
        {selected[item.productId] && (
          <View
            style={[styles.innerCircle, { backgroundColor: theme.title }]}
          />
        )}
      </Pressable>

      <Pressable onPress={() => toggleSelect(item.productId)}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </Pressable>

      <View style={[styles.productDetails]}>
        <ThemedText style={styles.productName}>{item.productName}</ThemedText>
        <ThemedText type="text" style={styles.brand}>
          {item.brandName}
        </ThemedText>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <ThemedText style={styles.price}>
            {currencyFormatter(item.price)}
          </ThemedText>
          <View style={styles.quantityControls}>
            <AntDesign
              name="minus-circle"
              size={20}
              color={theme.text}
              onPress={() => removeQuantity(item.productId)}
            />
            <ThemedText style={styles.quantityText}>{item.quantity}</ThemedText>
            <AntDesign
              name="plus-circle"
              size={20}
              color={theme.text}
              onPress={() => addQuantity(item.productId)}
            />
          </View>
        </View>
      </View>
    </ThemedView>
  );

  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />

      <View style={[styles.container]}>
        <View style={[styles.header]}>
          <AntDesign
            name="arrow-left"
            size={24}
            color={theme.title}
            onPress={() => router.back()}
          />
          <ThemedText style={styles.headerText}>Cart</ThemedText>
          <Pressable onPress={() => setShowDeleteModal(true)}>
            {cartItems?.items?.length ? (
              <Image source={delete_Icon} resizeMode="contain" />
            ) : (
              <View />
            )}
          </Pressable>
        </View>

        {/* Delete Modal */}
        <ConfirmModal
          visible={showDeleteModal}
          title="Confirm Action"
          message="Are you sure you want to delete selected items?"
          confirmText="Delete"
          cancelText="Cancel"
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={async () => {
            await handleDeleteItem();
            setShowDeleteModal(false);
          }}
        />

        {/* Cart List */}
        {cartItems?.items?.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <FlatList
              data={cartItems?.items}
              keyExtractor={(item, index) => `${item.productId}_${index}`}
              scrollEnabled={true}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <CartItem item={item} />}
              ListFooterComponent={
                <>
                  <View style={[styles.footer]}>
                    <ThemedText style={{ fontSize: 19 }}>Total</ThemedText>
                    <ThemedText style={styles.totalAmount}>
                      {cartItems?.summary?.subtotal
                        ? currencyFormatter(cartItems?.summary?.subtotal)
                        : currencyFormatter(totalPrice)}
                    </ThemedText>
                  </View>

                  <Pressable onPress={submitting ? null : handleOrderIntent}>
                    <ThemedViewOpposite style={styles.checkoutButton}>
                      <ThemedTextOpposite>
                        {submitting ? "Working on it..." : "Checkout"}
                      </ThemedTextOpposite>
                    </ThemedViewOpposite>
                  </Pressable>
                </>
              }
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollContent: {
    gap: 6,
    paddingBottom: 100,
  },
  cartBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 7.84,
    elevation: 1,
    margin: 10,
  },
  circleCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 6,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    resizeMode: "cover",
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  brand: {
    fontSize: 13,
  },
  price: {
    fontSize: 15,
    fontWeight: 600,
    marginVertical: 4,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 8,
    gap: 10,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 600,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 25,
    paddingHorizontal: 10,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 600,
  },
  checkoutButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});
