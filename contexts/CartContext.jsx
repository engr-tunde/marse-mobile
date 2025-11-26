import { deleteCart, emptyCart, postToCart } from "@/API";
import { fetcher } from "@/API/fetcher";
import { FETCH_CART } from "@/constants/Routes";
import {
  errorNotification,
  infoNotification,
  successNotification,
} from "@/utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 🧩 Load token and initial cart on mount
  useEffect(() => {
    const loadCartData = async () => {
      const storedToken = await AsyncStorage.getItem("authToken");
      if (storedToken) {
        const response = await fetcher(FETCH_CART);
        if (response?.items) {
          setCartItems(response.items);
        }
      } else {
        // await AsyncStorage.removeItem("cart");
        const localCart = await AsyncStorage.getItem("cart");
        if (localCart) {
          setCartItems({ items: JSON.parse(localCart) });
        }
      }
    };
    loadCartData();
  }, []);

  // 🧩 If user logs in later, re-fetch
  // useEffect(() => {
  //   const syncCartAfterLogin = async () => {
  //     if (token) {
  //       const localCart = await AsyncStorage.getItem("cart");
  //       if (localCart) {
  //         const parsed = JSON.parse(localCart);
  //         // Optionally merge local cart to server cart
  //         for (const item of parsed) {
  //           await postToCart(item);
  //         }
  //         await AsyncStorage.removeItem("cart");
  //       }
  //       const response = await fetcher(FETCH_CART);
  //       if (response?.items) setCartItems(response.items);
  //     }
  //   };
  //   syncCartAfterLogin();
  // }, [token]);

  // 🛒 Add to Cart
  const addToCart = async (values) => {
    const item = {
      sellerId: values.sellerId,
      productId: values.productId,
      productName: values.productName,
      brandName: values.brandName,
      size: values.size,
      color: values.color,
      quantity: values.quantity,
      price: values.price,
      image: values.image,
    };
    const storedToken = await AsyncStorage.getItem("authToken");
    if (storedToken) {
      // Online flow
      const response = await postToCart(item);
      console.log("response", JSON.stringify(response?.data, null, 2));
      if (response?.status?.toString()?.includes("20")) {
        successNotification("Item added to cart");
        const updatedCart = await fetcher(FETCH_CART);
        setCartItems(updatedCart?.items || []);
        return true;
      } else {
        errorNotification("Unable to add item to cart");
        return false;
      }
    } else {
      // Offline flow
      const localCart = await AsyncStorage.getItem("cart");
      let parsedCart;
      if (localCart) {
        parsedCart = JSON.parse(localCart);
        const exists = parsedCart.filter(
          (i) => i?.productId === values?.productId
        );
        if (exists?.length) {
          infoNotification("Item already exists in cart");
          return null;
        } else {
          parsedCart = [...parsedCart, item];
        }
      } else {
        parsedCart = [item];
      }

      console.log("parsedCart", parsedCart);
      // const updatedCart = { items: [...parsedCart, item] };
      await AsyncStorage.setItem("cart", JSON.stringify(parsedCart));
      setCartItems(parsedCart);
      successNotification("Item added to cart");
      return true;
    }
  };

  // 🧹 Delete Item
  const deleteCartItem = async (productId, size, color) => {
    const storedToken = await AsyncStorage.getItem("authToken");
    if (storedToken) {
      const response = await deleteCart({ productId, size, color });
      if (response?.status?.toString()?.includes("20")) {
        const refetch = await fetcher(FETCH_CART);
        setCartItems(refetch?.items || []);
        return refetch?.items;
      }
    } else {
      const localCart = (await AsyncStorage.getItem("cart")) || "[]";
      const parsedCart = JSON.parse(localCart);
      const updated = parsedCart?.filter((i) => i.productId !== productId);
      await AsyncStorage.setItem("cart", JSON.stringify(updated));
      setCartItems({ items: updated });
      return updated;
    }
  };

  // 🧾 Get Cart
  const getFromCart = async () => {
    const storedToken = await AsyncStorage.getItem("authToken");
    // console.log("storedToken", storedToken);
    if (storedToken) {
      const response = await fetcher(FETCH_CART);
      return response;
    } else {
      let result = await AsyncStorage.getItem("cart");
      if (result) {
        result = { items: JSON.parse(result) };
      } else {
        result = { items: [] };
      }
      return result;
    }
  };

  const clearCartItems = async () => {
    const storedToken = await AsyncStorage.getItem("authToken");
    if (storedToken) {
      const response = await emptyCart();
      if (response?.status?.toString()?.includes("20")) {
        setCartItems();
        return true;
      } else {
        return false;
      }
    } else {
      await AsyncStorage.removeItem("cart");
      setCartItems();
      return true;
    }
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getFromCart,
        deleteCartItem,
        clearCartItems,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
export default CartProvider;
