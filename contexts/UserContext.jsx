import { fetcher } from "@/API/fetcher";
import { FETCH_USER, FETCH_USER_PROFILE } from "@/constants/Routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext } from "react";

const UserContext = createContext();

const UserProvider = ({children}) => {
const getFromUserAddress = async () => {
    const token = await AsyncStorage.getItem("authToken");
    if(token){
    const response = await fetcher(FETCH_USER_PROFILE);
        if (response) {
          return response; 
    }
} else {
    return null
}
}

const getFromUser = async () => {
    const token = await AsyncStorage.getItem("authToken");
    if(token){
    const response = await fetcher(FETCH_USER);
        if (response) {
          return response; 
    }
} else {
    return null
}
}

return (
    <UserContext.Provider value={{getFromUser, getFromUserAddress}}>
        {children}
    </UserContext.Provider>
)
}

export const userUserContext = () => useContext(UserContext);
export default UserProvider