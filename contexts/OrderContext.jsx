import { fetcher } from "@/API/fetcher";
import { FETCH_ORDER } from "@/constants/Routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext } from "react";

const OrderContext = createContext();

const OrderProvider = ({children}) => {
    const getFromOrder = async () => {
        const token = await AsyncStorage.getItem("authToken");
        if(token){
        const response = await fetcher(FETCH_ORDER);
            if (response) {
              return response; 
        }
    } else {
        return null
    }
    }

    return(
        <OrderContext.Provider value={{getFromOrder}}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrdersContext = () => useContext(OrderContext);
export default OrderProvider