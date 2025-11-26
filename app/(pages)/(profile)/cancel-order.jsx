import { cancelOrder } from "@/API";
import ThemedText from "@/component/global/ThemedText";
import ThemedTextOpposite from "@/component/global/ThemedTextOpposite";
import ThemedViewOpposite from "@/component/global/ThemedViewOpposite";
import { Colors } from "@/constants/Colors";
import { orderCancellationReasons } from "@/data";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { successNotification } from "@/utils/helpers";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CancelOrder() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const router = useRouter();
  const glStyles = globalStyles();
  const { orderId } = useLocalSearchParams();
  const [reason, setreason] = useState(orderCancellationReasons[0]);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [cancelReason, setcancelReason] = useState();

  const handleSubmit = async () => {
    setisSubmitting(true);
    const payload = {
      orderId,
      cancelReason: reason === "Other" ? cancelReason : reason,
    };
    console.log("payload", payload);
    const res = await cancelOrder(payload);
    if (res?.status?.toString().includes("20")) {
      successNotification("Order placed successfully!");
      setTimeout(() => {
        router.replace({
          pathname: "order-cancelled",
          params: { orderId },
        });
      }, 300);
    } else {
      errorNotification("Failed to place order. Please try again.");
    }
    setisSubmitting(false);
  };

  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[glStyles.containerInner, { marginBottom: 20 }]}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <AntDesign name="arrow-left" size={24} color={theme.title} />
          </Pressable>
          <ThemedText style={styles.headerText}>Select reason</ThemedText>
          <AntDesign name="arrow-left" size={24} color={theme.uiBackground} />
        </View>
      </View>

      <View style={[glStyles.containerInner]}>
        {orderCancellationReasons?.map((item, i) => (
          <Pressable key={i} onPress={() => setreason(item)}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: 20,
              }}
            >
              <ThemedText style={{ fontSize: 15 }}>{item}</ThemedText>

              <View
                style={{
                  borderWidth: 1,
                  borderColor: theme.title,
                  borderRadius: "50%",
                  height: 20,
                  width: 20,
                  padding: 3,
                }}
              >
                {item === reason ? (
                  <View
                    style={{
                      backgroundColor: theme.title,
                      borderRadius: "50%",
                      height: 12,
                      width: 12,
                    }}
                  ></View>
                ) : null}
              </View>
            </View>
          </Pressable>
        ))}

        {reason === "Other" ? (
          <TextInput
            onChangeText={setcancelReason}
            style={{
              borderWidth: 1,
              borderColor: theme.subtext,
              borderRadius: 5,
              height: 100,
              padding: 10,
              fontSize: 16,
            }}
            multiline={true}
            numberOfLines={4}
            placeholder="Type your reason"
          />
        ) : null}
      </View>
      <Pressable
        onPress={isSubmitting ? null : handleSubmit}
        style={{ marginTop: "auto", marginBottom: 20, marginHorizontal: 20 }}
      >
        <ThemedViewOpposite
          style={{
            width: "100%",
            padding: 12,
            opacity: isSubmitting ? 0.5 : 1,
          }}
        >
          <ThemedTextOpposite
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </ThemedTextOpposite>
        </ThemedViewOpposite>
      </Pressable>
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

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 19,
    fontWeight: "bold",
  },
});
