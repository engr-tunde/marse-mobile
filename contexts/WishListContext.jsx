import { deleteWishlist, postToWishList } from "@/API";
import { fetcher } from "@/API/fetcher";
import { FETCH_WISHLIST } from "@/constants/Routes";
import { successNotification } from "@/utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext } from "react";

const WishListContext = createContext();

const WishListProvider = ({ children }) => {
  const addToWishList = async (values) => {
    const item = {
      productId: values.productId,
      productName: values.productName,
      brandName: values.brandName,
      // size: values.size,
      // color: values.color,
      // quantity: values.quantity,
      price: values.price,
      image: values.image,
    };
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      const checkResponse = await fetcher(FETCH_WISHLIST);
      if (checkResponse) {
        const checkResponseItems = checkResponse?.[0]?.items;
        let itemExists = checkResponseItems?.filter(
          (ele) => ele?.productId === values?.productId
        );
        if (itemExists?.length) {
          return null;
        } else {
          const response = await postToWishList(item);
          if (response?.status?.toString()?.includes("20")) {
            successNotification(response?.data?.message);
            return true;
          } else {
            return false;
          }
        }
      }
    } else {
      let currentWishListItems = await AsyncStorage.getItem("wishList");
      if (!currentWishListItems) {
        let dummyWishList = [];
        dummyWishList.push(item);
        dummyWishList = JSON.stringify(dummyWishList);
        await AsyncStorage.setItem("wishList", dummyWishList);
      } else {
        currentWishListItems = JSON.parse(currentWishListItems);

        const itemExists = currentWishListItems?.filter(
          (ele) => ele?.productId === values?.productId
        );
        if (itemExists?.length) {
          return null;
        } else {
          currentWishListItems.push(item);
          let updatedItems = JSON.stringify(currentWishListItems);
          await AsyncStorage.setItem("wishList", updatedItems);
          return true;
        }
      }
    }
  };

  const getFromWishList = async () => {
    const token = await AsyncStorage.getItem("authToken");
    let currentWishListItems = await AsyncStorage.getItem("wishList");
    if (token) {
      const response = await fetcher(FETCH_WISHLIST);
      if (response) {
        return response?.[0]?.items;
      } else {
        return null;
      }
    } else {
      let response = JSON.parse(currentWishListItems);
      if (response) {
        return response;
      } else {
        return null;
      }
    }
  };

  const deleteWishListItem = async (productId) => {
    const token = await AsyncStorage.getItem("authToken");
    let currentWishListData;
    if (!token) {
      let currentWishListItems = await AsyncStorage.getItem("wishList");
      currentWishListData = JSON.parse(currentWishListItems);
      if (currentWishListData) {
        let newListArr = currentWishListData.filter(
          (ele) => ele.productId !== productId
        );
        let stringifiedData = JSON.stringify(newListArr);
        await AsyncStorage.setItem("wishList", stringifiedData);
        return newListArr;
      } else {
        return null;
      }
    } else {
      const response = await deleteWishlist({ productId });
      if (response?.status?.toString()?.includes("20")) {
        const refetchResponse = await fetcher(FETCH_WISHLIST);
        if (refetchResponse) {
          return refetchResponse[0]?.items;
        } else {
          return null;
        }
      }
    }
  };

  return (
    <WishListContext.Provider
      value={{
        addToWishList,
        getFromWishList,
        deleteWishListItem,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export const useWishListContext = () => useContext(WishListContext);
export default WishListProvider;
