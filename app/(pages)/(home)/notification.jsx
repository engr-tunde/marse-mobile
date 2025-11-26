import {
  basket,
  box,
  car,
  darkBasket,
  darkBox,
  darkCar,
  darkRead,
  darkUser,
  read,
  user,
} from "@/assets/images";
import ThemedText from "@/component/global/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notification() {
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
      <View style={[glStyles.containerInner, { paddingBottom: 10 }]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Pressable onPress={() => router.back("/home")}>
            <AntDesign name="arrow-left" size={24} color={theme.title} />
          </Pressable>
          <ThemedText
            style={{
              fontSize: 18,
            }}
          >
            Notification
          </ThemedText>
          <Text></Text>
        </View>
        <View style={{ gap: 20 }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginBottom: 20,
                justifyContent: "space-between",
              }}
            >
              <Image source={currentTheme === "dark" ? car : darkCar} />
              <Text
                style={{
                  color: theme.title,
                  fontSize: 16,
                  fontWeight: "bold",
                  fontFamily: "Urbanist_400Regular",
                }}
              >
                Package Sent
              </Text>
              <Text></Text>
              <Text
                style={{
                  color: "gray",
                  fontSize: 12,
                  fontFamily: "Urbanist_400Regular",
                }}
              >
                10 minutes ago
              </Text>
            </View>
            <Text
              style={{ color: theme.title, fontFamily: "Urbanist_400Regular" }}
            >
              Yours marse order #8739938 has been shipped! You
            </Text>
            <Text
              style={{ color: theme.title, fontFamily: "Urbanist_400Regular" }}
            >
              Can track your delivery in the app
            </Text>
            <Text
              style={{
                color: theme.title,
                fontWeight: "bold",
                gap: 10,
                fontSize: 16,
                fontFamily: "Urbanist_400Regular",
              }}
            >
              Track order
            </Text>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: "gray",
                width: "100%",
                marginTop: 4,
              }}
            />
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginBottom: 20,
                justifyContent: "space-between",
              }}
            >
              <Image source={currentTheme === "dark" ? basket : darkBasket} />
              <Text
                style={{
                  color: theme.title,
                  fontSize: 16,
                  fontWeight: "bold",
                  fontFamily: "Urbanist_400Regular",
                }}
              >
                Order Completed
              </Text>
              <Text></Text>
              <Text
                style={{
                  color: "gray",
                  fontSize: 12,
                  fontFamily: "Urbanist_400Regular",
                }}
              >
                10 minutes ago
              </Text>
            </View>
            <Text
              style={{ color: theme.title, fontFamily: "Urbanist_400Regular" }}
            >
              You have successfully purchase "Shinny Dress" gown.
            </Text>
            <Text
              style={{ color: theme.title, fontFamily: "Urbanist_400Regular" }}
            >
              Thank you and wait for your package to arrive
            </Text>
            <Text
              style={{
                color: theme.title,
                fontWeight: "bold",
                gap: 10,
                fontSize: 16,
                fontFamily: "Urbanist_400Regular",
              }}
            >
              View order
            </Text>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: "gray",
                width: "100%",
                marginTop: 4,
              }}
            />
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginBottom: 20,
                justifyContent: "space-between",
              }}
            >
              <Image source={currentTheme === "dark" ? read : darkRead} />
              <Text
                style={{
                  color: theme.title,
                  fontSize: 16,
                  fontWeight: "bold",
                  fontFamily: "Urbanist_400Regular",
                }}
              >
                Order Comfirmation
              </Text>
              <Text></Text>
              <Text
                style={{
                  color: "gray",
                  fontSize: 12,
                  fontFamily: "Urbanist_400Regular",
                }}
              >
                10 minutes ago
              </Text>
            </View>
            <Text
              style={{ color: theme.title, fontFamily: "Urbanist_400Regular" }}
            >
              Thank for shopping with marse. Your order
            </Text>
            <Text
              style={{ color: theme.title, fontFamily: "Urbanist_400Regular" }}
            >
              #8739938 is confirm and will be packed soon. You'll
            </Text>
            <Text
              style={{ color: theme.title, fontFamily: "Urbanist_400Regular" }}
            >
              recieved updates every step of the way
            </Text>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: "gray",
                width: "100%",
                marginTop: 4,
              }}
            />
          </View>
          <View>
            <Text></Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginBottom: 20,
                justifyContent: "space-between",
              }}
            >
              <Image source={currentTheme === "dark" ? box : darkBox} />
              <Text
                style={{
                  color: theme.title,
                  fontSize: 16,
                  fontWeight: "bold",
                  fontFamily: "Urbanist_400Regular",
                }}
              >
                Payment failed
              </Text>
              <Text></Text>
              <Text
                style={{
                  color: "gray",
                  fontSize: 12,
                  fontFamily: "Urbanist_400Regular",
                }}
              >
                10 minutes ago
              </Text>
            </View>
            <Text
              style={{ color: theme.title, fontFamily: "Urbanist_400Regular" }}
            >
              We couldn't process your payment for the the order
            </Text>
            <Text
              style={{ color: theme.title, fontFamily: "Urbanist_400Regular" }}
            >
              #[MAR50234]. You can try or choose another
            </Text>
            <Text
              style={{
                color: theme.title,
                fontWeight: "bold",
                gap: 10,
                fontSize: 16,
                fontFamily: "Urbanist_400Regular",
              }}
            >
              Payment method
            </Text>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: "gray",
                width: "100%",
                marginTop: 4,
              }}
            />
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginBottom: 20,
                justifyContent: "space-between",
              }}
            >
              <Image source={currentTheme === "dark" ? user : darkUser} />
              <Text
                style={{
                  color: theme.title,
                  fontSize: 16,
                  fontWeight: "bold",
                  fontFamily: "Urbanist_400Regular",
                }}
              >
                Welcome to Marse
              </Text>
              <Text></Text>
              <Text
                style={{
                  color: "gray",
                  fontSize: 12,
                  fontFamily: "Urbanist_400Regular",
                }}
              >
                10 minutes ago
              </Text>
            </View>
            <Text
              style={{ color: theme.title, fontFamily: "Urbanist_400Regular" }}
            >
              You're officially in. Start exploring curated collections
            </Text>
            <Text
              style={{ color: theme.title, fontFamily: "Urbanist_400Regular" }}
            >
              From top African designers -- tailored to your taste.
            </Text>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: "gray",
                width: "100%",
                marginTop: 4,
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
    paddingTop: StatusBar.currentHeight,
    gap: 28,
  },
  subContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
