import { product } from "@/assets/images";

export const singleProduct = {
  id: "1",
  name: "Shiny Dress",
  brand: "Brand",
  price: 95.5,
  sizes: [],
  variants: [
    {
      colors: ["orange", "red", "blue"],
      sizes: ["XL", "S", "SS", "XL", "XXL"],
    },
  ],
  rating: 3.5,
  image: product,
};

export const products = {
  products: [
    {
      _id: "68c0108f9b7dbba89e5ae647",
      title: "Marcel modified top",
      brandName: "nike",
      images: [
        {
          url: "https://marseedevtest.blob.core.windows.net/file/products/68c0108f9b7dbba89e5ae647.png",
          isCover: true,
          _id: "68c0108f9b7dbba89e5ae648",
        },
      ],
      variants: [],
      rating: 0,
      category: {
        _id: "68c7eb1aa6fc4917a6a728df",
        name: "category 2",
      },
      subcategory: null,
    },
    {
      _id: "68c010a59b7dbba89e5ae64a",
      title: "top",
      brandName: "nike",
      images: [
        {
          url: "https://marseedevtest.blob.core.windows.net/file/products/68c010a59b7dbba89e5ae64a.png",
          isCover: true,
          _id: "68c010a59b7dbba89e5ae64b",
        },
      ],
      variants: [],
      rating: 0,
      pricing: {
        sellingPrice: 70,
        commissionPct: 5,
        discountPct: 5,
      },
    },
    {
      _id: "68c09a8d9b7dbba89e5af1e5",
      title: "non quod id nisi ani",
      brandName: "zara",
      variants: [
        {
          color: "Red",
          sizes: ["M", "Select size"],
          quantity: 10,
          _id: "68c09a8d9b7dbba89e5af1e6",
          images: [],
        },
        {
          color: "Purple",
          sizes: ["S", "Select size", "Select size"],
          quantity: 20,
          _id: "68c09a8d9b7dbba89e5af1e7",
          images: [],
        },
        {
          color: "Blue",
          sizes: ["XL", "Select size"],
          quantity: 2,
          _id: "68c09a8d9b7dbba89e5af1e8",
          images: [],
        },
      ],
      rating: 0,
      images: [],
      pricing: {
        sellingPrice: 55,
        commissionPct: 5,
        discountPct: 5,
      },
    },
    {
      _id: "68c09bbd9b7dbba89e5af200",
      title: "in ut animi sed qui",
      brandName: "adidas",
      variants: [
        {
          color: "Purple",
          sizes: ["L"],
          quantity: 50,
          _id: "68c09bbd9b7dbba89e5af201",
          images: [],
        },
      ],
      rating: 0,
      images: [],
    },
    {
      _id: "68c0a0679b7dbba89e5af221",
      title: "earum amet distinct",
      brandName: "custom brand",
      variants: [
        {
          color: "Black",
          sizes: ["XL"],
          quantity: 20,
          _id: "68c0a0679b7dbba89e5af222",
          images: [],
        },
        {
          color: "Purple",
          sizes: ["S"],
          quantity: 20,
          _id: "68c0a0679b7dbba89e5af223",
          images: [],
        },
      ],
      rating: 0,
      images: [],
    },
    {
      _id: "68c0a0999b7dbba89e5af225",
      title: "tempor nostrud magna",
      brandName: "h&m",
      variants: [
        {
          color: "Blue",
          sizes: ["M"],
          quantity: 20,
          _id: "68c0a0999b7dbba89e5af226",
          images: [],
        },
        {
          color: "Yellow",
          sizes: ["S"],
          quantity: 4,
          _id: "68c0a0999b7dbba89e5af227",
          images: [],
        },
      ],
      rating: 0,
      images: [],
    },
  ],
  total: 6,
  page: 1,
  limit: 20,
};
