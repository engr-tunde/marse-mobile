import { signupUser } from "@/API";
import AppInputField from "@/component/forms/AppInputField";
import AppSubmitButton from "@/component/forms/AppSubmitButton";
import CustomFormik from "@/component/forms/CustomFormik";
import ThemedText from "@/component/global/ThemedText";
import { Colors } from "@/constants/Colors";
import { GOOGLE_AUTH_REDIRECT } from "@/constants/Routes";
import { useTheme } from "@/hooks/useTheme";
import { errorNotification } from "@/utils/helpers";
import { signupInitialValues } from "@/utils/initialValues";
import { signupSchema } from "@/utils/validations";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const webClientId =
  "837736787390-8k7fb9m4sg0pabchguvgar7g30tvl6gg.apps.googleusercontent.com";
const iosClientId =
  "837736787390-9u381lfa015jbpimb3evh92qm7ukhtr4.apps.googleusercontent.com";
const androidClientId =
  "837736787390-ecn0i3sf5a88tvild3lrik3sqo4ir5k5.apps.googleusercontent.com";
WebBrowser.maybeCompleteAuthSession();

export default function SignUp() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.dark;
  const initialValues = signupInitialValues();
  const validationSchema = signupSchema();
  const router = useRouter();

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
            `${process.env.EXPO_PUBLIC_API_BASE}${GOOGLE_AUTH_REDIRECT}?idToken=${idToken}`
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

  const handleSignUp = async (values) => {
    const response = await signupUser(values);
    if (response?.status?.toString().includes("20")) {
      router.push({
        pathname: "/verify",
        params: { email: values?.email },
      });
    } else {
      errorNotification(response?.data?.message);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        style="auto"
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />

      <View style={styles.loginContainer}>
        <Pressable onPress={() => router.replace("/signin")}>
          <ThemedText style={{ fontSize: 15 }}>Login</ThemedText>
        </Pressable>
        <View style={{ alignItems: "center" }}>
          <ThemedText style={{ fontSize: 15 }} type="title">
            Sign Up
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
      </View>

      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          contentContainerStyle={{ gap: 24, paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.welcomeBackContainer}>
            <ThemedText
              style={{ fontSize: 20, fontWeight: "bold" }}
              type="title"
            >
              Create Account
            </ThemedText>
            <ThemedText style={styles.loginText}>
              Join us to start shopping your favourite products
            </ThemedText>
          </View>

          <CustomFormik
            initialValues={initialValues}
            onSubmit={handleSignUp}
            validationSchema={validationSchema}
          >
            <View>
              <View>
                <View style={{ gap: 8, marginBottom: 20 }}>
                  <ThemedText style={{ fontSize: 15 }} type="title">
                    Full name
                  </ThemedText>
                  <AppInputField
                    name="fullName"
                    placeholder="Enter your full name"
                  />
                </View>

                <View style={{ gap: 8, marginBottom: 20 }}>
                  <ThemedText style={{ fontSize: 15 }} type="title">
                    Email address
                  </ThemedText>
                  <AppInputField
                    name="email"
                    placeholder="Enter your email address"
                  />
                </View>

                <View style={{ gap: 8, marginBottom: 20 }}>
                  <ThemedText style={{ fontSize: 15 }} type="title">
                    Password
                  </ThemedText>
                  <AppInputField
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                </View>

                <View style={{ gap: 8, marginBottom: 20 }}>
                  <ThemedText style={{ fontSize: 15 }} type="title">
                    Confirm Password
                  </ThemedText>
                  <AppInputField
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                  />
                </View>

                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={theme.title}
                  />
                  <ThemedText style={{ fontSize: 15 }} type="title">
                    Be a minimum of 8 characters
                  </ThemedText>
                </View>

                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={theme.title}
                  />
                  <ThemedText style={{ fontSize: 15 }} type="title">
                    Have at least one number
                  </ThemedText>
                </View>

                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={theme.title}
                  />
                  <ThemedText style={{ fontSize: 15 }} type="title">
                    Have at least one uppercase and one lowercase
                  </ThemedText>
                </View>

                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={theme.title}
                  />
                  <ThemedText style={{ fontSize: 15 }} type="title">
                    Have at least one special character
                  </ThemedText>
                </View>
              </View>
              <AppSubmitButton title="Sign Up" />
            </View>
          </CustomFormik>

          <View style={styles.boxContainer}>
            <Pressable
              onPress={() => promptAsync({ useProxy: true })}
              style={[styles.buttonBox, { borderColor: theme.title }]}
            >
              <Image
                source={require("../../assets/images/Social-icon.png")}
                style={{ resizeMode: "cover", width: 18, height: 18 }}
              />
              <ThemedText style={{ fontSize: 15 }} type="title">
                Sign Up with Google
              </ThemedText>
            </Pressable>

            {Platform.OS === "ios" && (
              <View
                style={[
                  styles.buttonBox,
                  { borderColor: theme.title, padding: 12 },
                ]}
              >
                <MaterialIcons name="apple" size={24} color={theme.title} />
                <ThemedText style={{ fontSize: 15 }} type="title">
                  Sign Up with Apple
                </ThemedText>
              </View>
            )}
          </View>

          <ThemedText
            style={{ fontSize: 15, textAlign: "center" }}
            type="title"
          >
            Already have an account?{" "}
            <Text
              style={{ fontWeight: "bold" }}
              onPress={() => router.push("/signin")}
            >
              Login
            </Text>
          </ThemedText>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    paddingHorizontal: 5,
  },
  loginContainer: {
    flexDirection: "row",
    gap: 24,
  },
  welcomeBackContainer: {
    gap: 10,
  },

  loginText: {
    fontSize: 14,
    fontWeight: 300,
  },

  buttonBox: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    gap: 8,
  },
  boxContainer: {
    gap: 10,
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginTop: 4,
  },
});
