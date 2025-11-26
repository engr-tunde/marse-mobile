import { flutterwave, paystack, stripe } from "@/assets/images";
import ThemedAddressOpposite from "@/component/global/ThemeAddressOpposite";
import ThemedText from "@/component/global/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { Image, Pressable, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payment() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const glStyles = globalStyles();

  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[glStyles.containerInner, { gap: 20, marginTop: 20 }]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Pressable onPress={() => router.back()}>
            <AntDesign name="arrow-left" size={24} color={theme.title} />
          </Pressable>
          <ThemedText style={{ fontSize: 18 }}>Payment method</ThemedText>
          <View></View>
        </View>
        <View style={{ gap: 20 }}>
          <ThemedAddressOpposite style={styles.paymentBox}>
            <Image source={stripe} />
            <ThemedText>Stripe</ThemedText>
            <ThemedText style={{ fontSize: 18 }}>Connected</ThemedText>
          </ThemedAddressOpposite>
          <ThemedAddressOpposite style={styles.paymentBox}>
            <Image source={flutterwave} />
            <ThemedText style={{ fontSize: 18 }}>Not yet available</ThemedText>
          </ThemedAddressOpposite>
          <ThemedAddressOpposite style={styles.paymentBox}>
            <Image source={paystack} />
            <ThemedText>Paystack</ThemedText>
            <ThemedText style={{ fontSize: 18 }}>Not yet available</ThemedText>
          </ThemedAddressOpposite>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  paymentBox: {
    flexDirection: "row",
    width: "100%",
    // height: 150,
    paddingVertical: 16,
    paddingHorizontal: 6,
    gap: 10,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
