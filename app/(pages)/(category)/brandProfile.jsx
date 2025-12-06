import { fetchBrandById, fetchProducts } from "@/API";
import { deleteDarkIcon, deleteIcon } from "@/assets/images";
import ThemedLoader from "@/component/global/ThemedLoader";
import ThemedText from "@/component/global/ThemedText";
import ThemedView from "@/component/global/ThemedView";
import ProductGrid from "@/component/productGrid";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { currencyFormatter } from "@/utils/helpers";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BrandProfile() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const glStyles = globalStyles();
  const [data, setData] = useState({
    brand: {},
    products: [],
  });
  let { brandId } = useLocalSearchParams();
  if (!brandId) {
    return;
  }

  const { productsData, productsLoading } = fetchProducts();
  const { brandsData, brandLoading } = fetchBrandById(brandId);
  // const { brandsData, brandLoading } = fetchBrandById(
  //   "690c505f8411f58dd7cb91f3"
  // );

  useEffect(() => {
    if (brandsData?.brand) {
      setData({
        brand: brandsData.brand,
        products: productsData?.products || [],
      });
    }
  }, [brandsData, productsData]);

  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />

      <View
        style={[glStyles.containerInner, { paddingBottom: 10, width: "100%" }]}
      >
        <Pressable onPress={() => router.back()}>
          <AntDesign name="arrow-left" size={24} color={theme.title} />
        </Pressable>

        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <ThemedView
            style={{
              padding: 20,
              borderRadius: 100,
              backgroundColor: theme.cardBackground,
              borderColor: theme.title,
              borderWidth: 2,
              height: 100,
              width: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ThemedText>{data?.brand?.name || "Brand Name"}</ThemedText>
          </ThemedView>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <ThemedText
              style={{
                fontSize: 20,
                // textTransform: "capitalize",
              }}
            >
              {data?.brand?.name || "Brand Name"}
            </ThemedText>
            <Ionicons name="checkmark-circle" size={24} color="green" />
          </View>
          <Text style={{ color: "#ddd", fontFamily: "Urbanist_400Regular" }}>
            {data?.brand?.brand_type?.name || "N/A"}
          </Text>
          <Text
            style={{ color: theme.title, fontFamily: "Urbanist_400Regular" }}
          >
            {brandsData?.products?.length || 0} items
          </Text>
        </View>
        <View style={styles.containerBox}>
          <View
            style={[
              styles.miniBox1,
              {
                color: theme.uiBackground,
                backgroundColor: theme.title,
                borderColor: theme.title,
              },
            ]}
          >
            <Text
              style={{
                color: theme.uiBackground,
                fontFamily: "Urbanist_400Regular",
              }}
            >
              Menswear
            </Text>
          </View>
          <View style={[styles.miniBox2, { borderColor: theme.title }]}>
            <Text
              style={{ color: theme.title, fontFamily: "Urbanist_400Regular" }}
            >
              Womenwears
            </Text>
          </View>
          <View style={[styles.miniBox2, { borderColor: theme.title }]}>
            <Text
              style={{ color: theme.title, fontFamily: "Urbanist_400Regular" }}
            >
              Kidswears
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            // paddingTop: 50,
            paddingBottom: 200,
          }}
        >
          {brandsData ? (
            <ProductGrid
              data={brandsData?.products}
              numColumns={2}
              spacing={12}
              renderItem={({ item }) => (
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
                    <ThemedText
                      style={[styles.productName, { color: theme.title }]}
                    >
                      {item?.title}
                    </ThemedText>
                    <Text style={styles.productBrand}>{item?.brandName}</Text>
                    <ThemedText style={[styles.productPrice]}>
                      {currencyFormatter(item?.pricing?.sellingPrice)}
                    </ThemedText>
                  </View>
                  <Pressable
                    style={{ position: "absolute", bottom: 8, right: 8 }}
                    onPress={() => router.push("/cartDelete")}
                  >
                    <Image
                      source={
                        currentTheme === "dark" ? deleteIcon : deleteDarkIcon
                      }
                    />
                  </Pressable>
                </View>
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
  containerBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
    marginBottom: 20,
  },
  miniBox1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 18,
  },
  miniBox2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 18,
  },
  productCard: {
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
    height: 100,
    resizeMode: "cover",
    borderRadius: 8,
  },
  productInfo: {
    padding: 12,
    fontFamily: "Urbanist_400Regular",
  },
  productName: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
    fontFamily: "Urbanist_400Regular",
  },
  productBrand: {
    color: "#666",
    fontSize: 12,
    marginBottom: 6,
    fontFamily: "Urbanist_400Regular",
  },
  productPrice: {
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Urbanist_400Regular",
  },
});
