import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import ThemedText from "./ThemedText";

const ProductsUnavailable = ({ title, message }) => {
  return (
    <View
      style={{
        height: 500,
        width: "100%",
        display: "flex",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: 60,
          width: 60,
          borderRadius: "50%",
          backgroundColor: "#fcee9f",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: 0.5,
        }}
      >
        <Ionicons name="warning-outline" color="#e3a03b" size={30} />
      </View>
      <ThemedText style={{ fontSize: 18, textAlign: "center" }}>
        {title}
      </ThemedText>
      <ThemedText style={{ fontSize: 13, textAlign: "center" }}>
        {message}
      </ThemedText>
    </View>
  );
};

export default ProductsUnavailable;
