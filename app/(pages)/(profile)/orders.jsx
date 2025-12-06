import { fetchOrders } from "@/API";
import { blackBox, product as defaultImage, whiteBox } from "@/assets/images";
import ThemedLoader from "@/component/global/ThemedLoader";
import ThemedText from "@/component/global/ThemedText";
import ThemedTextOpposite from "@/component/global/ThemedTextOpposite";
import ThemedView from "@/component/global/ThemedView";
import ThemedViewOpposite from "@/component/global/ThemedViewOpposite";
import { Colors } from "@/constants/Colors";
import { useOrdersContext } from "@/contexts/OrderContext";
import { orderStatusData } from "@/data";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { currencyFormatter } from "@/utils/helpers";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
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

export default function ConfirmOrder() {
  const { getFromOrder } = useOrdersContext();
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const glStyles = globalStyles();

  const [status, setstatus] = useState("confirmed");
  const [orders, setOrders] = useState([]);
  const { ordersData, ordersLoading } = fetchOrders(status);

  useEffect(() => {
    if (ordersData) {
      let data = ordersData?.orders;
      setOrders(data);
    }
  }, [ordersData]);

  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[glStyles.containerInner]}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <AntDesign name="arrow-left" size={24} color={theme.title} />
          </Pressable>
          <ThemedText style={styles.headerText}>My Orders</ThemedText>
          <Feather name="search" size={24} color={theme.title} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          {orderStatusData?.map((item, i) => (
            <Pressable key={i} onPress={() => setstatus(item?.value)}>
              <View style={{ alignItems: "center" }}>
                <ThemedText style={styles.text}>
                  {item?.title?.toString()}
                </ThemedText>
                <View
                  style={{
                    borderBottomWidth: status === item?.value ? 2 : 0,
                    borderBottomColor: theme.title,
                    width: 90,
                    marginTop: 4,
                  }}
                />
              </View>
            </Pressable>
          ))}
        </View>

        {ordersLoading ? (
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
        ) : !orders || orders.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 200 }}>
            <Image
              source={currentTheme === "dark" ? whiteBox : blackBox}
              style={styles.boxImage}
            />
            <ThemedText style={{ fontSize: 24, marginTop: 20 }}>
              0 items found
            </ThemedText>
            <ThemedText type="subtext" style={{ textAlign: "center" }}>
              Nothing here yet — time to shop your next look
            </ThemedText>
            <Pressable onPress={() => router.push("/arrival")}>
              <ThemedViewOpposite style={styles.loginButton}>
                <ThemedTextOpposite>Start Shopping</ThemedTextOpposite>
              </ThemedViewOpposite>
            </Pressable>
          </View>
        ) : orders.length ? (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.uniqueId || item._id || item.id}
            // renderItem={renderOrderItem}
            renderItem={({ item }) => {
              return (
                <ThemedView
                  style={[
                    styles.backgroundContainer,
                    {
                      shadowColor: theme.shadowColor,
                    },
                  ]}
                  // key={id}
                >
                  <View style={styles.orderHeader}>
                    <ThemedText style={styles.orderNumber}>
                      Order #{item?.id?.substring(0, 8)}
                    </ThemedText>
                    <ThemedText style={styles.orderStatus}>
                      {item?.status}
                    </ThemedText>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={
                        item?.items[0]?.image
                          ? { uri: item?.items[0]?.image }
                          : defaultImage
                      }
                      style={styles.productImage}
                    />

                    <View style={styles.productDetails}>
                      <ThemedText style={styles.productName}>
                        {item?.items?.length > 1
                          ? `${item?.items[0]?.productName?.substring(
                              0,
                              20
                            )}... and others`
                          : `${item?.items[0]?.productName?.substring(
                              0,
                              30
                            )}...` || "Unknown Product"}
                      </ThemedText>

                      <View style={styles.rowBetween}>
                        <ThemedText style={styles.label}>Amount:</ThemedText>
                        <ThemedText style={styles.price}>
                          {currencyFormatter(item?.totalAmount) ?? "$0.00"}
                        </ThemedText>
                      </View>

                      <View style={styles.rowBetween}>
                        <ThemedText style={styles.label}>
                          Estimate Delivery:
                        </ThemedText>
                        <ThemedText style={styles.price}>
                          {item?.deliveryTimeDays
                            ? `${item?.deliveryTimeDays} days`
                            : "Not specified"}
                        </ThemedText>
                      </View>

                      <Pressable
                        onPress={() =>
                          router.push({
                            pathname: "order-details",
                            params: { orderId: item?.id },
                          })
                        }
                      >
                        <ThemedViewOpposite style={styles.viewOrderBtn}>
                          <ThemedTextOpposite style={{ fontWeight: "600" }}>
                            View Order
                          </ThemedTextOpposite>
                        </ThemedViewOpposite>
                      </Pressable>
                    </View>
                  </View>
                </ThemedView>
              );
            }}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={false}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
  backgroundContainer: {
    // width: "100%",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 7.84,
    elevation: 5,
    margin: 10,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderStatus: {
    color: "#FCA120",
    fontSize: 14,
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
    fontWeight: "bold",
  },
  label: {
    color: "#aaa",
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
  viewOrderBtn: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 10,
  },
  boxImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    width: "100%",
    marginTop: 20,
  },
});
