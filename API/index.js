import {
  ADD_CART,
  ADD_ORDER,
  ADD_PAY_INTENT,
  ADD_WISHLIST,
  CANCEL_ORDER,
  CHANGE_PASSWORD,
  CLEAR_CART,
  FETCH_BRAND_PUBLIC,
  FETCH_BRANDS,
  FETCH_CART,
  FETCH_PRODUCTS,
  FETCH_WISHLIST,
  FORGET_PASSWORD,
  LOGIN_USER,
  LOGOUT_USER,
  NEW_PASSWORD,
  ORDERS,
  REMOVE_CART,
  REMOVE_WISHLIST,
  RESEND_OTP,
  RESET_VERIFY,
  SIGNUP_USER,
  UPDATE_CART,
  USER_ADDRESS,
  USER_ADDRESSES,
  VERIFY,
} from "@/constants/Routes";
import { axiosInstance } from "./client";
import { useFetch } from "./fetcher";
import { mutationRequest } from "./sender";

export const signupUser = async (formData) => {
  const result = await mutationRequest(SIGNUP_USER, "post", formData);
  return result;
};

export const signupVerification = async (formData) => {
  const result = await mutationRequest(VERIFY, "post", formData);
  return result;
};

export const loginUser = async (formData) => {
  const result = await mutationRequest(LOGIN_USER, "post", formData);
  return result;
};

export const forgetPassword = async (formData) => {
  const result = await mutationRequest(FORGET_PASSWORD, "post", formData);
  return result;
};

export const verifyForgetPassword = async (formData) => {
  const result = await mutationRequest(RESET_VERIFY, "post", formData);
  return result;
};

export const newPassword = async (formData) => {
  const result = await mutationRequest(NEW_PASSWORD, "patch", formData);
  return result;
};

export const resetVerify = async (formData) => {
  const result = await mutationRequest(RESET_VERIFY, "post", formData);
  return result;
};

export const resendOtp = async (formData) => {
  const result = await mutationRequest(RESEND_OTP, "post", formData);
  return result;
};

//change password
export const changePassword = async (formData) => {
  const result = await mutationRequest(CHANGE_PASSWORD, "patch", formData);
  return result;
};

// Profile
export const saveAddress = async (formData) => {
  const result = await mutationRequest(USER_ADDRESS, "post", formData);
  return result;
};
export const updateAddress = async (formData) => {
  const result = await mutationRequest(USER_ADDRESS, "patch", formData);
  return result;
};
export const deleteAddress = async (formData) => {
  const result = await mutationRequest(USER_ADDRESS, "delete", formData);
  return result;
};

//Orders
export const addOrder = async (formData) => {
  const result = await mutationRequest(ADD_ORDER, "post", formData);
  return result;
};
export const addOrderIntent = async (formData) => {
  const result = await mutationRequest(ADD_PAY_INTENT, "post", formData);
  return result;
};
export const fetchOrders = (status) => {
  const { data, loading, error } = useFetch(`${ORDERS}?status=${status}`);
  return {
    ordersData: data,
    ordersLoading: loading,
    ordersError: error,
  };
};
export const fetchOrderDetails = (orderId) => {
  const { data, loading, error } = useFetch(`${ORDERS}/${orderId}`);
  return {
    orderData: data,
    orderLoading: loading,
    orderError: error,
  };
};
export const cancelOrder = async (formData) => {
  const result = await mutationRequest(CANCEL_ORDER, "post", formData);
  return result;
};
expo;

//Delete cart
export const deleteCart = async (formData) => {
  const result = await mutationRequest(REMOVE_CART, "delete", formData);
  return result;
};

export const emptyCart = async () => {
  const result = await mutationRequest(CLEAR_CART, "delete", null);
  return result;
};

export const updateCart = async (formData) => {
  const result = await mutationRequest(UPDATE_CART, "patch", formData);
  return result;
};

export const fetchShippingAddresses = () => {
  const { data, loading, error } = useFetch(USER_ADDRESSES);
  return {
    shippingAddressData: data,
    shippingAddressLoading: loading,
    shippingAddressError: error,
  };
};

export const logoutUser = async () =>
  axiosInstance().then((axiosIns) =>
    axiosIns
      .get(LOGOUT_USER, { withCredentials: true })
      .then(async (res) => {
        console.log("res", res.data);
        if (res?.data?.success) {
          return true;
        } else return false;
      })
      .catch((err) => {
        if (err?.message && err?.message === "Network Error") {
          infoNotification("You need to connect to the internet first!");
          return false;
        } else {
          if (err?.response?.status == 401) {
            return true;
          } else {
            return false;
          }
        }
      })
  );

export const fetchBrands = () => {
  const { data, loading, error } = useFetch(FETCH_BRANDS);
  return { brandsData: data, brandLoading: loading, brandError: error };
};

export const fetchBrandById = (id) => {
  const { data, loading, error } = useFetch(`${FETCH_BRAND_PUBLIC}/${id}`);
  return { brandsData: data, brandLoading: loading, brandError: error };
};

export const fetchProducts = () => {
  const { data, loading, error } = useFetch(FETCH_PRODUCTS);
  return { productsData: data, productsLoading: loading, productsError: error };
};
export const fetchProductDetails = (id) => {
  const { data, loading, error } = useFetch(`${FETCH_PRODUCTS}/${id}`);
  return { productData: data, productLoading: loading, productError: error };
};
export const postToCart = async (formData) => {
  const result = await mutationRequest(ADD_CART, "post", formData);
  return result;
};
export const fetchCart = () => {
  const { data, loading, error } = useFetch(FETCH_CART);
  return { cartData: data, cartLoading: loading, cartError: error };
};
export const postToWishList = async (formData) => {
  const result = await mutationRequest(ADD_WISHLIST, "post", formData);
  return result;
};
export const fetchWishList = () => {
  const { data, loading, error } = useFetch(FETCH_WISHLIST);
  return { wishListData: data, wishListLoading: loading, wishListError: error };
};
export const deleteWishlist = async (formData) => {
  const result = await mutationRequest(REMOVE_WISHLIST, "delete", formData);
  return result;
};
