import { fetchProducts } from "@/API";
import {
  deleteDarkIcon,
  deleteIcon,
  heroSectionImage,
  productImg,
} from "@/assets/images";
import NormalText from "@/component/global/NormalText";
import SearchInput from "@/component/global/SearchInput";
import ThemedLoader from "@/component/global/ThemedLoader";
import ThemedText from "@/component/global/ThemedText";
import HomeHeader from "@/component/home/HomeHeader";
import ProductGrid from "@/component/productGrid";
import { Colors } from "@/constants/Colors";
import { homeData } from "@/data";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { homeStyles } from "@/styles/homeStyle";
import { Link, router } from "expo-router";
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

export default function Home() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;

  const glStyles = globalStyles();
  const { productsData, productsLoading } = fetchProducts();
  const [newArrival, setnewArrival] = useState();

  useEffect(() => {
    if (productsData) {
      let dataArr = productsData?.products?.slice(0, 2);
      setnewArrival(dataArr);
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
      <HomeHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View style={glStyles.containerInner}>
          <SearchInput handleFilter={() => router.push("/filterBy")} />

          <Image
            source={heroSectionImage}
            style={{
              resizeMode: "contain",
              width: "100%",
              borderRadius: 8,
              marginBottom: 8,
            }}
          />

          {/* Home menu section */}
          <View style={homeStyles.containerBox}>
            <View
              style={[
                homeStyles.miniBox1,
                { borderColor: theme.title, backgroundColor: theme.title },
              ]}
            >
              <NormalText
                style={{
                  color: theme.uiBackground,
                }}
              >
                All
              </NormalText>
            </View>
            <Pressable onPress={() => router.push("/men")}>
              <View style={[homeStyles.miniBox2, { borderColor: theme.title }]}>
                <ThemedText>Men</ThemedText>
              </View>
            </Pressable>
            <Pressable onPress={() => router.push("/women")}>
              <View style={[homeStyles.miniBox2, { borderColor: theme.title }]}>
                <ThemedText>Women</ThemedText>
              </View>
            </Pressable>
            <Pressable onPress={() => router.push("/kids")}>
              <View style={[homeStyles.miniBox2, { borderColor: theme.title }]}>
                <ThemedText>Kids</ThemedText>
              </View>
            </Pressable>
          </View>

          {newArrival ? (
            <ProductGrid
              data={newArrival}
              numColumns={2}
              spacing={12}
              renderItem={({ item }) => (
                <View
                  style={[
                    homeStyles.productCard,
                    {
                      backgroundColor: theme.cardBackground,
                      shadowColor: theme.title,
                      shadowOffset: { width: 2, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 5,
                      elevation: 5,
                    },
                  ]}
                >
                  <Pressable
                    onPress={() =>
                      router.push({
                        pathname: "/product-details",
                        params: { id: item._id },
                      })
                    }
                  >
                    {/* <View style={{ height: 300 }}> */}
                    <Image
                      source={{
                        uri: item.variants?.[0]?.images?.[0]?.url
                          ? item.variants?.[0]?.images?.[0]?.url
                          : item.images?.length
                          ? item?.images[0]?.url
                          : productImg,
                      }}
                      style={[homeStyles.productImage, { height: 150 }]}
                    />
                    {/* </View> */}
                  </Pressable>

                  <View style={homeStyles.productInfo}>
                    <NormalText
                      style={[homeStyles.productName, { color: theme.text }]}
                    >
                      {item.title}
                    </NormalText>
                    <NormalText
                      style={[homeStyles.productBrand, { color: theme.text }]}
                    >
                      {item.brandName}
                    </NormalText>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <NormalText style={[homeStyles.productPrice]}>
                        {item.pricing?.sellingPrice}
                      </NormalText>
                      <ThemedText style={[homeStyles.productAmount]}>
                        {item.amount}
                      </ThemedText>
                    </View>

                    <Pressable
                      style={{ position: "absolute", bottom: 8, right: 8 }}
                      // onPress={() => router.replace("/cartDelete")}
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
                </View>
              )}
            />
          ) : productsLoading ? (
            <View
              style={{
                height: 100,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ThemedLoader />
            </View>
          ) : null}

          <ThemedText>Trending</ThemedText>
          <ProductGrid
            data={homeData.trending}
            numColumns={2}
            spacing={12}
            renderItem={({ item, index }) => (
              <View>
                {index === 1 ? (
                  <Link href={"/trending"}>
                    <Image
                      source={item.image}
                      style={homeStyles.productImage}
                    />
                  </Link>
                ) : (
                  <Link href={"/trending"}>
                    <Image
                      source={item.image}
                      style={homeStyles.productImage}
                    />
                  </Link>
                )}
              </View>
            )}
          />
          <ThemedText>New Arrival</ThemedText>
          <ProductGrid
            data={homeData.arrival}
            numColumns={2}
            spacing={12}
            renderItem={({ item, index }) => (
              <View>
                {index === 1 ? (
                  <Link href={"/arrival"}>
                    <Image
                      source={item.image}
                      style={homeStyles.productImage}
                    />
                  </Link>
                ) : (
                  <Link href={"/arrival"}>
                    <Image
                      source={item.image}
                      style={homeStyles.productImage}
                    />
                  </Link>
                )}
              </View>
            )}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <NormalText
              style={{ color: theme.title, fontFamily: "Urbanist_400Regular" }}
            >
              Top Brands
            </NormalText>
            <Pressable onPress={() => router.push("brands")}>
              <ThemedText>See all</ThemedText>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Image
              source={require("../../assets/products/nike-icon.png")}
              style={{ resizeMode: "contain" }}
            />
            <Image
              source={require("../../assets/products/hm-icon.png")}
              style={{ resizeMode: "contain" }}
            />
            <Image
              source={require("../../assets/products/levis-icon.png")}
              style={{ resizeMode: "contain" }}
            />
            <Image
              source={require("../../assets/products/polo-icon.png")}
              style={{ resizeMode: "contain" }}
            />
            <Image
              source={require("../../assets/products/polo-2.png")}
              style={{ resizeMode: "contain" }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Image
              source={require("../../assets/products/nike-icon.png")}
              style={{ resizeMode: "contain" }}
            />
            <Image
              source={require("../../assets/products/hm-icon.png")}
              style={{ resizeMode: "contain" }}
            />
            <Image
              source={require("../../assets/products/levis-icon.png")}
              style={{ resizeMode: "contain" }}
            />
            <Image
              source={require("../../assets/products/polo-icon.png")}
              style={{ resizeMode: "contain" }}
            />
            <Image
              source={require("../../assets/products/polo-2.png")}
              style={{ resizeMode: "contain" }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  productCard: {
    padding: 8,
    borderRadius: 8,
    overflow: "hidden",
    height: 500,
  },
  productImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#fff",
    marginBottom: 4,
  },
  productBrand: {
    color: "#666",
    fontSize: 12,
    marginBottom: 6,
  },
  productPrice: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#fff",
  },
});
