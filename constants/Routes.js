export const FETCH_BRANDS = "/brands";
export const FETCH_BRAND_PUBLIC = "/brands/public";
export const FETCH_PRODUCTS = "/products/public";

// AUTH
export const SIGNUP_USER = "/auth/register";
export const VERIFY = "/auth/verify-email";
export const LOGIN_USER = "/auth/login";
export const LOGOUT_USER = "/auth/logout";
export const FORGET_PASSWORD = "/auth/forgot-password";
export const NEW_PASSWORD = "/auth/reset-password";
export const RESET_VERIFY = "/auth/verify-forgot-password";
export const RESEND_OTP = "/auth/resend-otp";
export const USER_ADDRESS = "/settings/user-address";
export const USER_ADDRESSES = "/users/address";
export const CHANGE_PASSWORD = "/settings/user-password";
export const GOOGLE_AUTH = "/auth/google-auth/user";
export const GOOGLE_AUTH_REDIRECT = "/auth/google-redirect";

//URL
export const BASE_URL = process.env.EXPO_PUBLIC_API_BASE;

//order
export const ADD_PAY_INTENT = "/orders/pay-intent";
export const ADD_ORDER = "/orders";
export const ORDERS = "/orders";
export const FETCH_ORDER = "/orders";
export const CANCEL_ORDER = "/orders/cancel-order";

//Cart
export const FETCH_CART = "/carts";
export const ADD_CART = "/carts/add";
export const REMOVE_CART = "/carts/remove";
export const CLEAR_CART = "/carts/clear";
export const UPDATE_CART = "/carts/update";

export const FETCH_WISHLIST = "/wishlist";
export const ADD_WISHLIST = "/wishlist/add";
export const REMOVE_WISHLIST = "/wishlist/remove";

// User Profile
export const FETCH_USER_PROFILE = "/users/address";
export const FETCH_USER = "/users";

// export {
//   //
//   FETCH_BRANDS,
//   FORGET_PASSWORD,
//   //
//   NEW_PASSWORD,
//   RESET_VERIFY,
//   USER_ADDRESS,
//   VERIFY,
// };
