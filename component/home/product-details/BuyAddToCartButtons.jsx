import ThemedText from "@/component/global/ThemedText";
import ThemedTextOpposite from "@/component/global/ThemedTextOpposite";
import ThemedViewOpposite from "@/component/global/ThemedViewOpposite";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";

import { Pressable, StyleSheet, View } from "react-native";

const BuyAddToCartButtons = ({ handleAddToCart }) => {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const router = useRouter();

  return (
    <View
      style={[
        styles.registerContainer,
        { backgroundColor: theme.uiBackground },
      ]}
    >
      <Pressable onPress={() => router.push("/cart")} style={{ width: "60%" }}>
        <ThemedViewOpposite style={styles.box1}>
          <ThemedTextOpposite style={styles.boxText1}>
            Buy now
          </ThemedTextOpposite>
        </ThemedViewOpposite>
      </Pressable>
      <Pressable onPress={handleAddToCart} style={{ width: "35%" }}>
        <View style={[styles.box2, { borderColor: theme.title }]}>
          <ThemedText style={[styles.boxText2]}>Add to cart</ThemedText>
        </View>
      </Pressable>
    </View>
  );
};

export default BuyAddToCartButtons;

const styles = StyleSheet.create({
  registerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
    paddingHorizontal: 15,
    gap: 12,
    position: "absolute", // stick to bottom
    bottom: 40,
    left: 0,
    right: 0,
  },
  box1: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  box2: {
    width: "100%",
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    fontFamily: "Urbanist_400Regular",
  },
  boxText1: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Urbanist_400Regular",
  },
  boxText2: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Urbanist_400Regular",
  },
});
