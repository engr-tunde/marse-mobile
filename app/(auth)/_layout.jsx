import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { checkSession } from "@/utils/helpers";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

export default function AuthRootLayout() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.dark;
  let check;
  const router = useRouter();
  async function runFunc() {
    check = await checkSession();
    if (check) {
      router.replace("/home");
    }
  }

  useEffect(() => {
    runFunc();
  }, [check]);

  return (
    <>
      <Stack
        // initialRouteName="signup"
        screenOptions={{
          contentStyle: {
            backgroundColor: theme.uiBackground,
            paddingHorizontal: 20,
            paddingVertical: Platform.OS === "android" && 50,
          },
          headerShown: false,
        }}
        options={{ headerShown: false }}
      />
    </>
  );
}
