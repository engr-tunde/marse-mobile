import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { Tabs } from "expo-router";
import { Image, Platform, StyleSheet } from "react-native";

export default function Layout() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.dark;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.title,
        tabBarInactiveTintColor: theme.inactiveIcon,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: theme.navBackground,
          borderTopWidth: 0,
          // height: 60,
          paddingBottom: Platform.OS === "ios" ? 0 : 20,
          paddingTop: 8,
          justifyContent: "space-between",
          marginBottom: Platform.OS === "ios" ? 0 : 0,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../assets/images/home.png")}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "Category",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../assets/images/circle.png")}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../assets/images/cart.png")}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../assets/images/user.png")}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    // tintColor: "#fff"
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
