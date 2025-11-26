import { forgetPassword } from "@/API";
import AppInputField from "@/component/forms/AppInputField";
import AppSubmitButton from "@/component/forms/AppSubmitButton";
import CustomFormik from "@/component/forms/CustomFormik";
import ThemedLink from "@/component/global/ThemedLink";
import ThemedText from "@/component/global/ThemedText";

import { resetEmailPSchema } from "@/component/validation/validation";
import { Colors } from "@/constants/Colors";

import { useTheme } from "@/hooks/useTheme";

import { forgetPasswordInitialValues } from "@/utils/initialValues";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

import { StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgetPassword() {
  const { currentTheme, toggleTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.dark;
  const initialValues = forgetPasswordInitialValues();
  const validationSchema = resetEmailPSchema;

  const handleForgetEmail = async (values) => {
    console.log("clicked");
    try {
      const result = forgetPassword(values);
      // Wait for the mutation to complete before navigating
      router.push({
        pathname: "/verify-forget-password",
        params: { email: values?.email },
      });
    } catch (error) {
      console.log("Signup failed:", error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.uiBackground }}>
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[styles.container]}>
        <ThemedLink
          replace={true}
          link="/signin"
          style={{ fontSize: 15 }}
          type="title"
        >
          <AntDesign name="arrow-left" size={24} color={theme.title} />
        </ThemedLink>
        <View>
          <CustomFormik
            initialValues={initialValues}
            onSubmit={handleForgetEmail}
            validationSchema={validationSchema}
          >
            <View style={{ gap: 10 }}>
              <View style={{ gap: 10 }}>
                <ThemedText
                  style={{ fontSize: 18, fontWeight: "bold" }}
                  type="title"
                >
                  Forgot Password?
                </ThemedText>
                <ThemedText style={{ fontSize: 15 }} type="title">
                  Enter your email address to reset your password
                </ThemedText>
              </View>
              <View style={{ gap: 8 }}>
                <ThemedText style={{ fontSize: 15 }} type="title">
                  Email address
                </ThemedText>
                <AppInputField
                  name="email"
                  placeholder="Enter your email address"
                />
              </View>
              <AppSubmitButton title="Send" />
            </View>
          </CustomFormik>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  sendButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginTop: 28,
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginTop: 4,
  },
});
