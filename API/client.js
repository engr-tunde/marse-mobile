import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const axiosInstance = async () => {
  const token = await AsyncStorage.getItem("authToken");
  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const guestHeaders = {
    "Content-Type": "application/json",
  };
  return axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE,
    headers: token ? authHeaders : guestHeaders,
  });
  // console.log("cl", cl);
  // return cl;
};
