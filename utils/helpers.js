import AsyncStorage from "@react-native-async-storage/async-storage";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export const successNotification = (message) =>
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: "Success",
    textBody: message,
    autoClose: 2000,
  });
export const errorNotification = (message) =>
  Toast.show({
    type: ALERT_TYPE.DANGER,
    title: "Error",
    textBody: message,
    autoClose: 2000,
  });
export const infoNotification = (message) =>
  Toast.show({
    type: ALERT_TYPE.INFO,
    title: "Info!",
    textBody: message,
    autoClose: 2000,
  });
export const warningNotification = (message) =>
  Toast.show({
    type: ALERT_TYPE.WARNING,
    title: "Info!",
    textBody: message,
    autoClose: 2000,
  });

export const checkSession = async () => {
  const token = await AsyncStorage.getItem("authToken");
  return token;
};

export const currencyFormatter = (amount) => {
  const fm = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return fm.format(amount);
};
