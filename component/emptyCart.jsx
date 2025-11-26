import { basketIcon, darkBasketIcon } from "@/assets/images";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import ThemedText from "./global/ThemedText";
import ThemedTextOpposite from "./global/ThemedTextOpposite";
import ThemedViewOpposite from "./global/ThemedViewOpposite";

export default function EmptyCart() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const glStyles = globalStyles();
  return (
    <View style={styles.emptyCartContainer}>
      <Image
        source={currentTheme === "dark" ? basketIcon : darkBasketIcon}
        style={styles.emptyCartImage}
      />
      <View style={styles.emptyCartTextContainer}>
        <ThemedText style={styles.emptyCartTitle}>0 items found</ThemedText>
        <ThemedText>Nothing here yet - time to shop your next look</ThemedText>
      </View>
      <Pressable onPress={() => router.push("/arrival")}>
        <ThemedViewOpposite style={styles.shoppingButton}>
          <ThemedTextOpposite>Start shopping</ThemedTextOpposite>
        </ThemedViewOpposite>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyCartContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    paddingHorizontal: 10,
  },
  emptyCartImage: {
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  emptyCartTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  emptyCartTitle: {
    fontWeight: "600",
    fontSize: 18,
  },
  shoppingButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginTop: 28,
  },
});
