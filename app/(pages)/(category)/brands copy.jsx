import { fetchBrands } from "@/API";
import SearchInput from "@/component/global/SearchInput";
import ThemedText from "@/component/global/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";

const letters = Array.from({ length: 26 }, (_, i) => ({
  label: String.fromCharCode(65 + i),
  value: String.fromCharCode(65 + i),
}));

export default function Brands() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;

  const [search, setSearch] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const router = useRouter();

  const { brandsData } = fetchBrands();

  const handleLetterFilter = (letter) => {
    setSelectedLetter(letter);
    if (!brandsData?.brands) return;

    const filtered = brandsData.brands.filter((brand) =>
      brand.name.toUpperCase().startsWith(letter)
    );
    setFilteredBrands(filtered);
  };

  const handleBrandPress = (brand) => {
    router.push({
      pathname: "/brandProfile",
      params: {
        brandId: brand.id,
      },
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.uiBackground }]}
    >
      <View>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <AntDesign name="arrow-left" size={24} color={theme.title} />
          </Pressable>
          <ThemedText style={{ fontSize: 18 }}>Brands</ThemedText>
          <Text></Text>
        </View>

        <SearchInput
          value={search}
          onChangeText={setSearch}
          handleFilter={() => {}}
        />

        <View style={styles.dropdownContainer}>
          <Dropdown
            style={[styles.dropdown, { backgroundColor: theme.cardBackground }]}
            data={letters}
            labelField="label"
            valueField="value"
            placeholder="Select Letter"
            placeholderStyle={{ color: theme.title }}
            selectedTextStyle={{ color: theme.title }}
            value={selectedLetter}
            onChange={(item) => handleLetterFilter(item.value)}
            renderRightIcon={() => (
              <AntDesign name="down" size={16} color={theme.title} />
            )}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100, marginTop: 10 }}
        >
          {filteredBrands.map((brand) => (
            <Pressable
              key={brand.id}
              onPress={() => handleBrandPress(brand)}
              style={{
                padding: 10,
                marginVertical: 5,
                backgroundColor: theme.cardBackground,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: theme.title }}>{brand.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    gap: 10,
  },
  dropdown: {
    width: "100%",
    height: 40,
    paddingHorizontal: 10,
  },
});
