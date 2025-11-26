import { infoNotification } from "@/utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { axiosInstance } from "./client";

export const useFetch = (url) => {
  const [data, setdata] = useState();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    const runFetch = async () =>
      axiosInstance().then((axiosIns) =>
        axiosIns
          .get(url, { withCredentials: true })
          .then(async (res) => {
            if (res.status == 401) {
              await AsyncStorage.removeItem("authToken");
            }
            setdata(res.data);
            setloading(false);
          })
          .catch(async (err) => {
            if (err?.message && err?.message === "Network Error") {
              infoNotification("You need to connect to the internet first!");
            } else {
              if (err?.response?.status == 401) {
                await AsyncStorage.removeItem("authToken");
              }
            }
            seterror(err);
            setloading(false);
          })
      );
    runFetch();
  }, [url]);
  return { error, data, loading };
};

export const fetcher = async (url) => {
  return axiosInstance().then((axiosIns) =>
    axiosIns
      .get(url, { withCredentials: true })
      .then(async (res) => {
        if (res.status == 401) {
          await AsyncStorage.removeItem("authToken");
        }
        return res.data;
      })
      .catch(async (err) => {
        console.log("fetcher err", err);
        if (err.response.status == 401) {
          await AsyncStorage.removeItem("authToken");
        }
        return null;
      })
  );
};
