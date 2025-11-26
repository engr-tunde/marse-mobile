import { product, redLoveProduct } from "@/assets/images";

export const homeData = {
  products: [
    {
      id: "1",
      name: "Shiny Dressesss",
      brand: "Brand",
      price: "$95.50",
      amount: "$65.50",
      image: product,
    },
    {
      id: "2",
      name: "Shiny Dress",
      brand: "Brand",
      price: "$95.50",
      amount: "$65.50",
      image: product,
    },
  ],
  trending: [
    { id: "1", image: require("../assets/products/trending-new1.png") },
    { id: "2", image: require("../assets/products/trending-new.png") },
  ],
  arrival: [
    { id: "1", image: require("../assets/products/arrival-new1.png") },
    { id: "2", image: require("../assets/products/arrival-new.png") },
  ],
};

export const userProfileLinks = [
  {
    groupTitle: "My Account",
    children: [
      {
        title: "My Order",
        url: "/orders",
      },
      {
        title: "Wishlist",
        url: "/wishlist-product",
      },
      {
        title: "Shipping address",
        url: "/manage-address",
      },
      {
        title: "Payment method",
        url: "/payment",
      },
    ],
  },
  {
    groupTitle: "Account Settings",
    children: [
      {
        title: "Themes",
        url: "/themes",
      },
      {
        title: "Security",
        url: "/security",
      },
      {
        title: "Privacy policy",
        url: "/privacy",
      },
      {
        title: "Terms & Conditions",
        url: "/terms",
      },
      {
        title: "Help & Support",
        url: "/help-support",
      },
    ],
  },
];

export const guestProfileLinks = [
  {
    groupTitle: "My Account",
    children: [
      {
        title: "My Order",
      },
      {
        title: "Wishlist",
        url: "/wishlist-product",
      },
      {
        title: "Shipping address",
      },
      {
        title: "Payment method",
        url: "/payment",
      },
    ],
  },
  {
    groupTitle: "Account Settings",
    children: [
      {
        title: "Themes",
        url: "/themes",
      },
      {
        title: "Security",
      },
      {
        title: "Privacy policy",
        url: "/privacy",
      },
      {
        title: "Terms & Conditions",
        url: "/terms",
      },
      {
        title: "Help & Support",
        url: "/help-support",
      },
    ],
  },
];

export const productWishlist = [
  {
    id: "1",
    name: "Shiny Dress",
    brand: "Brand",
    price: "$95.50",
    amount: "$65.50",
    image: redLoveProduct,
  },
  {
    id: "2",
    name: "Shiny Dress",
    brand: "Brand",
    price: "$95.50",
    amount: "$65.50",
    image: redLoveProduct,
  },
];

export const orderStatusData = [
  {
    title: "Confirmed",
    value: "confirmed",
  },
  {
    title: "In transit",
    value: "in_transit",
  },
  {
    title: "Completed",
    value: "delivered",
  },
  {
    title: "Canceled",
    value: "cancelled",
  },
];

export const orderCancellationReasons = [
  "I ordered by mistake",
  "Delivery is taking too long",
  "Item is too expensive",
  "I want to change my order",
  "Other",
];

export const faqData = [
  {
    header: " How do i place and order?",
    content:
      "Simply browse our collections, add your favorite items to your cart, and proceed to checkout. You can sign in, register, or check out as a guest.",
  },
  {
    header: "Can I order without creating an account?",
    content:
      "Yes! Use the “Shop as Guest” option at checkout to place an order without signing up.",
  },
  {
    header: "Can I cancel or modify my order after placing it?",
    content:
      "When an order is yet to be confirmed, you can still cancel it. However, dooing that becoms impossible once the order has been confirmed",
  },
  {
    header: "How long does delivery take?",
    content:
      "Well, that depends on the actual shipping conditions associated with the product in question. Mostly takes just a few days.",
  },
  {
    header: "Can I track my order?",
    content: "Absolutely! You sure can.",
  },
  {
    header: "What's your return policy?",
    content:
      "It is the policy associated with an order with respect to its ready set terms for return",
  },
];
