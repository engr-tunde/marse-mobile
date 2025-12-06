import FilterInput from "@/component/global/Filter";
import NormalText from "@/component/global/NormalText";
import ThemedText from "@/component/global/ThemedText";
import ProductGrid from "@/component/productGrid";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const products = [
  {
    id: "1",
    name: "Shiny Dress",
    brand: "Brand",
    price: "$95.50",
    image: require("../../assets/products/products.png"),
  },
  {
    id: "2",
    name: "Shiny Dress",
    brand: "Brand",
    price: "$95.50",
    image: require("../../assets/products/products.png"),
  },
  {
    id: "3",
    name: "Shiny Dress",
    brand: "Brand",
    price: "$95.50",
    image: require("../../assets/products/products.png"),
  },
  {
    id: "4",
    name: "Shiny Dress",
    brand: "Brand",
    price: "$95.50",
    image: require("../../assets/products/products.png"),
  },
  {
    id: "5",
    name: "Shiny Dress",
    brand: "Brand",
    price: "$95.50",
    image: require("../../assets/products/products.png"),
  },
  {
    id: "6",
    name: "Shiny Dress",
    brand: "Brand",
    price: "$95.50",
    image: require("../../assets/products/products.png"),
  },
];

export default function Dinner() {
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
      <View style={[glStyles.containerInner]}>
        <AntDesign
          name="arrow-left"
          size={24}
          color="#fff"
          style={{ marginBottom: 10 }}
        />
        <FilterInput />
        <NormalText style={{ color: "#ddd" }}>
          "Showing result for <ThemedText>Dinner gown"</ThemedText>
        </NormalText>
        <View style={styles.containerBox}>
          <View style={styles.miniBox2}>
            <ThemedText>Filter</ThemedText>
            <Image source={require("../../assets/images/filter.png")} />
          </View>
          <View style={styles.miniBox2}>
            <ThemedText>Sort</ThemedText>
            <Image source={require("../../assets/images/arrow-down.png")} />
          </View>
          <View style={styles.miniBox2}>
            <ThemedText>Price</ThemedText>
            <Image source={require("../../assets/images/arrow-down.png")} />
          </View>
          <View style={styles.miniBox2}>
            <ThemedText>Brand</ThemedText>
            <Image source={require("../../assets/images/arrow-down.png")} />
          </View>
          <View style={styles.miniBox2}>
            <ThemedText style={{ color: "#fff" }}>Size</ThemedText>
            <Image source={require("../../assets/images/arrow-down.png")} />
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <ProductGrid
            data={products}
            numColumns={2}
            spacing={12}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <Image source={item.image} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <ThemedText style={styles.productName}>
                    {item.name}
                  </ThemedText>
                  <NormalText style={styles.productBrand}>
                    {item.brand}
                  </NormalText>
                  <ThemedText style={styles.productPrice}>
                    {item.price}
                  </ThemedText>
                </View>
              </View>
            )}
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
  productCard: {
    backgroundColor: "#1f1f1f",
    padding: 8,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  productImage: {
    flex: 1,
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 4,
  },
  productBrand: {
    color: "#666",
    fontSize: 12,
    marginBottom: 6,
  },
  productPrice: {
    fontWeight: 600,
    fontSize: 14,
  },
  containerBox: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
  },
  miniBox2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 18,
  },
});
