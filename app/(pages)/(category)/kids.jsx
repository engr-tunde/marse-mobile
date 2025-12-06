import { fetchProducts } from "@/API";
import { deleteDarkIcon, deleteIcon } from "@/assets/images";
import ProductsUnavailable from "@/component/global/ProductsUnavailable";
import SearchInput from "@/component/global/SearchInput";
import ThemedLoader from "@/component/global/ThemedLoader";
import ThemedText from "@/component/global/ThemedText";
import ProductGrid from "@/component/productGrid";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { currencyFormatter } from "@/utils/helpers";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Kids() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const glStyles = globalStyles();
  const router = useRouter();

  const { productsData, productsLoading } = fetchProducts();
  const [kidsProductsData, setKidsProductsData] = useState();

  useEffect(() => {
    if (productsData) {
      let dataArr = productsData?.products;
      dataArr = dataArr?.filter(
        (ele) =>
          ele?.category?.name?.toLowerCase()?.includes("kid") ||
          ele?.subcategory?.name?.toLowerCase()?.includes("kid") ||
          ele?.title?.toLowerCase()?.includes("kid")
      );
      setKidsProductsData(dataArr);
    }
  }, [productsData]);

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
            alignContent: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <Pressable onPress={() => router.back()}>
            <AntDesign name="arrow-left" size={24} color={theme.title} />
          </Pressable>
          <ThemedText style={{ fontWeight: 700, fontSize: 20 }}>
            Kids
          </ThemedText>
          <View></View>
        </View>
        <SearchInput />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {kidsProductsData && kidsProductsData?.length ? (
            <ProductGrid
              data={kidsProductsData}
              numColumns={2}
              spacing={12}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/product-details",
                      params: { id: item._id },
                    })
                  }
                >
                  <View
                    style={[
                      styles.productCard,
                      {
                        backgroundColor: theme.cardBackground,
                        shadowColor: theme.title,
                      },
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
                      <ThemedText type="subtext" style={styles.productBrand}>
                        {item?.brandName}
                      </ThemedText>
                      <ThemedText style={[styles.productPrice]}>
                        {currencyFormatter(item?.pricing?.sellingPrice)}
                      </ThemedText>
                    </View>
                    <Pressable
                      style={{ position: "absolute", bottom: 8, right: 8 }}
                      onPress={() =>
                        router.push({
                          pathname: "/product-details",
                          params: { id: item._id },
                        })
                      }
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
          ) : kidsProductsData && kidsProductsData?.length < 1 ? (
            <ProductsUnavailable
              title="Products not avilable"
              message="No products available for this category at this time."
            />
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  productCard: {
    padding: 15,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    height: 200,
    margin: 5,
  },
  productImage: {
    // flex: 1,
    // width: "100%",
    height: 60,
    resizeMode: "cover",
    borderRadius: 8,
  },
  productInfo: {
    marginTop: 12,
  },
  productName: {
    fontWeight: "bold",
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
