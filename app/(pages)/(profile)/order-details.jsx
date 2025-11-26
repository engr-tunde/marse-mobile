import { fetchOrderDetails } from "@/API";
import { defaultImage, Hline, stripe } from "@/assets/images";
import ThemedLoader from "@/component/global/ThemedLoader";
import ThemedText from "@/component/global/ThemedText";
import CancelOrderModal from "@/component/orders/CancelOrderModal";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { currencyFormatter } from "@/utils/helpers";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConfirmOder() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const glStyles = globalStyles();
  const { orderId } = useLocalSearchParams();
  const router = useRouter();
  const [showCancelModal, setshowCancelModal] = useState(false);

  const handleCancelOrder = async () => {
    setshowCancelModal(!showCancelModal);
    router.push({
      pathname: "cancel-order",
      params: {
        orderId,
      },
    });
  };

  const { orderData, orderLoading } = fetchOrderDetails(orderId);

  console.log("orderData", JSON.stringify(orderData, null, 2));

  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[glStyles.containerInner, { gap: 20 }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Pressable onPress={() => router.back()}>
              <AntDesign name="arrow-left" size={24} color={theme.title} />
            </Pressable>
            <ThemedText style={styles.headerText}>Order details</ThemedText>
            <AntDesign name="arrow-left" size={24} color={theme.uiBackground} />
          </View>

          {orderLoading ? (
            <View
              style={{
                height: 500,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ThemedLoader />
            </View>
          ) : orderData ? (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <ThemedText style={styles.text}>
                  Order #{orderData?.id?.substring(0, 8)}
                </ThemedText>
                <ThemedText style={styles.orderStatus}>
                  {orderData?.status}
                </ThemedText>
              </View>
              <ThemedText style={styles.text}>Your items</ThemedText>
              <View style={{ padding: 6 }}>
                <View
                  style={[
                    styles.backgroundContainer,
                    { backgroundColor: theme.uiBackground },
                  ]}
                >
                  <View
                    style={{ flexDirection: "row", marginTop: 10, gap: 10 }}
                  >
                    <Image
                      source={
                        orderData?.items[0]?.image
                          ? { uri: orderData?.items[0]?.image }
                          : defaultImage
                      }
                      style={styles.productImage}
                    />

                    <View style={styles.productDetails}>
                      <ThemedText type="title" style={[styles.productName]}>
                        {orderData?.items?.length > 1
                          ? `${orderData?.items[0]?.productName?.substring(
                              0,
                              20
                            )}... and others`
                          : `${orderData?.items[0]?.productName?.substring(
                              0,
                              30
                            )}...` || "Unknown Product"}
                      </ThemedText>

                      <View style={styles.rowBetween}>
                        <ThemedText type="text" style={styles.label}>
                          {orderData?.items[0]?.brandName}
                        </ThemedText>
                      </View>

                      <View style={styles.rowBetween}>
                        <ThemedText style={styles.price}>
                          {currencyFormatter(orderData?.totalAmount)}
                        </ThemedText>
                        <ThemedText style={styles.label}>
                          Qty: {orderData?.items?.length}
                        </ThemedText>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.tableContainer}>
                <ThemedText style={[styles.text, { marginBottom: -10 }]}>
                  Estimated delivery date
                </ThemedText>
                <ThemedText style={styles.label}>July 12, 2025</ThemedText>
                <ThemedText style={[styles.text, { marginBottom: -10 }]}>
                  Shipping to
                </ThemedText>
                <ThemedText style={styles.label}>
                  {orderData?.shippingAddress?.street},{" "}
                  {orderData?.shippingAddress?.city}.
                </ThemedText>
                <ThemedText style={styles.text}>Payment method</ThemedText>
              </View>
              <View
                style={[
                  styles.stripeContainer,
                  { backgroundColor: theme.uiBackground },
                ]}
              >
                <Image source={stripe} resizeMode="contain" />
                <ThemedText style={styles.text}>Stripe</ThemedText>
              </View>
              <View style={styles.tableContainer}>
                <ThemedText style={[styles.text, { fontWeight: "700" }]}>
                  Order Summarry
                </ThemedText>
                <View style={styles.rowBase}>
                  <ThemedText type="text" style={[styles.label]}>
                    Total
                  </ThemedText>
                  <ThemedText style={styles.text}>
                    {currencyFormatter(orderData?.totalAmount)}
                  </ThemedText>
                </View>
                <View style={styles.rowBase}>
                  <ThemedText type="text" style={styles.label}>
                    Shipping fee
                  </ThemedText>
                  <ThemedText style={styles.text}>
                    {currencyFormatter(orderData?.shippingPaidByUser)}
                  </ThemedText>
                </View>
                <View style={styles.rowBase}>
                  <ThemedText type="text" style={styles.label}>
                    Discount
                  </ThemedText>
                  <ThemedText style={styles.text}>
                    -{currencyFormatter(orderData?.discountApplied)}
                  </ThemedText>
                </View>
                <View style={styles.rowBase}>
                  <ThemedText type="text" style={styles.label}>
                    Tax:
                  </ThemedText>
                  <ThemedText style={styles.text}>
                    {currencyFormatter(0)}
                  </ThemedText>
                </View>
                <Image
                  source={Hline}
                  style={{ width: "100%" }}
                  resizeMode="contain"
                />
                <View style={styles.rowBase}>
                  <ThemedText
                    type="text"
                    style={[styles.label, { fontWeight: "bold" }]}
                  >
                    Total
                  </ThemedText>
                  <ThemedText style={styles.text}>
                    {currencyFormatter(orderData?.totalAmount)}
                  </ThemedText>
                </View>
              </View>
              {orderData?.status === "confirmed" ? (
                <View style={styles.cancelledButton}>
                  <Pressable onPress={() => setshowCancelModal(true)}>
                    <ThemedText style={{ color: "#000" }}>
                      Cancel order
                    </ThemedText>
                  </Pressable>
                </View>
              ) : null}
            </>
          ) : null}

          <CancelOrderModal
            visible={showCancelModal}
            title="Cancel Order"
            message="Are you sure you want to cancel this order?"
            confirmText="Cancel order"
            cancelText="Keep order"
            onCancel={() => setshowCancelModal(false)}
            onConfirm={handleCancelOrder}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
    gap: 28,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderStatus: {
    color: "#FCA120",
    fontSize: 14,
  },
  backgroundContainer: {
    width: "100%",
    borderRadius: 8,
    padding: 14,
    marginTop: 16,
    marginBottom: 10,
    shadowColor: "#7a7a7a",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
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
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  cancelledButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginTop: 28,
  },
  text: {
    fontSize: 16,
  },
  stripeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 20,
    marginHorizontal: 8,
    marginVertical: 10,
    shadowColor: "#7a7a7a",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  rowBase: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tableContainer: {
    gap: 20,
  },
});
