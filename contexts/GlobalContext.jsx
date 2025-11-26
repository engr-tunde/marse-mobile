import React, { createContext, useContext, useMemo } from "react";

//Create the context
const GlobalContext = createContext(undefined);

export const GlobalProvider = ({ children }) => {
  // const products = userProduct();
  // const { productsData } = fetchProducts()

  const value = useMemo(
    () => ({
      // productsData
    })
    // [productsData]
  );
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
