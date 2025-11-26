import { fetchProducts } from "@/API";
import { deleteDarkIcon, deleteIcon } from "@/assets/images";
import SearchInput from "@/component/global/SearchInput";
import ThemedLoader from "@/component/global/ThemedLoader";
import ThemedText from "@/component/global/ThemedText";
import ProductGrid from "@/component/productGrid";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";
// import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { currencyFormatter } from "@/utils/helpers";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Arrival() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const router = useRouter();
  const glStyles = globalStyles();

  const { productsData, productsLoading } = fetchProducts();

  const handleNavigation = (id) => {
    router.push({
      pathname: "/product-details",
      params: { id },
    });
  };

  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[glStyles.containerInner, { gap: 10 }]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <View style={{ width: "33%" }}>
            <Pressable onPress={() => router.back()}>
              <AntDesign name="arrow-left" size={24} color={theme.title} />
            </Pressable>
          </View>
          <View style={{ width: "33%", display: "flex", alignItems: "center" }}>
            <ThemedText
              style={{
                fontSize: 18,
                fontFamily: "Urbanist_400Regular",
              }}
            >
              New Arrival
            </ThemedText>
          </View>
          <View style={{ width: "33%" }}></View>
        </View>
        <SearchInput />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {productsData ? (
            <ProductGrid
              data={productsData?.products}
              numColumns={2}
              spacing={12}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleNavigation(item._id)}>
                  <View
                    style={[
                      styles.productCard,
                      { backgroundColor: theme.cardBackground },
                    ]}
                  >
                    <Image
                      source={{
                        uri: item?.images.length
                          ? item?.images?.[0]?.url
                          : item?.variants[0]?.images[0]?.url,
                      }}
                      style={styles.productImage}
                    />
                    <View style={styles.productInfo}>
                      <ThemedText style={[styles.productName]}>
                        {item?.title}
                      </ThemedText>
                      <ThemedText type="subtext" style={styles.productBrand}>
                        {item?.brandName}
                      </ThemedText>
                      <ThemedText style={[styles.productPrice]}>
                        {currencyFormatter(item?.pricing?.sellingPrice)}
                      </ThemedText>
                    </View>
                    <Pressable
                      style={{ position: "absolute", bottom: 12, right: 8 }}
                      onPress={() => handleNavigation(item._id)}
                    >
                      <Image
                        source={
                          currentTheme === "dark" ? deleteIcon : deleteDarkIcon
                        }
                      />
                    </Pressable>
                  </View>
                </Pressable>
              )}
            />
          ) : productsLoading ? (
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
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 28,
    paddingTop: StatusBar.currentHeight,
  },
  productCard: {
    padding: 8,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    height: 200,
    margin: 5,
  },
  productImage: {
    flex: 1,
    width: "100%",
    height: 100,
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
    fontSize: 12,
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 10,
  },
  images: {
    width: "100%",
    resizeMode: "contain",
  },
});
