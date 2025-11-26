import { fetchBrands } from "@/API";
import SearchInput from "@/component/global/SearchInput";
import ThemedText from "@/component/global/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Brands() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;

  const [search, setSearch] = useState();
  const [brandsArr, setbrandsArr] = useState();
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState();
  const router = useRouter();

  const { brandsData } = fetchBrands();

  console.log("brandsArr", JSON.stringify(brandsArr, null, 2));

  useEffect(() => {
    if (brandsArr) {
      const groupedData = brandsArr.reduce((accumulator, currentItem) => {
        const name = currentItem.name?.toUpperCase().charAt(0);
        if (!accumulator[name]) {
          accumulator[name] = [];
        }
        accumulator[name].push(currentItem);
        return accumulator;
      }, {});
      const resultArray = Object.entries(groupedData).map(([key, value]) => ({
        [key]: value,
      }));

      const newArray = [];
      for (var i = 0; i < resultArray.length; i++) {
        const newObj = {
          group: Object.keys(resultArray[i])[0],
          brands: resultArray[i][Object.keys(resultArray[i])[0]],
        };
        newArray.push(newObj);
      }
      setFilteredBrands(newArray);
    }
  }, [brandsArr]);

  useEffect(() => {
    if (brandsData) {
      let dataArr = brandsData?.brands;
      setbrandsArr(dataArr);
    }
  }, [brandsData]);

  useEffect(() => {
    let dataArr = brandsArr;
    if (search && search?.length) {
      let searchedDataArr = dataArr?.filter((ele) =>
        ele?.name?.toLowerCase()?.includes(search?.toLowerCase())
      );
      setbrandsArr(searchedDataArr);
    } else {
      setbrandsArr(dataArr);
    }
  }, [search]);

  // console.log("brandsArr", JSON.stringify(brandsArr, null, 2));

  const handleBrandPress = (brand) => {
    router.push({
      pathname: "/brandProfile",
      params: {
        brandId: brand.id,
      },
    });
  };

  const handleCurrentViewable = (item) => {
    if (!selectedGroup || selectedGroup?.group !== item?.group) {
      setSelectedGroup(item.group);
      setSelectedBrands(item.brands);
    } else {
      setSelectedGroup();
      setSelectedBrands();
    }
  };

  // console.log("brandsArr", typeof brandsArr);
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
          // handleFilter={() => {}}
        />

        {/* <View style={styles.dropdownContainer}>
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
        </View> */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100, marginTop: 10 }}
        >
          {filteredBrands.map((item, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <Pressable
                onPress={() => handleCurrentViewable(item)}
                style={{
                  padding: 12,
                  marginVertical: 5,
                  backgroundColor: theme.cardBackground,
                  borderRadius: 8,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <ThemedText style={{ fontSize: 17 }}>{item.group}</ThemedText>
                <AntDesign name="down" size={15} color={theme.title} />
              </Pressable>
              {selectedGroup && selectedGroup === item.group ? (
                <View
                  style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 8,
                    marginTop: 5,
                    paddingLeft: 7,
                  }}
                >
                  {selectedBrands?.map((ele, index) => (
                    <Pressable
                      key={index}
                      onPress={() => handleBrandPress(ele)}
                    >
                      <ThemedText
                        style={{
                          fontSize: 17,
                          paddingVertical: 3,
                          textTransform: "capitalize",
                        }}
                      >
                        {ele.name}
                      </ThemedText>
                    </Pressable>
                  ))}
                </View>
              ) : null}
            </View>
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
