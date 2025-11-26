import {
  black,
  blue,
  brown,
  gray,
  green,
  lightBlue,
  orange,
  pink,
  purple,
  red,
  star,
  value,
  white,
  yellow,
} from "@/assets/images";
import NormalText from "@/component/global/NormalText";
import ThemedText from "@/component/global/ThemedText";
import ThemedTextOpposite from "@/component/global/ThemedTextOpposite";
import ThemedViewOpposite from "@/component/global/ThemedViewOpposite";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartDetails() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const glStyles = globalStyles();

  const [filters, setFilters] = useState({
    newArrival: false,
    popular: false,
    topRated: false,
    highPrice: false,
    lowPrice: false,
    discount: false,
    dresses: false,
    tops: false,
    skirts: false,
    jeans: false,
    jumpsuit: false,
    joggers: false,
    playsuit: false,
    shirts: false,
    veeke: false,
    adamas: false,
    brown: false,
    awa: false,
    factory: false,
    tafiri: false,
  });

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
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
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20, gap: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Link href="home" replace>
              <AntDesign name="arrow-left" size={24} color={theme.title} />
            </Link>
            <ThemedText
              style={[
                styles.headerTitle,
              ]}
            >
              Filter
            </ThemedText>
            <NormalText style={{ color: "#ddd" }}>
              Clear all
            </NormalText>
          </View>

          {/* Collection Section */}
          <ThemedText
            style={[
              styles.sectionTitle,
            ]}
          >
            Collection
          </ThemedText>

          <View style={styles.row}>
            <FilterCheckbox
              label="New Arrival"
              value={filters.newArrival}
              onChange={() => toggleFilter("newArrival")}
              theme={theme}
            />
            <FilterCheckbox
              label="Popular"
              value={filters.popular}
              onChange={() => toggleFilter("popular")}
              theme={theme}
            />
            <FilterCheckbox
              label="Top Rated"
              value={filters.topRated}
              onChange={() => toggleFilter("topRated")}
              theme={theme}
            />
          </View>

          <View style={styles.row}>
            <FilterCheckbox
              label="High Price"
              value={filters.highPrice}
              onChange={() => toggleFilter("highPrice")}
              theme={theme}
            />
            <FilterCheckbox
              label="Low Price"
              value={filters.lowPrice}
              onChange={() => toggleFilter("lowPrice")}
              theme={theme}
            />
            <FilterCheckbox
              label="Discount"
              value={filters.discount}
              onChange={() => toggleFilter("discount")}
              theme={theme}
            />
          </View>

          {/* Categories */}
          <ThemedText
            style={[
              styles.sectionTitle,
            ]}
          >
            Categories
          </ThemedText>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <View style={[styles.miniBox, { borderColor: theme.title }]}>
              <ThemedText>
                Men
              </ThemedText>
            </View>

            <View
              style={[
                styles.miniBox,
                { backgroundColor: theme.title, borderColor: theme.title },
              ]}
            >
              <Text
                style={{
                  color: theme.uiBackground,
                  fontFamily: "Urbanist_400Regular",
                }}
              >
                Women
              </Text>
            </View>

            <View style={[styles.miniBox, { borderColor: theme.title }]}>
              <ThemedText>
                Kids
              </ThemedText>
            </View>
          </View>
          <ThemedText>
            Sub Category
          </ThemedText>
          <View style={styles.row}>
            <FilterCheckbox
              label="Dresses"
              value={filters.newArrival}
              onChange={() => toggleFilter("dresses")}
              theme={theme}
            />
            <FilterCheckbox
              label="Tops"
              value={filters.popular}
              onChange={() => toggleFilter("tops")}
              theme={theme}
            />
            <FilterCheckbox
              label="Skirts"
              value={filters.topRated}
              onChange={() => toggleFilter("skirts")}
              theme={theme}
            />

            <FilterCheckbox
              label="Jeans"
              value={filters.topRated}
              onChange={() => toggleFilter("jeans")}
              theme={theme}
            />
          </View>

          <View style={styles.row}>
            <FilterCheckbox
              label="Jumpsuit"
              value={filters.highPrice}
              onChange={() => toggleFilter("jumpsuit")}
              theme={theme}
            />
            <FilterCheckbox
              label="Joggers"
              value={filters.lowPrice}
              onChange={() => toggleFilter("joggers")}
              theme={theme}
            />
            <FilterCheckbox
              label="Playsuit"
              value={filters.discount}
              onChange={() => toggleFilter("playsuit")}
              theme={theme}
            />
            <FilterCheckbox
              label="Shirts"
              value={filters.discount}
              onChange={() => toggleFilter("shirt")}
              theme={theme}
            />
          </View>
          <ThemedText>
            Price
          </ThemedText>
          <Image source={value} style={{ width: "100%" }} />
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <View style={[styles.box, { borderColor: theme.title }]}>
              <ThemedText>
                $70
              </ThemedText>
            </View>
            <View style={[styles.box, { borderColor: theme.title }]}>
              <ThemedText>
                $600
              </ThemedText>
            </View>
          </View>
          <ThemedText>
            Rating
          </ThemedText>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={[styles.starBox, { borderColor: theme.title, gap: 6 }]}
            >
              <Image source={star} resizeMode="contain" />
              <ThemedText>
                5
              </ThemedText>
            </View>
            <View
              style={[styles.starBox, { borderColor: theme.title, gap: 6 }]}
            >
              <Image source={star} resizeMode="contain" />
              <ThemedText>
                4 & up
              </ThemedText>
            </View>
            <View
              style={[styles.starBox, { borderColor: theme.title, gap: 6 }]}
            >
              <Image source={star} resizeMode="contain" />
              <ThemedText>
                3 & up
              </ThemedText>
            </View>
            <View
              style={[styles.starBox, { borderColor: theme.title, gap: 6 }]}
            >
              <Image source={star} resizeMode="contain" />
              <ThemedText>
                2 & up
              </ThemedText>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={[styles.starBox, { borderColor: theme.title, gap: 6 }]}
            >
              <Image source={star} resizeMode="contain" />
              <ThemedText>
                5
              </ThemedText>
            </View>
            <View
              style={[styles.starBox, { borderColor: theme.title, gap: 6 }]}
            >
              <Image source={star} resizeMode="contain" />
              <ThemedText>
                4 & up
              </ThemedText>
            </View>
            <View
              style={[styles.starBox, { borderColor: theme.title, gap: 6 }]}
            >
              <Image source={star} resizeMode="contain" />
              <ThemedText>
                3 & up
              </ThemedText>
            </View>
            <View
              style={[styles.starBox, { borderColor: theme.title, gap: 6 }]}
            >
              <Image source={star} resizeMode="contain" />
              <ThemedText>
                2 & up
              </ThemedText>
            </View>
          </View>
          <ThemedText>
            Size
          </ThemedText>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={[styles.box, { borderColor: theme.title, gap: 6 }]}>
              <ThemedText>
                3XS
              </ThemedText>
            </View>
            <View style={[styles.box, { borderColor: theme.title, gap: 6 }]}>
              <ThemedText>
                XXS
              </ThemedText>
            </View>
            <View style={[styles.box, { borderColor: theme.title, gap: 6 }]}>
              <ThemedText>
                XS
              </ThemedText>
            </View>
            <View style={[styles.box, { borderColor: theme.title, gap: 6 }]}>
              <ThemedText>
                M
              </ThemedText>
            </View>
            <View style={[styles.box, { borderColor: theme.title, gap: 6 }]}>
              <ThemedText>
                XL
              </ThemedText>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={[styles.box, { borderColor: theme.title, gap: 6 }]}>
              <ThemedText>
                L
              </ThemedText>
            </View>
            <View style={[styles.box, { borderColor: theme.title, gap: 6 }]}>
              <ThemedText>
                XXL
              </ThemedText>
            </View>
            <View style={[styles.box, { borderColor: theme.title, gap: 6 }]}>
              <ThemedText>
                3XL
              </ThemedText>
            </View>
            <View style={[styles.box, { borderColor: theme.title, gap: 6 }]}>
              <ThemedText>
                4XL
              </ThemedText>
            </View>
            <View></View>
          </View>
          {/* Colors */}
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ gap: 6 }}>
              <Image source={purple} />
              <ThemedText>
                Purple
              </ThemedText>
            </View>
            <View style={{ gap: 6 }}>
              <Image source={black} />
              <ThemedText
              >
                Black
              </ThemedText>
            </View>
            <View style={{ gap: 6 }}>
              <Image source={red} />
              <ThemedText
              >
                Red
              </ThemedText>
            </View>
            <View>
              <Image source={orange} />
              <ThemedText
              >
                Orange
              </ThemedText>
            </View>
            <View>
              <Image source={blue} />
              <ThemedText
              >
                Navy
              </ThemedText>
            </View>
            <View style={{ gap: 6 }}>
              <Image source={white} />
              <ThemedText
              >
                White
              </ThemedText>
            </View>
            <View style={{ gap: 6 }}>
              <Image source={yellow} />
              <ThemedText
              >
                Yellow
              </ThemedText>
            </View>
          </View>
          {/* Color second row */}
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ gap: 6 }}>
              <Image source={gray} />
              <ThemedText
              >
                Gray
              </ThemedText>
            </View>
            <View style={{ gap: 6 }}>
              <Image source={pink} />
              <ThemedText
              >
                Pink
              </ThemedText>
            </View>
            <View style={{ gap: 6 }}>
              <Image source={lightBlue} />
              <ThemedText
              >
                Blue
              </ThemedText>
            </View>
            <View style={{ gap: 6 }}>
              <Image source={brown} />
              <ThemedText
              >
                Brown
              </ThemedText>
            </View>
            <View style={{ gap: 6 }}>
              <Image source={green} />
              <ThemedText
              >
                Green
              </ThemedText>
            </View>
            <View></View>
            <View></View>
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
              }}
            >
              Brands
            </ThemedText>
            <Feather
              name="search"
              size={24}
              color={theme.title}
              style={styles.icon}
            />
          </View>
          <View style={{ gap: 10 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <FilterCheckbox
                label="adamas"
                value={filters.topRated}
                onChange={() => toggleFilter("adamas")}
                theme={theme}
              />
              <ThemedText
              >
                Adamas Paris
              </ThemedText>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <FilterCheckbox
                label="awa"
                value={filters.topRated}
                onChange={() => toggleFilter("awa")}
                theme={theme}
              />
              <ThemedText
              >
                Awa Meite
              </ThemedText>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <FilterCheckbox
                label="brown"
                value={filters.topRated}
                onChange={() => toggleFilter("brown")}
                theme={theme}
              />
              <ThemedText
              >
                Christien Brown
              </ThemedText>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <FilterCheckbox
                label="tafiri"
                value={filters.topRated}
                onChange={() => toggleFilter("tafiri")}
                theme={theme}
              />
              <ThemedText
              >
                Ejiro Amos Tafiri
              </ThemedText>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <FilterCheckbox
                label="factory"
                value={filters.topRated}
                onChange={() => toggleFilter("factory")}
                theme={theme}
              />
              <ThemedText
              >
                Fia Factory
              </ThemedText>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <FilterCheckbox
                label="veeke"
                value={filters.topRated}
                onChange={() => toggleFilter("veeke")}
                theme={theme}
              />
              <ThemedText
              >
                Veeke James
              </ThemedText>
            </View>
          </View>
          <View style={styles.registerContainer}>
            <ThemedViewOpposite style={styles.box1}>
              <ThemedTextOpposite style={styles.boxText1}>
                Apply
              </ThemedTextOpposite>
            </ThemedViewOpposite>
            <View
              style={[
                styles.box2,
                { borderColor: theme.title, fontFamily: "Urbanist_400Regular" },
              ]}
            >
              <Text
                style={[
                  styles.boxText2,
                  { color: theme.title, fontFamily: "Urbanist_400Regular" },
                ]}
              >
                Reset
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/* Reusable Checkbox Item */
function FilterCheckbox({ label, value, onChange, theme }) {
  return (
    <View style={styles.checkboxRow}>
      <Checkbox
        value={value}
        onValueChange={onChange}
        color={value ? theme.checkBox : undefined}
        style={{ borderWidth: 1.5, borderColor: theme.title }}
      />
      <ThemedText
        style={{
          fontSize: 16,
        }}
      >
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkboxRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  miniBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 18,
  },

  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },
  starBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  box1: {
    flex: 1,
    // backgroundColor: "#fff",
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  box2: {
    flex: 1, // equal space for both
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  boxText1: {
    fontSize: 16,
    fontWeight: "bold",
  },
  boxText2: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
