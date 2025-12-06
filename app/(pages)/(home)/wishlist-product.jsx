import { deleteDarkIcon, deleteIcon } from "@/assets/images";
import NormalText from "@/component/global/NormalText";
import SearchInput from "@/component/global/SearchInput";
import ThemedText from "@/component/global/ThemedText";
import ThemedTextOpposite from "@/component/global/ThemedTextOpposite";
import ThemedViewOpposite from "@/component/global/ThemedViewOpposite";
import ProductGrid from "@/component/productGrid";
import { Colors } from "@/constants/Colors";
import { useWishListContext } from "@/contexts/WishListContext";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { currencyFormatter, errorNotification } from "@/utils/helpers";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
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

export default function Trend() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const glStyles = globalStyles();
  const [wishlist, setWishlist] = useState(null);

  const { getFromWishList, deleteWishListItem } = useWishListContext();

  useEffect(() => {
    const runFetch = async () => {
      const result = await getFromWishList();
      if (result) {
        setWishlist(result);
      } else {
        setWishlist(null);
      }
    };
    runFetch();
  }, [getFromWishList]);

  const handleDeleteWishlist = async (productId) => {
    const updatedListItems = await deleteWishListItem(productId);
    if (updatedListItems) {
      setWishlist(updatedListItems);
    } else {
      errorNotification("Failed to delete item.");
    }
  };

  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[glStyles.containerInner, { paddingBottom: 10 }]}>
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
          <Text style={{ color: theme.title, fontSize: 18 }}>Wishlist</Text>
          <Text></Text>
        </View>
        <SearchInput />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {!wishlist || !wishlist.length ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 100,
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <ThemedText style={{ fontWeight: 600, fontSize: 18 }}>
                  0 items found
                </ThemedText>
                <ThemedText>
                  No favorites yet? Top the heart icon to start building
                </ThemedText>
                <NormalText style={{ color: "#ddd" }}>your wishlist</NormalText>
              </View>
              <Pressable onPress={() => router.push("/arrival")}>
                <ThemedViewOpposite style={styles.shoppingButton}>
                  <ThemedTextOpposite>Start shopping</ThemedTextOpposite>
                </ThemedViewOpposite>
              </Pressable>
            </View>
          ) : (
            <ProductGrid
              data={wishlist}
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
                    source={{ uri: item.image }}
                    style={styles.productImage}
                  />
                  <View style={styles.productInfo}>
                    <ThemedText style={[styles.productName]}>
                      {item.productName}
                    </ThemedText>
                    <ThemedText type="subtext" style={styles.productBrand}>
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
                        {currencyFormatter(item.price)}
                      </ThemedText> */}
                      <ThemedText style={{ fontSize: 14, fontWeight: 600 }}>
                        {/* {item.amount} */}
                        {currencyFormatter(item.price)}
                      </ThemedText>
                    </View>
                  </View>
                  <Pressable
                    style={{ position: "absolute", bottom: 14, right: 8 }}
                    onPress={() => handleDeleteWishlist(item.productId)}
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
          )}
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
    padding: 8,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    height: 200,
  },
  productImage: {
    // flex: 1,
    // width: "100%",
    height: 70,
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

  shoppingButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginTop: 28,
  },
});
