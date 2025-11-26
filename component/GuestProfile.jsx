import ThemedTextOpposite from "@/component/global/ThemedTextOpposite";
import ThemedViewOpposite from "@/component/global/ThemedViewOpposite";
import { Colors } from "@/constants/Colors";
import { guestProfileLinks } from "@/data";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { infoNotification } from "@/utils/helpers";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "./global/ThemedText";

export default function GuestProfile() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const router = useRouter();
  const glStyles = globalStyles();

  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[glStyles.containerInner, { gap: 20, marginTop: 20 }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 64 }}
        >
          <View style={{ display: "flex", gap: 6, marginBottom: 25 }}>
            <ThemedText
              style={{
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              Profile
            </ThemedText>
            <ThemedText type="text" style={{ fontSize: 14, opacity: 0.6 }}>
              Sign in or create an account to shop seamlessly
            </ThemedText>
          </View>

          <View style={styles.registerContainer}>
            <Pressable
              onPress={() => router.replace("/signin")}
              style={{ width: "47%" }}
            >
              <ThemedViewOpposite style={styles.box1}>
                <ThemedTextOpposite style={styles.boxText1}>
                  Login
                </ThemedTextOpposite>
              </ThemedViewOpposite>
            </Pressable>

            <Pressable
              onPress={() => router.replace("/signup")}
              style={{ width: "47%" }}
            >
              <View style={[styles.box2, { borderColor: theme.title }]}>
                <ThemedText style={styles.boxText2}>Registration</ThemedText>
              </View>
            </Pressable>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: 20,
            }}
          >
            {guestProfileLinks.map((ele, i) => (
              <View key={i}>
                <ThemedText
                  style={{
                    fontWeight: 600,
                    fontSize: 17,
                    marginBottom: 20,
                    marginTop: 20,
                  }}
                >
                  {ele.groupTitle}
                </ThemedText>
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 17 }}
                >
                  {ele.children.map((item, i2) => (
                    <Pressable
                      key={i2}
                      onPress={() =>
                        item.url
                          ? router.push(item.url)
                          : infoNotification("Please login first!")
                      }
                      style={{
                        borderBottomWidth: 0.5,
                        borderBottomColor: "gray",
                        width: "100%",
                        paddingBottom: 3,
                      }}
                    >
                      <View style={styles.contentBox}>
                        <ThemedText style={{ fontSize: 17 }}>
                          {item.title}
                        </ThemedText>
                        <EvilIcons
                          name="chevron-right"
                          size={24}
                          color={theme.title}
                        />
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </View>
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
    gap: 16,
    paddingTop: StatusBar.currentHeight,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
    fontFamily: "Urbanist_400Regular",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    marginBottom: 15,
    // paddingHorizontal: 20,
  },
  box1: {
    width: "100%",
    flex: 1,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  box2: {
    flex: 1, // equal space for both
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
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
  contentBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
