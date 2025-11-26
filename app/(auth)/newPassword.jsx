import { newPassword } from "@/API";
import AppInputField from "@/component/forms/AppInputField";
import AppSubmitButton from "@/component/forms/AppSubmitButton";
import CustomFormik from "@/component/forms/CustomFormik";
import ThemedLink from "@/component/global/ThemedLink";
import ThemedText from "@/component/global/ThemedText";

import { confirmPasswordSchema } from "@/component/validation/validation";
import { Colors } from "@/constants/Colors";

import { useTheme } from "@/hooks/useTheme";
import { newPasswordInitialValues } from "@/utils/initialValues";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";

import { StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewPassword() {
  const { currentTheme, toggleTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.dark;
  const { otp } = useLocalSearchParams();
  const initialValues = newPasswordInitialValues();
  const validationSchema = confirmPasswordSchema;

  console.log("OTP from params:", otp);

  const handleNewPassword = async (values) => {
    try {
      // Wait for the mutation to complete before navigating
      const result = await newPassword({ requestID: otp, ...values });
      console.log("New password result:", JSON.stringify(result, null, 2));
      router.push("/signin");
    } catch (error) {
      console.log("Signup failed:", error);
    }
  };
  return (
    <SafeAreaView style={style.container}>
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />

      <ThemedLink
        replace={true}
        link="/forgetPassword"
        style={{ fontSize: 15 }}
        type="title"
      >
        <AntDesign name="arrow-left" size={24} color={theme.title} />
      </ThemedLink>
      <View style={style.welcomeBackContainer}>
        <ThemedText style={{ fontSize: 18, fontWeight: "bold" }} type="title">
          Create New Password
        </ThemedText>
        <ThemedText style={{ fontSize: 15 }} type="title">
          Set your new password below
        </ThemedText>
      </View>
      <CustomFormik
        initialValues={initialValues}
        onSubmit={handleNewPassword}
        validationSchema={validationSchema}
      >
        <View>
          <View>
            <View style={{ gap: 8 }}>
              <ThemedText style={{ fontSize: 15 }} type="title">
                Enter new password
              </ThemedText>
              <View style={{ marginBottom: 20 }}>
                <AppInputField
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                />
              </View>
            </View>
            <View style={{ gap: 8 }}>
              <ThemedText style={{ fontSize: 15 }} type="title">
                Confirm new Password
              </ThemedText>
              <View style={{ marginBottom: 20 }}>
                <AppInputField
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                />
              </View>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Ionicons name="checkmark-circle" size={24} color={theme.title} />
              <ThemedText style={{ fontSize: 15 }} type="title">
                Be a minimun of 8 characters
              </ThemedText>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Ionicons name="checkmark-circle" size={24} color={theme.title} />
              <ThemedText style={{ fontSize: 15 }} type="title">
                Have at least one number
              </ThemedText>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Ionicons name="checkmark-circle" size={24} color={theme.title} />
              <ThemedText style={{ fontSize: 15 }} type="title">
                Have at least one uppercase and one lowercase
              </ThemedText>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Ionicons name="checkmark-circle" size={24} color={theme.title} />
              <ThemedText style={{ fontSize: 15 }} type="title">
                Have at least one special character
              </ThemedText>
            </View>
          </View>
          <AppSubmitButton title="Submit" />
        </View>
      </CustomFormik>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,

    paddingVertical: 50,
    gap: 24,
  },
  loginContainer: {
    flexDirection: "row",
    gap: 24,
  },
  welcomeBackContainer: {
    gap: 10,
  },
  text: {
    color: "#000",
    fontSize: 16,
  },
  welcomeText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  loginText: {
    color: "#000",
    fontSize: 14,
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginTop: 10,
  },
  buttonBox: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#000",
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
