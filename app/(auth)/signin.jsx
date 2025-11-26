import { loginUser } from "@/API";
import AppInputField from "@/component/forms/AppInputField";
import AppSubmitButton from "@/component/forms/AppSubmitButton";
import CustomFormik from "@/component/forms/CustomFormik";
import NormalText from "@/component/global/NormalText";
import ThemedLink from "@/component/global/ThemedLink";
import ThemedText from "@/component/global/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { errorNotification } from "@/utils/helpers";
import { loginInitialValues } from "@/utils/initialValues";
import { loginSchema } from "@/utils/validations";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GOOGLE_AUTH_REDIRECT } from "@/constants/Routes";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";

// const webClientId =
//   "837736787390-dfj48rr7n5qcbqggvd1c5purksu4b8d8.apps.googleusercontent.com";
// const webClientId =
//   "957989616867-sbqfl98pbv61939rvlrfa3vqmtcjs2br.apps.googleusercontent.com";
const webClientId =
  "837736787390-8k7fb9m4sg0pabchguvgar7g30tvl6gg.apps.googleusercontent.com";
const iosClientId =
  "837736787390-9u381lfa015jbpimb3evh92qm7ukhtr4.apps.googleusercontent.com";
const androidClientId =
  "837736787390-ecn0i3sf5a88tvild3lrik3sqo4ir5k5.apps.googleusercontent.com";
WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.dark;
  const router = useRouter();
  const glStyles = globalStyles();

  const [accessToken, setaccessToken] = useState();

  const initialValues = loginInitialValues();
  const validationSchema = loginSchema();

  const GOOGLE_CONFIG = {
    iosClientId: iosClientId,
    webClientId,
    androidClientId,
    clientId: webClientId,
    scopes: ["profile", "email"],
  };
  const [request, response, promptAsync] = Google.useAuthRequest(GOOGLE_CONFIG);

  const handleGoogleAuth = async () => {
    if (response?.type === "success") {
      const { authentication } = response;
      const idToken = authentication?.idToken;
      if (idToken) {
        try {
          const result = await fetch(
            `${process.env.EXPO_PUBLIC_API_BASE}/${GOOGLE_AUTH_REDIRECT}?idToken=${idToken}`
          );
          if (result.ok) {
            let responseData = await result.json();
            if (responseData?.access_token) {
              let userData = JSON.stringify(responseData?.user);
              await AsyncStorage.setItem("userData", userData);
              await AsyncStorage.setItem(
                "userName",
                responseData?.user?.fullName
              );
              await AsyncStorage.setItem(
                "authToken",
                responseData?.access_token
              );
              router.replace("/home");
            }
          }
        } catch (error) {
          console.log("Signin error - ", error);
          errorNotification("Something wewnt wrong!");
        }
      }
    }
  };

  useEffect(() => {
    handleGoogleAuth();
  }, [response]);

  const handleSignin = async (values) => {
    const response = await loginUser(values);
    if (response?.status?.toString()?.includes("20")) {
      let userData = response?.data?.user;

      if (response?.data?.access_token) {
        userData = JSON.stringify(userData);
        await AsyncStorage.setItem("userData", userData);
        await AsyncStorage.setItem("userName", response?.data?.user?.fullName);
        await AsyncStorage.setItem("authToken", response?.data?.access_token);
        router.replace("/home");
      }
    } else {
      if (response?.data?.message === "Complete email verification") {
        router.push({
          pathname: "/verify",
          params: { email: values?.email },
        });
      }
      errorNotification(response?.data?.message);
    }
  };

  return (
    <SafeAreaView
      style={[style.container, { backgroundColor: theme.uiBackground }]}
    >
      <View style={glStyles.container}>
        <StatusBar
          style="auto"
          backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
          barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={style.loginContainer}>
              <View style={{ alignItems: "center", marginBottom: 20 }}>
                <ThemedText style={{ fontSize: 15 }} type="title">
                  Login
                </ThemedText>
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: theme.underline,
                    width: 64,
                    marginTop: 4,
                  }}
                />
              </View>

              <Pressable onPress={() => router.replace("/signup")}>
                <ThemedText style={{ fontSize: 15 }}>Sign Up</ThemedText>
              </Pressable>
            </View>

            <View style={[style.welcomeBackContainer, { marginBottom: 25 }]}>
              <ThemedText style={style.welcomeText}>Welcome Back!!</ThemedText>
              <ThemedText style={style.loginText}>
                Login to your account to continue shopping
              </ThemedText>
            </View>

            <CustomFormik
              initialValues={initialValues}
              onSubmit={handleSignin}
              validationSchema={validationSchema}
            >
              <View>
                <View style={{ gap: 8 }}>
                  <ThemedText style={{ fontSize: 15 }}>
                    Email address
                  </ThemedText>
                  <View style={{ marginBottom: 20 }}>
                    <AppInputField
                      name="email"
                      placeholder="Enter your email address"
                    />
                  </View>
                </View>

                <View style={{ gap: 8 }}>
                  <ThemedText style={{ fontSize: 15 }}>Password</ThemedText>
                  <View style={{ marginBottom: 20 }}>
                    <AppInputField
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                    />
                  </View>

                  <View style={{ alignItems: "flex-end" }}>
                    <ThemedLink
                      replace={true}
                      link="/forgetPassword"
                      style={{ fontSize: 15, fontWeight: "bold" }}
                      type="title"
                    >
                      Forget password?
                    </ThemedLink>
                  </View>
                </View>

                <AppSubmitButton title="Login" />
              </View>
            </CustomFormik>

            <View style={style.boxContainer}>
              <Pressable
                onPress={() => promptAsync({ useProxy: true })}
                style={[
                  style.buttonBox,
                  { borderColor: theme.title, flexDirection: "row" },
                ]}
              >
                <Image
                  source={require("../../assets/images/Social-icon.png")}
                  style={{ resizeMode: "cover", width: 18, height: 18 }}
                />
                <ThemedText>SignIn with Google</ThemedText>
              </Pressable>

              {Platform.OS === "ios" && (
                <View
                  style={[
                    style.buttonBox,
                    {
                      borderColor: theme.title,
                      flexDirection: "row",
                      padding: 12,
                    },
                  ]}
                >
                  <MaterialIcons name="apple" size={24} color={theme.title} />
                  <ThemedText>Login with Apple</ThemedText>
                </View>
              )}
            </View>

            <Pressable onPress={() => router.replace("/home")}>
              <NormalText
                style={{
                  textAlign: "center",
                  color: theme.title,
                  marginTop: 15,
                  fontSize: 16,
                  padding: 10,
                }}
              >
                Shop as guest
              </NormalText>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    marginTop: 24,
  },
  loginContainer: {
    flexDirection: "row",
    gap: 24,
  },
  welcomeBackContainer: {
    gap: 5,
    marginBottom: 20,
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  loginText: {
    fontSize: 14,
    fontWeight: "300",
  },
  buttonBox: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderWidth: 1,
    gap: 8,
    marginTop: 10,
  },
  boxContainer: {
    gap: 5,
    marginTop: 10,
  },
});
