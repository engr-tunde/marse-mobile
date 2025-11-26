import { illustration } from "@/assets/images";
import ThemedText from "@/component/global/ThemedText";
import ThemedTextOpposite from "@/component/global/ThemedTextOpposite";
import ThemedViewOpposite from "@/component/global/ThemedViewOpposite";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderSuccess() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const glStyles = globalStyles();
  const router = useRouter();
  const { orderId } = useLocalSearchParams();

  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />
      <View
        style={[
          glStyles.containerInner,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
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
          <ThemedText style={{ fontSize: 24, marginBottom: 10 }}>
            Order Canclled!
          </ThemedText>

          <View
            style={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ThemedText type="subtext">Your order</ThemedText>
              <ThemedText type="title" style={{ fontWeight: "bold" }}>
                #{orderId?.substring(0, 8)}
              </ThemedText>
              <ThemedText type="subtext">
                has been successfully cancelled.
              </ThemedText>
            </View>

            <ThemedText type="subtext" style={{ textAlign: "center" }}>
              Refund (if applicable) will be processed to your original payment
              method
            </ThemedText>
          </View>
        </View>
        <Pressable
          onPress={() => router.replace("orders")}
          style={{
            marginTop: 100,
            width: "100%",
          }}
        >
          <ThemedViewOpposite style={{ width: "100%", padding: 12 }}>
            <ThemedTextOpposite
              style={{ textAlign: "center", fontWeight: "bold" }}
            >
              Done
            </ThemedTextOpposite>
          </ThemedViewOpposite>
        </Pressable>
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
