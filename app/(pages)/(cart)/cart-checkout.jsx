import { addOrder, fetchCart, fetchShippingAddresses } from "@/API";
import { flutterwave, paystack, stripe } from "@/assets/images";
import NormalText from "@/component/global/NormalText";
import ThemedAddressOpposite from "@/component/global/ThemeAddressOpposite";
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
  const { clearCartItems } = useCartContext();
  const [selected, setSelected] = useState({});
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

  const [cartItems, setCartItems] = useState();
  const { cartData, cartLoading } = fetchCart();

  useEffect(() => {
    if (cartData?.items) {
      setCartItems(cartData.items);
    }
  }, [cartData]);

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
    if (!cartItems || cartItems.length === 0) {
      console.log("Cart is empty. Cannot place order.");
      return;
    }

    const orderPayload = {
      clientSecret,
      items: cartItems?.map((item) => ({
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
      <View style={[styles.container]}>
        <View style={[styles.header, { paddingHorizontal: 15 }]}>
          <Pressable onPress={() => router.back()}>
            <AntDesign name="arrow-left" size={22} color={theme.title} />
          </Pressable>
          <ThemedText style={styles.headerText}>Checkout</ThemedText>
          <View></View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
        >
          {/* Box container */}
          <ThemedView
            style={[styles.addressBox, { shadowColor: theme.shadowColor }]}
          >
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
          </ThemedView>

          <ThemedText
            style={{
              fontSize: 18,
              fontWeight: 600,
              paddingHorizontal: 20,
              marginBottom: -10,
            }}
          >
            Your Items
          </ThemedText>

          <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
            {cartItems &&
              cartItems?.map((item) => (
                <ThemedView
                  key={item._id.toString()}
                  style={[
                    styles.backgroundContainer,
                    { shadowColor: theme.shadowColor },
                  ]}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                  />
                  <View style={styles.productDetails}>
                    <ThemedText style={styles.productName}>
                      {item.productName}
                    </ThemedText>
                    <ThemedText style={[styles.brand, { color: theme.text }]}>
                      {item.brandName}
                    </ThemedText>
                    <View style={styles.quantityControls}>
                      <ThemedText style={styles.price}>
                        {currencyFormatter(item.price)}
                      </ThemedText>
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
                </ThemedView>
              ))}
          </View>

          <View style={{ display: "flex", marginHorizontal: 26, gap: 25 }}>
            <ThemedText
              style={{
                fontSize: 17,
                fontWeight: 500,
                marginBottom: -15,
              }}
            >
              Available payment methods
            </ThemedText>
            <View style={{ gap: 10 }}>
              <ThemedAddressOpposite
                style={[
                  styles.paymentBox,
                  { borderColor: theme.navBackground },
                ]}
              >
                <Image source={stripe} />
                <Pressable
                  onPress={() => toggleSelect(cartItems._id)}
                  style={[
                    styles.circleCheckbox,
                    // selected[cartItems._id] && styles.circleCheckboxSelected,
                  ]}
                >
                  <View style={styles.innerCircle} />
                  {/* {selected[cartItems._id] && <View style={styles.innerCircle} />} */}
                </Pressable>
                <ThemedText style={{ fontSize: 16 }}>Stripe</ThemedText>
              </ThemedAddressOpposite>
              <ThemedAddressOpposite
                style={[
                  styles.paymentBox,
                  { borderColor: theme.navBackground },
                ]}
              >
                <Image source={flutterwave} />
              </ThemedAddressOpposite>
              <ThemedAddressOpposite
                style={[
                  styles.paymentBox,
                  { borderColor: theme.navBackground },
                ]}
              >
                <Image source={paystack} />
                <ThemedText style={{ fontSize: 16 }}>Paystack</ThemedText>
              </ThemedAddressOpposite>
            </View>

            {/* Optional code */}
            <ThemedText
              style={{ fontSize: 17, fontWeight: 500, marginBottom: -15 }}
            >
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
                placeholderTextColor={theme.subtext}
                style={{
                  borderWidth: 1,
                  borderColor: theme.shadowColor,
                  borderRadius: 3,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  color: theme.subtext,
                  width: "70%",
                  placeholderTextColor: theme.subtext,
                  fontSize: 16,
                }}
              />
              <Pressable style={{ width: "25%" }}>
                <ThemedViewOpposite style={[styles.loginButton]}>
                  <ThemedTextOpposite>Apply</ThemedTextOpposite>
                </ThemedViewOpposite>
              </Pressable>
            </View>
          </View>
          {/* Order summary */}
          <ThemedView
            style={[
              styles.summaryContainer,
              { shadowColor: theme.shadowColor },
            ]}
          >
            <ThemedText
              type="subtext"
              style={{ fontSize: 20, fontWeight: 600 }}
            >
              Order Summary
            </ThemedText>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <ThemedText type="text" style={{ fontSize: 15 }}>
                  Total
                </ThemedText>
                <ThemedText style={{ fontSize: 16, fontWeight: 600 }}>
                  {currencyFormatter(cartData?.summary?.total)}
                </ThemedText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <ThemedText type="text" style={{ fontSize: 15 }}>
                  Shipping fee
                </ThemedText>
                <ThemedText style={{ fontSize: 16, fontWeight: 600 }}>
                  {currencyFormatter(cartData?.summary?.shippingFee)}
                </ThemedText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <ThemedText type="text" style={{ fontSize: 15 }}>
                  Discount
                </ThemedText>
                <ThemedText style={{ fontSize: 16, fontWeight: 600 }}>
                  {currencyFormatter(cartData?.summary?.discount)}
                </ThemedText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <ThemedText type="text" style={{ fontSize: 15 }}>
                  Tax
                </ThemedText>
                <ThemedText style={{ fontSize: 16, fontWeight: 600 }}>
                  {currencyFormatter(cartData?.summary?.tax)}
                </ThemedText>
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
              <ThemedText type="text" style={{ fontSize: 20, fontWeight: 700 }}>
                Total
              </ThemedText>
              <ThemedText style={{ fontWeight: 600, fontSize: 19 }}>
                {currencyFormatter(cartData?.summary?.subtotal)}
              </ThemedText>
            </View>
            <Pressable onPress={() => handleCheckout()}>
              <ThemedViewOpposite style={styles.loginButton}>
                <ThemedTextOpposite style={{ fontSize: 16 }}>
                  Pay
                </ThemedTextOpposite>
              </ThemedViewOpposite>
            </Pressable>
          </ThemedView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    gap: 2,
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
    // width: "100%",
    // height: 150,
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 10,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 7.84,
    elevation: 5,
    margin: 20,
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
    // width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    height: 120,
    borderRadius: 8,
    padding: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 7.84,
    elevation: 5,
    margin: 15,
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
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
    fontWeight: 500,
    marginBottom: 5,
  },
  brand: {
    fontSize: 14,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  price: {
    fontSize: 17,
    fontWeight: 600,
  },
  quantity: {
    marginHorizontal: 6,
  },
  paymentBox: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 17,
    gap: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
  },

  summaryContainer: {
    width: "100%",
    borderRadius: 25,
    paddingHorizontal: 23,
    paddingTop: 30,
    paddingBottom: 50,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 7.84,
    elevation: 5,
    marginTop: 20,
    display: "flex",
    gap: 13,
  },
});
