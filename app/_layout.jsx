import CartProvider from "@/contexts/CartContext";
import { GlobalProvider } from "@/contexts/GlobalContext";
import OrderProvider from "@/contexts/OrderContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import UserProvider from "@/contexts/UserContext";
import WishListProvider from "@/contexts/WishListContext";
import {
  Urbanist_100Thin,
  Urbanist_100Thin_Italic,
  Urbanist_200ExtraLight,
  Urbanist_300Light,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
  Urbanist_800ExtraBold,
  Urbanist_900Black,
} from "@expo-google-fonts/urbanist";
import { useFonts } from "@expo-google-fonts/urbanist/useFonts";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AlertNotificationRoot } from "react-native-alert-notification";

export default function RootLayout() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Urbanist_100Thin,
    Urbanist_200ExtraLight,
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
    Urbanist_800ExtraBold,
    Urbanist_900Black,
    Urbanist_100Thin_Italic,
  });

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        router.replace("/signin");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  return (
    <AlertNotificationRoot>
      <ThemeProvider>
        <UserProvider>
          <CartProvider>
            <OrderProvider>
              <WishListProvider>
                <GlobalProvider>
                  <StripeProvider
                    publishableKey={process.env.EXPO_PUBLIC_STRIPE_KEY}
                    merchantIdentifier="merchant.identifier" // required for Apple Pay
                    // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
                  >
                    <Stack>
                      <Stack.Screen
                        name="index"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="(auth)"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="(pages)"
                        options={{ headerShown: false }}
                      />
                    </Stack>
                  </StripeProvider>
                </GlobalProvider>
              </WishListProvider>
            </OrderProvider>
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
    </AlertNotificationRoot>
  );
}
