import { fetchProductDetails } from "@/API";
import {
  circleWhite,
  deleteDarkIcon,
  deleteIcon,
  productImg,
  star,
  tw,
} from "@/assets/images";
import NormalText from "@/component/global/NormalText";
import ThemedLoader from "@/component/global/ThemedLoader";
import ThemedText from "@/component/global/ThemedText";
import BuyAddToCartButtons from "@/component/home/product-details/BuyAddToCartButtons";
import ProductSize from "@/component/home/product-details/ProductSize";
import ProductDetailsImageCarousel from "@/component/ProductDetailsImageCarousel";
import ProductGrid from "@/component/productGrid";
import { Colors } from "@/constants/Colors";
import { useCartContext } from "@/contexts/CartContext";
import { useWishListContext } from "@/contexts/WishListContext";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import {
  currencyFormatter,
  errorNotification,
  infoNotification,
} from "@/utils/helpers";
import { FontAwesome } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Accordion from "react-native-collapsible/Accordion";

export default function ProductScreen() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const glStyles = globalStyles();
  const router = useRouter();
  const [selectedVariant, setselectedVariant] = useState([]);
  const [activeSections, setactiveSections] = useState([]);
  const [accordionData, setaccordionData] = useState();

  const { addToCart } = useCartContext();
  const { addToWishList } = useWishListContext();

  let params = useLocalSearchParams();
  let { id } = params;
  if (!id) {
    return;
  }
  const { productData, productLoading } = fetchProductDetails(id);

  useEffect(() => {
    if (productData) {
      let accordArr = [
        {
          header: "Description",
          content: productData?.description,
        },
        {
          header: "Key Features",
          content: productData?.keyFeatures,
        },
        {
          header: "Estimated Delivey",
          content: `${productData?.shipping?.dropOffTimeDays} days`,
        },
        {
          header: "Shipping & Refund Policy",
          content: "",
        },
        {
          header: "Virtual try-on",
          content: "",
        },
      ];
      setaccordionData(accordArr);
    }
  }, [productData]);

  const handleAddToCart = async () => {
    if (productData?.hasVariants && selectedVariant.length === 0) {
      errorNotification("Please select a size and color");
    } else if (productData?.hasVariants) {
      selectedVariant.forEach((item) => {
        async function func() {
          await addToCart({
            sellerId: productData.sellerId,
            productId: productData?._id,
            productName: productData?.title,
            brandName: productData?.brandName,
            size: item?.size,
            color: item?.color,
            quantity: 1,
            price: productData?.pricing?.sellingPrice,
            image: item?.image,
          });
        }
        func();
      });
    } else {
      async function func() {
        await addToCart({
          sellerId: productData.sellerId,
          productId: productData?._id,
          productName: productData?.title,
          brandName: productData?.brandName,
          size: null,
          color: null,
          quantity: 1,
          price: productData?.pricing?.sellingPrice,
          image: productData?.images[0]?.url,
        });
      }
      func();
    }
  };

  const handleAddToWishList = async () => {
    try {
      const image =
        productData?.images?.[0]?.url ||
        productData?.variants?.[0]?.images?.[0]?.url ||
        productData?.variants?.images?.[0]?.url ||
        "";
      const result = await addToWishList({
        productId: productData?._id,
        productName: productData?.title,
        brandName: productData?.brandName,
        price: productData?.pricing?.sellingPrice,
        image: image,
      });
      if (result) {
        infoNotification("Item added to wishlist");
      } else if (result === null) {
        errorNotification("Item already exists in the cart");
      }
    } catch (error) {
      console.log("handle wishlist error", error);
      errorNotification("Failed to add item to cart. Please try again!");
    }
  };

  const accordTitle = (data) => {
    return <View>{/* <Text>{data.answer}</Text> */}</View>;
  };
  const accordHeader = (data, index, isActive, sections) => {
    return (
      <Animatable.View
        style={{
          borderBottomColor: !isActive && theme.placeholder,
          borderBottomWidth: !isActive && 0.5,
          borderRadius: isActive && 10,
          paddingBottom: 3,
          marginTop: 20,
        }}
        duration={300}
        transition={theme.placeholder}
      >
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedText style={{ fontSize: 16 }}>{data.header}</ThemedText>
          <Entypo
            name={isActive ? "chevron-small-up" : "chevron-small-down"}
            size={24}
            color={theme.title}
          />
        </View>
      </Animatable.View>
    );
  };
  const accordContent = (data, i, isActive) => {
    return (
      <View
        style={{
          borderBottomColor: isActive && theme.placeholder,
          borderBottomWidth: isActive && 0.5,
          // height: "max-content",
        }}
      >
        <ThemedText
          type="subtext"
          style={{
            paddingBottom: 8,
            // fontSize: 18
          }}
        >
          {data.content}
        </ThemedText>
      </View>
    );
  };

  const handleUpdateSection = (data) => {
    setactiveSections(data);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.uiBackground }}>
      {productData ? (
        <ProductDetailsImageCarousel
          variants={productData?.variants}
          height={"100%"}
          handleAddToWishList={handleAddToWishList}
        />
      ) : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        {productData ? (
          <View
            style={[
              glStyles.containerInner,
              { gap: 16, paddingTop: 10, paddingBottom: 100 },
            ]}
          >
            <Text
              style={{
                color: "#ddd",
                fontSize: 18,
                fontFamily: "Urbanist_400Regular",
              }}
            >
              {productData?.brandName}
            </Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "centstarter",
                  gap: 5,
                  maxWidth: "75%",
                }}
              >
                <View style={{ maxWidth: "85%" }}>
                  <ThemedText
                    style={{ fontSize: 18, fontWeight: 600, textWrap: "wrap" }}
                  >
                    {productData?.title}
                  </ThemedText>
                </View>
                <NormalText style={{ color: "green" }}>in stock</NormalText>
              </View>
              <ThemedText
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                {currencyFormatter(productData?.pricing?.sellingPrice)}
              </ThemedText>
            </View>
            <View
              style={{ flexDirection: "row", alignContent: "center", gap: 6 }}
            >
              <View
                style={{ flexDirection: "row", alignContent: "center", gap: 5 }}
              >
                {Array.from(
                  { length: Math.floor(productData?.rating) },
                  (_, i) => (
                    <FontAwesome
                      name="star"
                      key={i}
                      size={18}
                      color="#ffaa00"
                    />
                  )
                )}
                {productData?.rating.toString().includes(".") ? (
                  <FontAwesome name="star-half" size={18} color="#ffaa00" />
                ) : null}
              </View>
              <ThemedText>4.5</ThemedText>
              <ThemedText>1.2k (reviews)</ThemedText>
            </View>

            {/* product size */}
            {productData && productData?.hasVariants && (
              <ProductSize
                data={productData?.variants}
                selectedVariant={selectedVariant}
                setselectedVariant={setselectedVariant}
              />
            )}

            {accordionData && (
              <View style={{ marginTop: -10 }}>
                <Accordion
                  sections={accordionData}
                  activeSections={activeSections}
                  renderSectionTitle={accordTitle}
                  renderHeader={accordHeader}
                  renderContent={accordContent}
                  onChange={handleUpdateSection}
                />
              </View>
            )}

            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "space-between",
                backgroundColor: theme.cardBackground,
                width: "100%",
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 10,
                marginTop: 5,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image source={circleWhite} style={{ height: 5, width: 5 }} />
                <ThemedText>Hellen Walter</ThemedText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  gap: 5,
                  justifyContent: "center",
                }}
              >
                <ThemedText>Contact us</ThemedText>
                <FontAwesome6 name="arrow-right" size={15} color={theme.text} />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "space-between",
              }}
            >
              <ThemedText
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                Product review
              </ThemedText>
              <ThemedText
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                See all
              </ThemedText>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <Image source={tw} />
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    gap: 10,
                  }}
                >
                  <Image source={star} />
                  <Image source={star} />
                  <Image source={star} />
                  <Image source={star} />
                  <Image source={star} />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    gap: 10,
                  }}
                >
                  <ThemedText>Theresa Wbb</ThemedText>
                  <NormalText style={{ color: "#ddd" }}>May 1, 2022</NormalText>
                </View>
                <View>
                  <NormalText style={{ color: "#ddd" }}>
                    Cursus sit amet dictum sit amet justo danec enim
                  </NormalText>
                  <NormalText style={{ color: "#ddd" }}>
                    Commodo ulercorper a lacus
                  </NormalText>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "space-between",
              }}
            >
              <ThemedText
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                You may also like
              </ThemedText>
              <ThemedText
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                See all
              </ThemedText>
            </View>
            <ProductGrid
              data={productData.relatedProducts}
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
                        uri: item.variants?.[0]?.images?.[0]?.url
                          ? item.variants?.[0]?.images?.[0]?.url
                          : item.images?.length
                          ? item?.images[0]?.url
                          : productImg,
                      }}
                      style={styles.productImage}
                    />
                    <View style={styles.productInfo}>
                      <ThemedText
                        style={[styles.productName, { color: theme.title }]}
                      >
                        {item.title}
                      </ThemedText>
                      <ThemedText style={styles.productBrand}>
                        {item.brandName}
                      </ThemedText>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        {/* <ThemedText
                        style={[styles.productPrice, { color: "#DB0104" }]}
                      >
                        {item.pricing?.sellingPrice}
                      </ThemedText> */}
                        <ThemedText style={{ fontSize: 14, fontWeight: 600 }}>
                          {item.pricing?.sellingPrice}
                        </ThemedText>
                      </View>
                    </View>
                    <Pressable
                      style={{ position: "absolute", bottom: 12, right: 8 }}
                      onPress={() => router.push("/cartDelete")}
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
          </View>
        ) : productLoading ? (
          <View
            style={{
              height: 800,
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
      <BuyAddToCartButtons handleAddToCart={handleAddToCart} />
    </View>
  );
}

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
    // backgroundColor: "#fff",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  box2: {
    flex: 1, // equal space for both
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
  productCard: {
    padding: 15,
    borderRadius: 8,
    overflow: "hidden",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    height: 250,
  },
  productImage: {
    // flex: 1,
    width: "100%",
    height: 120,
    // resizeMode: "contain",
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
    fontSize: 10,
    color: "#fff",
  },
  images: {
    width: "100%",
    resizeMode: "contain",
  },

  sizeBox: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    width: "max-content",
    borderWidth: 0.4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    padding: 3,
  },
});
