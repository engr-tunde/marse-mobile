import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    resizeMode: "contain",
    width: 80,
    height: 80,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  heroImage: {
    resizeMode: "contain",
    width: "100%",
    borderRadius: 8,
    marginBottom: 16,
  },
  containerBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  miniBox1: {
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 6,
    borderRadius: 12,
  },
  miniBox2: {
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 6,
    borderRadius: 12,
  },
  activeCategory: {
    color: "#000",
    fontWeight: "500",
  },
  inactiveCategory: {
    color: "#fff",
    fontWeight: "500",
  },
  productCard: {
    padding: 8,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
    shadowRadius: 2,
    height: 270,
  },
  productImage: {
    // flex: 1,
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 12,
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 10,
    color: "#DB0104",
  },
  productAmount: {
    fontSize: 14,
    fontWeight: 600,
  },
});
