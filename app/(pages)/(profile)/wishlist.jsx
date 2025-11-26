import NormalText from "@/component/global/NormalText";
import SearchInput from "@/component/global/SearchInput";
import ThemedText from "@/component/global/ThemedText";
import ThemedTextOpposite from "@/component/global/ThemedTextOpposite";
import ThemedViewOpposite from "@/component/global/ThemedViewOpposite";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { Pressable, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Wishlist() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const glStyles = globalStyles();

  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[glStyles.containerInner, { marginTop: 20 }]}>
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
          <ThemedText style={{ fontSize: 18 }}>Wishlist</ThemedText>
          <View></View>
        </View>
        <SearchInput />
        {/* <View style={{ flexDirection: "row", alignItems: "center", gap: 8, justifyContent: "space-between", marginBottom: 140 }}>
                 <AntDesign name="arrow-left" size={24} color="#fff" /> 
                 <Text style={{fontWeight: "bold", color: "#fff", fontSize: 20}}>Cart</Text>
                 <View></View>
                </View> */}
        {/* <Image
          source={require("../../assets/images/hugeicons_shopping.png")}
          style={{ width: 80, height: 80, alignSelf: "center", marginTop: 100 }}
        /> */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
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
        </View>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/arrival",
              params: { source: "wishlist" },
            })
          }
        >
          <ThemedViewOpposite style={styles.shoppingButton}>
            <ThemedTextOpposite>Start shopping</ThemedTextOpposite>
          </ThemedViewOpposite>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: "#000",
    gap: 28,
    // paddingTop: StatusBar.currentHeight,
  },
  shoppingButton: {
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginTop: 28,
  },
});
