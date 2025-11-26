import ThemedText from "@/component/global/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StatusBar, View } from "react-native";
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
            Terms and condition
          </ThemedText>
          <View></View>
        </View>
        <View>
          <ThemedText>Effective Data: [Insert Date]</ThemedText>
          <ThemedText>
            By accessing our using Marse ("we", "our", "us") you
          </ThemedText>
          <ThemedText>
            agreed with the following term and conditons. Please
          </ThemedText>
          <ThemedText>read them carefully</ThemedText>
        </View>
        <View>
          <ThemedText style={{ fontWeight: "bold" }}>
            1. Use of the App
          </ThemedText>
          <ThemedText>You may use Marse to browse, purchase fashion</ThemedText>
          <ThemedText>items, and manage your account</ThemedText>
          <ThemedText>You agreed to:</ThemedText>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>Use the app for lawful purposes only</ThemedText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>Provide accurate, current information</ThemedText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>
              Not misuse, hack, or interfere with the platform
            </ThemedText>
          </View>
        </View>

        <View>
          <ThemedText style={{ fontWeight: "bold" }}>
            2. Account registration
          </ThemedText>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>
              You must be at least 18 years old to create an
            </ThemedText>
            <ThemedText>account.</ThemedText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>You're responsible to keep your login</ThemedText>
            <ThemedText>credentials confidentials</ThemedText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>
              You agreed not to create an account with false
            </ThemedText>
            <ThemedText>information.</ThemedText>
          </View>
        </View>

        <View>
          <ThemedText style={{ fontWeight: "bold" }}>
            3. Orders and Payments
          </ThemedText>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>
              By placing an order, you agree to pay the full
            </ThemedText>
            <ThemedText>amount, including tax and delivery fees.</ThemedText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>
              We use secure third-party payment processors
            </ThemedText>
            <ThemedText>(Stripe, Paystack, and Flutterwave).</ThemedText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>Orders are confirmed only after successful</ThemedText>
            <ThemedText>payment.</ThemedText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>
              We reserve the right to reject or cancel orders at
            </ThemedText>
            <ThemedText>
              our discretion (e.g., in case of fraud or stock issues).
            </ThemedText>
          </View>
        </View>

        <View>
          <ThemedText style={{ fontWeight: "bold" }}>
            4. Shipping and Delivery
          </ThemedText>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color={theme.title} />
            <ThemedText>
              Estimate delivery timelines will be shown at
            </ThemedText>
            <ThemedText>account.</ThemedText>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
