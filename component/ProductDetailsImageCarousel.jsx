import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const ProductDetailsImageCarousel = ({
  variants,
  height = 400,
  handleAddToWishList,
}) => {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;

  let images = [];
  variants.forEach((element) => {
    element?.images.forEach((child) => {
      images.push(child?.url);
    });
  });

  const glStyles = globalStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const goPrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <View style={[styles.container]}>
      {/* Main Image with icons side by side */}
      <View style={styles.imageWrapper}>
        <View style={styles.upperIcons}>
          <Pressable
            onPress={() => router.back()}
            style={[
              {
                padding: 5,
                backgroundColor: theme.uiBackground,
                borderRadius: "50%",
              },
            ]}
          >
            <AntDesign name="arrow-left" size={20} color={theme.title} />
          </Pressable>
          <Pressable
            onPress={handleAddToWishList}
            style={{
              backgroundColor: theme.uiBackground,
              borderRadius: "50%",
              padding: 5,
            }}
          >
            {/* <Image source={love} /> */}
            <Entypo name="heart-outlined" size={25} color={theme.title} />
          </Pressable>
        </View>

        {/* Left Icon */}
        <TouchableOpacity
          style={[styles.iconLeft, { backgroundColor: theme.uiBackground }]}
          onPress={goPrev}
        >
          <EvilIcons
            name="chevron-left"
            size={24}
            color={theme.title}
            // color="#000"
          />
        </TouchableOpacity>

        <Image
          source={{ uri: images[selectedIndex] }}
          style={[styles.mainImage, { height }]}
        />

        {/* Right Icon */}
        <TouchableOpacity
          style={[styles.iconRight, { backgroundColor: theme.uiBackground }]}
          onPress={goNext}
        >
          <EvilIcons name="chevron-right" size={24} color={theme.title} />
        </TouchableOpacity>

        {/* Thumbnails positioned at bottom */}
        <View style={styles.thumbnailContainer}>
          <FlatList
            data={images}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => setSelectedIndex(index)}>
                <Image
                  source={{ uri: item }}
                  style={[
                    styles.thumbnail,
                    index === selectedIndex && styles.activeThumbnail,
                  ]}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "50%",
  },
  imageWrapper: {
    position: "relative",
  },
  mainImage: {
    width: width,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    resizeMode: "cover",
  },
  upperIcons: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 50,
    left: 0,
    paddingHorizontal: 10,
    zIndex: 2000,
  },
  iconLeft: {
    position: "absolute",
    left: 6,
    top: "50%",
    zIndex: 1,
    paddingHorizontal: 5,
  },
  iconRight: {
    position: "absolute",
    right: 6,
    top: "50%",
    zIndex: 1,
    paddingHorizontal: 5,
  },
  thumbnailContainer: {
    position: "absolute",
    bottom: 16, // distance from bottom of main image
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 10,
    marginRight: 64,
    marginLeft: 64,
  },
  thumbnail: {
    width: 45,
    height: 45,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  activeThumbnail: {
    borderColor: "black",
  },
});

export default ProductDetailsImageCarousel;
