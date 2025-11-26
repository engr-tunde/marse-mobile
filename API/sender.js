import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { axiosInstance } from "./client";

const postData = async (url, formData, withCredentials) => {
  const token = await AsyncStorage.getItem("authToken");
  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const guestHeaders = {
    "Content-Type": "application/json",
  };
  try {
    const res = await axios.post(
      `${process.env.EXPO_PUBLIC_API_BASE}${url}`,
      formData,
      {
        withCredentials: withCredentials,
        headers: token ? authHeaders : guestHeaders,
      }
    );
    return res;
  } catch (err) {
    return err.response;
  }
};
const putData = async (url, formData, withCredentials) => {
  const token = await AsyncStorage.getItem("authToken");
  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const guestHeaders = {
    "Content-Type": "application/json",
  };
  try {
    const res = await axios.put(
      `${process.env.EXPO_PUBLIC_API_BASE}${url}`,
      formData,
      {
        withCredentials: withCredentials,
        headers: token ? authHeaders : guestHeaders,
      }
    );
    return res;
  } catch (err) {
    return err.response;
  }
};
const patchData = async (url, formData, withCredentials) => {
  const token = await AsyncStorage.getItem("authToken");
  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const guestHeaders = {
    "Content-Type": "application/json",
  };
  try {
    const res = await axios.patch(
      `${process.env.EXPO_PUBLIC_API_BASE}${url}`,
      formData,
      {
        withCredentials: withCredentials,
        headers: token ? authHeaders : guestHeaders,
      }
    );
    return res;
  } catch (err) {
    return err.response;
  }
};


const deleteData = async (url, formData, withCredentials) => {
  const token = await AsyncStorage.getItem("authToken");
  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const guestHeaders = {
    "Content-Type": "application/json",
  };
  try {
    const res = await axios.delete(
      `${process.env.EXPO_PUBLIC_API_BASE}${url}`,
      {
        data: formData,
        withCredentials: withCredentials,
        headers: token ? authHeaders : guestHeaders,
      }
    );
    return res;
  } catch (err) {
    return err.response;
  }
};

const postMultipartData = async (url, data, withCredentials) => {
  const result = await axiosInstance()
    .patch(url, data, { withCredentials })
    .then((res) => res.data)
    .catch((err) => err.response);
  return result;
};

export const mutationRequest = (
  url,
  type = "post",
  data,
  withCredentials = false
) => {
  switch (type.toLowerCase()) {
    case "post":
      return postData(url, data, withCredentials);

    case "put":
      return putData(url, data, withCredentials);

    case "patch":
      return patchData(url, data, withCredentials);

    case "delete":
      return deleteData(url, data, withCredentials);

    case "data":
      return postMultipartData(url, data, withCredentials);

    default:
      return postData(url, data, withCredentials);
  }
};
