import { updateAddress } from "@/API";
import AppInputField from "@/component/forms/AppInputField";
import AppSubmitButton from "@/component/forms/AppSubmitButton";
import CustomFormik from "@/component/forms/CustomFormik";
import ThemedLoader from "@/component/global/ThemedLoader";
import ThemedText from "@/component/global/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { errorNotification } from "@/utils/helpers";
import { shippingAddressValues } from "@/utils/initialValues";
import { shippingAddressSchema } from "@/utils/validations";
import AntDesign from "@expo/vector-icons/AntDesign";
import Checkbox from "expo-checkbox";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShippingAddress() {
  const { currentTheme } = useTheme();
  const [defaultAddress, setdefaultAddress] = useState();
  const theme = Colors[currentTheme] ?? Colors.light;
  const { suppliedData } = useLocalSearchParams();
  const [addressData, setaddressData] = useState();
  const initialValues = shippingAddressValues(addressData ?? addressData);
  const validationSchema = shippingAddressSchema();

  useEffect(() => {
    if (suppliedData) {
      let data = JSON.parse(suppliedData);
      setaddressData(data);
    }
  }, [suppliedData]);

  const handleSaveAddress = async (values) => {
    const userAddress = { ...values, isDefault: defaultAddress };
    const response = await updateAddress({ userAddress });
    if (response?.status?.toString()?.includes("20")) {
      router.replace("/manage-address");
    } else {
      errorNotification(response?.data?.message);
    }
  };

  const glStyles = globalStyles();
  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />

      <View
        style={[
          glStyles.containerInner,
          { gap: 20, marginTop: 20, paddingHorizontal: 20 },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Pressable onPress={() => router.back()} replace>
            <AntDesign name="arrow-left" size={24} color={theme.title} />
          </Pressable>
          <ThemedText style={{ fontSize: 18, fontWeight: 600 }}>
            Shipping Address
          </ThemedText>
          <View></View>
        </View>
        <KeyboardAvoidingView behavior="padding">
          <ScrollView
            contentContainerStyle={{ gap: 24, paddingBottom: 64 }}
            showsVerticalScrollIndicator={false}
          >
            {addressData ? (
              <CustomFormik
                initialValues={initialValues}
                onSubmit={handleSaveAddress}
                validationSchema={validationSchema}
              >
                <View style={{ paddingBottom: 80 }}>
                  <View style={{ gap: 8, marginBottom: 20 }}>
                    <ThemedText style={{ fontSize: 15 }} type="title">
                      Full name
                    </ThemedText>
                    <AppInputField
                      name="fullName"
                      defaultValue={addressData?.fullName}
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
                      defaultValue={addressData?.email}
                    />
                  </View>
                  <View style={{ gap: 8, marginBottom: 20 }}>
                    <ThemedText style={{ fontSize: 15 }} type="title">
                      Phone number (with your country code)
                    </ThemedText>
                    <AppInputField
                      name="phoneNumber"
                      defaultValue={addressData?.phoneNumber}
                      placeholder="Enter your phone number"
                    />
                  </View>
                  <View style={{ gap: 8, marginBottom: 20 }}>
                    <ThemedText style={{ fontSize: 15 }} type="title">
                      City
                    </ThemedText>
                    <AppInputField
                      name="city"
                      defaultValue={addressData?.city}
                      placeholder="Enter your city"
                    />
                  </View>
                  <View style={{ gap: 8, marginBottom: 20 }}>
                    <ThemedText style={{ fontSize: 15 }} type="title">
                      Country
                    </ThemedText>
                    <AppInputField
                      name="country"
                      defaultValue={addressData?.country}
                      placeholder="Select country"
                    />
                  </View>
                  <View style={{ gap: 8, marginBottom: 20 }}>
                    <ThemedText style={{ fontSize: 15 }} type="title">
                      State
                    </ThemedText>
                    <AppInputField
                      name="state"
                      defaultValue={addressData?.state}
                      placeholder="State code"
                    />
                  </View>
                  <View style={{ gap: 8, marginBottom: 20 }}>
                    <ThemedText style={{ fontSize: 15 }} type="title">
                      Street Address
                    </ThemedText>
                    <AppInputField
                      name="street"
                      defaultValue={addressData?.street}
                      placeholder="Enter your street address"
                    />
                  </View>
                  <View style={{ gap: 8, marginBottom: 20 }}>
                    <ThemedText style={{ fontSize: 15 }} type="title">
                      Address Label
                    </ThemedText>
                    <AppInputField
                      name="addressLabel"
                      defaultValue={addressData?.addressLabel}
                      placeholder="Enter any label for you address"
                    />
                  </View>
                  <View style={{ gap: 8, marginBottom: 20 }}>
                    <ThemedText style={{ fontSize: 15 }} type="title">
                      Postal code
                    </ThemedText>
                    <AppInputField
                      name="postalCode"
                      defaultValue={addressData?.postalCode}
                      placeholder="Enter your city postal code"
                    />
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 10,
                      marginBottom: 10,
                    }}
                  >
                    <Checkbox
                      value={defaultAddress}
                      onValueChange={() => setdefaultAddress(!defaultAddress)}
                      color={defaultAddress ? theme.checkBox : undefined}
                      style={{ borderWidth: 1.5, borderColor: theme.title }}
                    />
                    <Pressable
                      onPress={() => setdefaultAddress(!defaultAddress)}
                    >
                      <ThemedText
                        style={{
                          fontSize: 15,
                        }}
                      >
                        Add as default adress?
                      </ThemedText>
                    </Pressable>
                  </View>
                  <AppSubmitButton
                    title={addressData ? "Update address" : "Save address"}
                  />
                </View>
              </CustomFormik>
            ) : (
              <View
                style={{
                  height: 500,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ThemedLoader />
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
