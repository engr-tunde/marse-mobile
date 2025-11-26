import { changePassword } from "@/API";
import AppInputField from "@/component/forms/AppInputField";
import AppSubmitButton from "@/component/forms/AppSubmitButton";
import CustomFormik from "@/component/forms/CustomFormik";
import ThemedText from "@/component/global/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { errorNotification, successNotification } from "@/utils/helpers";
import { changePasswordInitialValues } from "@/utils/initialValues";
import { changePasswordSchema } from "@/utils/validations";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Pressable, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewPassword() {
  const { currentTheme, toggleTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.dark;
  const initialValues = changePasswordInitialValues();
  const validationSchema = changePasswordSchema();
  const glStyles = globalStyles();
  const router = useRouter();

  const handleChangePassword = async (values) => {
    const response = await changePassword(values);
    if (response?.status?.toString().includes("20")) {
      console.log(response);
      successNotification(response?.data?.message);
      router.push("/security");
    } else {
      console.log(response?.data?.message);
      errorNotification(response?.data?.message);
    }
  };

  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />

      <View style={[glStyles.containerInner, { gap: 20, marginTop: 20 }]}>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable onPress={() => router.back()} style={{ fontSize: 15 }}>
            <AntDesign name="arrow-left" size={24} color={theme.title} />
          </Pressable>
          <ThemedText style={{ fontSize: 18, fontWeight: 600 }}>
            Changed password
          </ThemedText>
          <View></View>
        </View>

        <CustomFormik
          initialValues={initialValues}
          onSubmit={handleChangePassword}
          validationSchema={validationSchema}
        >
          <View style={{ gap: 10 }}>
            <View style={{ gap: 8 }}>
              <ThemedText style={{ fontSize: 15 }} type="title">
                Current password
              </ThemedText>
              <AppInputField
                type="currentPassword"
                name="currentPassword"
                placeholder="Enter your current password"
              />
            </View>
            <View style={{ gap: 8 }}>
              <ThemedText style={{ fontSize: 15 }} type="title">
                Enter new password
              </ThemedText>
              <AppInputField
                type="password"
                name="password"
                placeholder="Enter your new password"
              />
            </View>
            <View style={{ gap: 8 }}>
              <ThemedText style={{ fontSize: 15 }} type="title">
                Confirm new Password
              </ThemedText>
              <AppInputField
                type="confirmPassword"
                name="confirmPassword"
                placeholder="confirm your new password"
              />
            </View>
            <View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={theme.title}
                />
                <ThemedText style={{ fontSize: 15 }} type="title">
                  Be a minimun of 8 characters
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
          </View>
          {/* 
          <Pressable onPress={() => router.push("/home")}>
          <ThemedViewOpposite style={[style.loginButton]}>
          <ThemedTextOpposite>Submit</ThemedTextOpposite>
          </ThemedViewOpposite> 
          </Pressable>
          */}
          <AppSubmitButton title={"Submit"} />
        </CustomFormik>
      </View>
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
});
