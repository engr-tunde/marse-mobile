import { resendOtp, resetVerify } from "@/API";
import NormalText from "@/component/global/NormalText";
import ThemedLink from "@/component/global/ThemedLink";
import ThemedText from "@/component/global/ThemedText";
import ThemedTextOpposite from "@/component/global/ThemedTextOpposite";
import ThemedViewOpposite from "@/component/global/ThemedViewOpposite";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { errorNotification, successNotification } from "@/utils/helpers";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StatusBar, StyleSheet, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerifyAccount() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.dark;
  const { email } = useLocalSearchParams();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const resendLoginOTP = async () => {
    const response = await resendOtp({
      identifier: email,
      otpType: "reset",
    });
    if (response.status.toString().includes("20")) {
      successNotification(response.data.message);
    } else {
      errorNotification(response?.data?.message);
    }
  };

  const handleVerification = async () => {
    if (otp.length < 6) {
      errorNotification("Incomplete OTP digits!");
    } else {
      setLoading(true);
      const response = await resetVerify({ otp, identifier: email });
      if (response.status.toString().includes("20")) {
        successNotification("OTP verified! Please set a new password.");
        setLoading(false);
        router.push({
          pathname: "/newPassword",
          params: { otp },
        });
      } else {
        errorNotification("Invalid OTP. Please try again.");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds]);

  return (
    <SafeAreaView
      style={[style.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />

      <ThemedLink
        replace={true}
        link="/signin"
        style={{ fontSize: 15 }}
        type="title"
      >
        <AntDesign name="arrow-left" size={24} color={theme.title} />
      </ThemedLink>

      <View style={{ gap: 10 }}>
        <ThemedText style={{ fontSize: 20, fontWeight: "bold" }} type="title">
          Verify Account
        </ThemedText>
        <ThemedText style={{ fontSize: 15 }} type="title">
          Enter the 6-digit code sent to {email}
        </ThemedText>
      </View>

      <OtpInput
        numberOfDigits={6}
        focusColor={theme.title}
        autoFocus={false}
        hideStick={true}
        placeholder="0"
        blurOnFilled={true}
        disabled={false}
        type="numeric"
        secureTextEntry={false}
        focusStickBlinkingDuration={500}
        onFilled={(code) => setOtp(code)}
        textInputProps={{
          accessibilityLabel: "One-Time Password",
        }}
        textProps={{
          accessibilityRole: "text",
          accessibilityLabel: "OTP digit",
          allowFontScaling: false,
        }}
        theme={{
          pinCodeContainerStyle: {
            height: 50,
            width: 46,
            borderRadius: 10,
            borderColor: theme.title,
            border: 1,
          },
          pinCodeTextStyle: { color: theme.title, fontSize: 16 },
          focusedPinCodeContainerStyle: {
            borderWidth: 2,
            height: 52,
            width: 48,
          },
          placeholderTextStyle: { color: theme.text, fontSize: 14 },
          filledPinCodeContainerStyle: { color: theme.title },
        }}
      />

      {/* Resend */}
      <View style={style.resentCodeContainer}>
        <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
          <ThemedText style={{ fontSize: 15 }} type="title">
            Don't receive code?
          </ThemedText>
          <Pressable
            onPress={minutes > 0 || seconds > 0 ? null : resendLoginOTP}
          >
            <NormalText
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: minutes > 0 || seconds > 0 ? theme.subtext : theme.title,
              }}
              type="title"
            >
              Resend code
            </NormalText>
          </Pressable>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <ThemedText style={{ fontSize: 15 }}>Resend code in</ThemedText>
          <ThemedText style={{ fontSize: 15 }}>
            {minutes < 10 ? `0${minutes}` : minutes} :
          </ThemedText>
          <ThemedText
            className="text-sm font-semibold"
            style={{ color: theme.secondaryColor }}
          >
            {seconds < 10 ? `0${seconds}` : seconds}
          </ThemedText>
        </View>
      </View>

      {/* Verify Button */}
      <Pressable onPress={handleVerification} disabled={loading}>
        <ThemedViewOpposite style={[style.verifyButton]}>
          <ThemedTextOpposite>
            {loading ? "Verifying..." : "Verify code"}
          </ThemedTextOpposite>
        </ThemedViewOpposite>
      </Pressable>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    gap: 24,
  },
  verifyButton: {
    padding: 16,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  resentCodeContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
