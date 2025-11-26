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
            // return res.data;
          })
          .catch(async (err) => {
            if (err.response.status == 401) {
              await AsyncStorage.removeItem("u-x-key");
            }
            seterror(err);
            setloading(false);
          })
      );

    // const token = await AsyncStorage.getItem("authToken");
    // const authHeaders = {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${token}`,
    // };
    // const guestHeaders = {
    //   "Content-Type": "application/json",
    // };

    // try {
    //   const res = await axios.get(
    //     `${process.env.EXPO_PUBLIC_API_BASE}${url}`,
    //     { headers: token ? authHeaders : guestHeaders }
    //   );
    //   if (res.status.toString().includes("20")) {
    //     setdata(res?.data);
    //   }
    //   if (res.status === 401) {
    //     await AsyncStorage.removeItem("authToken");
    //   }
    //   setloading(false);
    // } catch (err) {
    //   console.log("fetch error", err);
    //   if (err.response.status == 401) {
    //     await AsyncStorage.removeItem("authToken");
    //   }
    //   seterror(err.response);
    // }

    runFetch();
  }, [url]);
  return { error, data, loading };
};

// export const fetcher = (url) => {
//   const response = axios.
// }
