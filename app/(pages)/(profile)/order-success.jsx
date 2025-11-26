import { fetchOrderDetails } from "@/API";
import { illustration } from "@/assets/images";
import NormalText from "@/component/global/NormalText";
import ThemedLoader from "@/component/global/ThemedLoader";
import ThemedText from "@/component/global/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { router, useLocalSearchParams } from "expo-router";
import { Image, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderSuccess() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const glStyles = globalStyles();
  const { orderId } = useLocalSearchParams();

  const { orderData, orderLoading } = fetchOrderDetails(orderId);

  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[glStyles.containerInner]}>
        {orderLoading ? (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: 500,
            }}
          >
            <ThemedLoader />
          </View>
        ) : orderData ? (
          <>
            <View
              style={{
                marginTop: 140,
                justifyContent: "center",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Image
                source={illustration}
                style={{ width: 300, resizeMode: "contain" }}
              />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <ThemedText style={{ fontSize: 24 }}>Order successful</ThemedText>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <ThemedText type="subtext">
                  Thank you{" "}
                  {orderData?.shippingAddress?.fullName?.split(" ")[0]}. Your
                  order has been placed
                </ThemedText>
                <NormalText style={{ color: "#ddd" }}>successfully</NormalText>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <ThemedText type="subtext">
                  Your order number is #{orderData?.id?.substring(0, 8)}. A
                  confirmation email
                </ThemedText>
                <ThemedText type="subtext" style={{ textAlign: "center" }}>
                  with all your order details has been sent to your email{" "}
                  {orderData?.shippingAddress?.email}
                </ThemedText>
              </View>
            </View>
            <View style={styles.registerContainer}>
              <View style={styles.box1}>
                <ThemedText
                  style={styles.boxText1}
                  onPress={() => router.replace("home")}
                >
                  Continue shopping
                </ThemedText>
              </View>
              <View style={styles.box2}>
                <ThemedText
                  style={styles.boxText2}
                  onPress={() => router.replace("orders")}
                >
                  Track your order
                </ThemedText>
              </View>
            </View>
          </>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
    paddingTop: StatusBar.currentHeight,
    gap: 28,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 20,
  },
  box1: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  box2: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  boxText1: {
    fontSize: 16,
  },
  boxText2: {
    fontSize: 16,
  },
});
