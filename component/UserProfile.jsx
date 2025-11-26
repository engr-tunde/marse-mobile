import EvilIcons from "@expo/vector-icons/EvilIcons";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import { logoutUser } from "@/API";
import ThemedTextOpposite from "@/component/global/ThemedTextOpposite";
import { Colors } from "@/constants/Colors";
import { userUserContext } from "@/contexts/UserContext";
import { userProfileLinks } from "@/data";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "./global/ThemedText";

export default function UserProfile() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const glStyles = globalStyles();

  const [user, setUser] = useState([]);

  const { getFromUser } = userUserContext();

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await getFromUser();
      setUser(result || []);
    };

    fetchUserData();
  }, [getFromUser]);

  const handleLogout = async () => {
    const logout = await logoutUser();
    console.log("logout", logout);
    if (logout) {
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("userName");
      await AsyncStorage.removeItem("authToken");
      router.push("/signin");
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
      <View style={[glStyles.containerInner, { gap: 20, marginTop: 20 }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 64 }}
        >
          <ThemedText style={{ fontSize: 22, fontWeight: 600 }}>
            Profile
          </ThemedText>
          <View style={{ display: "flex", gap: 6, marginBottom: 25 }}>
            <ThemedText style={{ fontWeight: 600 }}>
              Welcome {user?.data?.fullName}
            </ThemedText>
            <ThemedText type="text" style={{ fontSize: 14, opacity: 0.6 }}>
              {user?.data?.email}
            </ThemedText>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: 20,
            }}
          >
            {userProfileLinks.map((ele, i) => (
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
                  key={i}
                  style={{ display: "flex", flexDirection: "column", gap: 17 }}
                >
                  {ele.children.map((item, i2) => (
                    <Pressable
                      key={i2}
                      onPress={() => router.push(item.url)}
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

          <Pressable onPress={handleLogout}>
            <View style={styles.logoutButton}>
              <ThemedTextOpposite>Log out</ThemedTextOpposite>
            </View>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  contentBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoutButton: {
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginTop: 14,
  },
});
