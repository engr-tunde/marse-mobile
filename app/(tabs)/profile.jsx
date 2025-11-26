import GuestProfile from "@/component/GuestProfile";
import UserProfile from "@/component/UserProfile";
import { userUserContext } from "@/contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function ProfileWrapper() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        setToken(storedToken);
      } catch (error) {
        console.log("Error reading token:", error);
      } finally {
        setLoading(false);
      }
    };

    checkToken();

    // Subscribe to storage changes for auto-refresh
    const interval = setInterval(checkToken, 500);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return token ? <UserProfile /> : <GuestProfile />;
}
