import ThemedText from "@/component/global/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { StatusBar, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Privacy() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const glStyles = globalStyles();

  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[glStyles.containerInner, { gap: 20 }]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
         <Pressable onPress={() => router.back()}>
            <AntDesign name="arrow-left" size={24} color={theme.title} />
          </Pressable>
          <ThemedText
            style={{
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Privacy and Policy
          </ThemedText>
          <View></View>
        </View>
        <View>
          <ThemedText>Effective Data: [Insert Date]</ThemedText>
          <ThemedText>
            Marse ("we", "our", "us") respects your privacy and is
          </ThemedText>
          <ThemedText>
            committed to protecting your personal information.
          </ThemedText>
          <ThemedText>
            This Privacy Policy explains how to collect, use,
          </ThemedText>
          <ThemedText>share, and protect your data when you use our</ThemedText>
          <ThemedText>mobile application, website and services.</ThemedText>
        </View>
        <View>
          <ThemedText style={{ fontWeight: "bold" }}>
            Information We Collect
          </ThemedText>
          <ThemedText>
            We may collect the following type of information
          </ThemedText>
        </View>
        <View>
          <ThemedText style={{ fontWeight: "bold" }}>
            a. Personal Information
          </ThemedText>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>Full name</ThemedText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>Email address</ThemedText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>Phone number</ThemedText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>Shipping/billing address</ThemedText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>Date of birth (optional)</ThemedText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>Gender (optional)</ThemedText>
          </View>
        </View>
        {/** other transaction details */}
        <View>
          <ThemedText style={{ fontWeight: "bold" }}>
            b. Order & Transaction Details
          </ThemedText>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>Products ordered</ThemedText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>
              Payment method (e.g, Paystack, Flutterwave, Stripe)
            </ThemedText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>Delivery status and history</ThemedText>
          </View>
        </View>
        <View>
          <ThemedText style={{ fontWeight: "bold" }}>
            c. Technical & Usage Information
          </ThemedText>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>Device information (model, OSversion)</ThemedText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>IP address</ThemedText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>Log and usage data</ThemedText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>Cookies and analytics identifiers</ThemedText>
          </View>
        </View>
        <View>
          <ThemedText style={{ fontWeight: "bold" }}>
            2. How We Use Your Information
          </ThemedText>
          <ThemedText>We use your data to:</ThemedText>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>Process and fulfil your orders</ThemedText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>Send order updates and confirmation</ThemedText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>Enable secure payments</ThemedText>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
