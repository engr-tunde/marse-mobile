import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, settheme] = useState("light");
  const [systemTheme, setsystemTheme] = useState(false);

  useEffect(() => {
    const getTheme = async () => {
      try {
        const savedThemeObject = await AsyncStorage.getItem("theme");
        const savedThemeObjectData = JSON.parse(savedThemeObject);
        if (savedThemeObjectData) {
          settheme(savedThemeObjectData.mode);
          setsystemTheme(savedThemeObjectData.system);
        }
      } catch (error) {
        console.log("gettheme error", error);
      }
    };
    getTheme();
  }, []);

  useEffect(() => {
    if (colorScheme && systemTheme) {
      const themeObject = {
        mode: colorScheme,
        system: true,
      };
      AsyncStorage.setItem("theme", JSON.stringify(themeObject));
      settheme(colorScheme);
      setsystemTheme(true);
    }
  }, [colorScheme]);

  const toggleTheme = (newTheme) => {
    const themeObject = {
      mode: newTheme,
      system: false,
    };
    settheme(newTheme);
    AsyncStorage.setItem("theme", JSON.stringify(themeObject));
    setsystemTheme(false);
  };

  const useSystemTheme = () => {
    if (colorScheme) {
      const themeObject = {
        mode: colorScheme,
        system: true,
      };
      AsyncStorage.setItem("theme", JSON.stringify(themeObject));
      settheme(colorScheme);
      setsystemTheme(true);
    }
  };
  return (
    <ThemeContext.Provider
      value={{
        currentTheme: theme,
        toggleTheme,
        useSystemTheme,
        isSystemTheme: systemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// export default ThemeProvider;
