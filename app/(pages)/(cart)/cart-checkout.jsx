import { addOrder, fetchCart, fetchShippingAddresses } from "@/API";
import { flutterwave, paystack, stripe } from "@/assets/images";
import NormalText from "@/component/global/NormalText";
import ThemedAddressOpposite from "@/component/global/ThemeAddressOpposite";
import ThemedText from "@/component/global/ThemedText";
import ThemedTextOpposite from "@/component/global/ThemedTextOpposite";
import ThemedViewOpposite from "@/component/global/ThemedViewOpposite";
import { Colors } from "@/constants/Colors";
import { useCartContext } from "@/contexts/CartContext";
import { userUserContext } from "@/contexts/UserContext";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import {
  currencyFormatter,
  errorNotification,
  successNotification,
} from "@/utils/helpers";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useStripe } from "@stripe/stripe-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Checkout() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const { clientSecret } = useLocalSearchParams();
  const glStyles = globalStyles();
  const [selected, setSelected] = useState({});
  const [cart, setCart] = useState([]);
  const [shippingAddress, setshippingAddress] = useState();
  const router = useRouter();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const { shippingAddressData, shippingAddressLoading } =
    fetchShippingAddresses();

  useEffect(() => {
    if (shippingAddressData) {
      let data = shippingAddressData?.data?.filter(
        (ele) => ele.isDefault === true
      )[0];
      setshippingAddress(data);
    }
  }, [shippingAddressData]);

  const toggleSelect = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);
  const { cartData, cartLoading } = fetchCart();

  useEffect(() => {
    if (cartData?.items) {
      setCartItems(cartData.items);
      const calculateTotalPrice = () =>
        cartData?.items.reduce(
          (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
          0
        );
      // const calculateDiscount= () =>
      //   cartData?.items.reduce(
      //     (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
      //     0
      //   );
      const tp = calculateTotalPrice();
      settotalPrice(tp);
    }
  }, [cartData]);

  const { getFromCart, clearCartItems } = useCartContext();
  const { getFromUser } = userUserContext();

  useEffect(() => {
    const fetchData = async () => {
      const cartResponse = await getFromCart();
      setCart(cartResponse);
    };
    fetchData();
  }, []);

  const setup = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Marse",
      paymentIntentClientSecret: clientSecret, // retrieve this from your server
    });
    if (error) {
      console.log("stripe setup error", error);
      // handle error
    }
  };

  useEffect(() => {
    setup();
  }, []);

  const handleCheckout = async () => {
    if (!shippingAddress) {
      errorNotification("Kindly provide the shipping address first");
    } else {
      const { error } = await presentPaymentSheet();

      if (error) {
        console.log("stripe setup error", error);
        // handle error
      } else {
        console.log("Order successful!");
        handleItemOrder();
        // success
      }
    }
  };

  const handleItemOrder = async () => {
    if (!cart || cart.length === 0) {
      console.log("Cart is empty. Cannot place order.");
      return;
    }

    const orderPayload = {
      clientSecret,
      items: cart?.map((item) => ({
        productId: item.productId,
        sellerId: item.sellerId,
        productName: item.productName,
        brandName: item.brandName,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        isPaidToBrand: item.isPaidToBrand,
        _id: item._id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
      shippingAddress,
    };

    const res = await addOrder(orderPayload);
    if (res?.status?.toString().includes("20")) {
      successNotification("Order placed successfully!");
      await clearCartItems();
      router.replace({
        pathname: "order-success",
        params: { orderId: res?.data?.orderID },
      });
    } else {
      errorNotification("Failed to place order. Please try again.");
    }
  };

  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[glStyles.containerInner, styles.container]}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <AntDesign name="arrow-left" size={22} color={theme.title} />
          </Pressable>
          <ThemedText style={styles.headerText}>Checkout</ThemedText>
          <View></View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 64, gap: 20 }}
        >
          {/* Box container */}
          <ThemedAddressOpposite style={styles.addressBox}>
            {shippingAddress ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 6,
                      alignItems: "center",
                    }}
                  >
                    <ThemedText
                      style={{ color: theme.title, fontWeight: "700" }}
                    >
                      {shippingAddress?.addressLabel}
                    </ThemedText>
                    <ThemedViewOpposite style={styles.miniBox}>
                      <ThemedTextOpposite>(default address)</ThemedTextOpposite>
                    </ThemedViewOpposite>
                  </View>
                  <Pressable onPress={() => router.push("manage-address")}>
                    <FontAwesome6
                      name="pen-to-square"
                      size={22}
                      color={theme.title}
                    />
                  </Pressable>
                </View>

                <View
                  style={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: "gray",
                    width: "100%",
                    marginTop: 4,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <NormalText style={{ fontWeight: 600 }}>
                    {shippingAddress?.fullName}
                  </NormalText>
                  <NormalText>({shippingAddress?.phoneNumber})</NormalText>
                </View>
                <View>
                  <NormalText style={{ color: "gray" }}>
                    {shippingAddress.street}
                  </NormalText>
                  <NormalText style={{ color: "gray" }}>
                    {shippingAddress.city}
                  </NormalText>
                </View>
              </>
            ) : (
              <>
                <ThemedText type="title">No address added yet</ThemedText>
                <Pressable onPress={() => router.push("add-address")}>
                  <ThemedViewOpposite style={styles.loginButton}>
                    <ThemedTextOpposite>Add new address</ThemedTextOpposite>
                  </ThemedViewOpposite>
                </Pressable>
              </>
            )}
          </ThemedAddressOpposite>
          <ThemedText style={{ fontSize: 20, fontWeight: 600 }}>
            Your Items
          </ThemedText>

          {cartItems.map(
            (item) => (
              console.log(item.price),
              (
                <View
                  key={item._id.toString()}
                  style={styles.backgroundContainer}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                  />
                  <View style={styles.productDetails}>
                    <ThemedText style={styles.productName}>
                      {item.productName}
                    </ThemedText>
                    <ThemedText style={styles.brand}>
                      {item.brandName}
                    </ThemedText>
                    <ThemedText style={styles.price}>{item.price}</ThemedText>
                    <View style={styles.quantityControls}>
                      <ThemedText
                        style={[
                          styles.quantity,
                          { fontSize: 16, fontWeight: "600" },
                        ]}
                      >
                        Qty: {item.quantity}
                      </ThemedText>
                    </View>
                  </View>
                </View>
              )
            )
          )}

          <View style={{ gap: 10 }}>
            <ThemedAddressOpposite style={styles.paymentBox}>
              <Image source={stripe} />
              <Pressable
                onPress={() => toggleSelect(cartItems._id)}
                style={[
                  styles.circleCheckbox,
                  selected[cartItems._id] && styles.circleCheckboxSelected,
                ]}
              >
                {selected[cartItems._id] && <View style={styles.innerCircle} />}
              </Pressable>
              <ThemedText style={{ fontSize: 16, fontWeight: 600 }}>
                Stripe
              </ThemedText>
            </ThemedAddressOpposite>
            <ThemedAddressOpposite style={styles.paymentBox}>
              <Image source={flutterwave} />
            </ThemedAddressOpposite>
            <ThemedAddressOpposite style={styles.paymentBox}>
              <Image source={paystack} />
              <ThemedText style={{ fontSize: 16, fontWeight: 600 }}>
                Paystack
              </ThemedText>
            </ThemedAddressOpposite>
          </View>

          {/* Optional code */}
          <ThemedText style={{ fontSize: 18, fontWeight: 600 }}>
            Discount code (Optional)
          </ThemedText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder="Enter discount code"
              placeholderTextColor={theme.title}
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 8,
                padding: 16,
                color: theme.title,
                width: "55%",
              }}
            />
            <Pressable>
              <ThemedViewOpposite
                style={[styles.loginButton, { width: "100%" }]}
              >
                <ThemedTextOpposite>Apply</ThemedTextOpposite>
              </ThemedViewOpposite>
            </Pressable>
          </View>

          {/* Order summary */}
          <NormalText
            style={{ fontSize: 20, fontWeight: 600, color: "#575757" }}
          >
            Order Summary
          </NormalText>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <NormalText style={{ color: "#575757" }}>Total</NormalText>
              <NormalText style={{ color: theme.title, fontWeight: 600 }}>
                {currencyFormatter(cartData?.summary?.total)}
              </NormalText>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <NormalText style={{ color: "#575757" }}>Shipping fee</NormalText>
              <NormalText style={{ color: theme.title, fontWeight: 600 }}>
                {currencyFormatter(cartData?.summary?.shippingFee)}
              </NormalText>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <NormalText style={{ color: "#575757" }}>Discount</NormalText>
              <NormalText style={{ color: theme.title, fontWeight: 600 }}>
                -{currencyFormatter(cartData?.summary?.discount)}
              </NormalText>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <NormalText style={{ color: "#575757" }}>Tax:</NormalText>
              <NormalText style={{ color: theme.title, fontWeight: 600 }}>
                {currencyFormatter(cartData?.summary?.tax)}
              </NormalText>
            </View>
          </View>

          <View
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: "gray",
              width: "100%",
              marginTop: 4,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <NormalText
              style={{ color: "#575757", fontSize: 20, fontWeight: 700 }}
            >
              Total
            </NormalText>
            <NormalText
              style={{ color: theme.title, fontWeight: 700, fontSize: 18 }}
            >
              {currencyFormatter(cartData?.summary?.subtotal)}
            </NormalText>
          </View>
          <Pressable onPress={() => handleCheckout()}>
            <ThemedViewOpposite style={styles.loginButton}>
              <ThemedTextOpposite style={{ fontSize: 18 }}>
                Pay
              </ThemedTextOpposite>
            </ThemedViewOpposite>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 28,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 600,
  },
  addressBox: {
    width: "100%",
    // height: 150,
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 10,
    borderRadius: 8,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 1,
  },
  miniBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 18,
  },
  backgroundContainer: {
    flexDirection: "row",
    // backgroundColor: "#fff",
    width: "100%",
    height: 120,
    borderRadius: 8,
    padding: 10,
  },
  productImage: {
    width: 100,
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 16,
    fontWeight: 600,
  },
  brand: {
    color: "#aaa",
    fontSize: 14,
  },
  price: {
    fontSize: 16,
    fontWeight: 600,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
  },
  quantity: {
    marginHorizontal: 6,
  },
  paymentBox: {
    flexDirection: "row",
    width: "100%",
    // height: 150,
    paddingVertical: 16,
    paddingHorizontal: 6,
    gap: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});
