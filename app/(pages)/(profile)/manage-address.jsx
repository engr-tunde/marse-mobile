import { deleteAddress, fetchShippingAddresses, updateAddress } from "@/API";
import NormalText from "@/component/global/NormalText";
import ThemedAddressOpposite from "@/component/global/ThemeAddressOpposite";
import ThemedLoader from "@/component/global/ThemedLoader";
import ThemedText from "@/component/global/ThemedText";
import ThemedTextOpposite from "@/component/global/ThemedTextOpposite";
import ThemedViewOpposite from "@/component/global/ThemedViewOpposite";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { successNotification } from "@/utils/helpers";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  // Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ManageAddress() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const router = useRouter();

  const glStyles = globalStyles();

  const { shippingAddressData, shippingAddressLoading } =
    fetchShippingAddresses();

  const [modalVisible, setModalVisible] = useState(false);
  const [itemData, setitemData] = useState();

  const toggleModal = (item) => {
    setModalVisible(!modalVisible);
    setitemData(item);
  };

  const handleEditAddress = () => {
    setModalVisible(!modalVisible);
    router.push({
      pathname: "edit-address",
      params: {
        suppliedData: JSON.stringify(itemData),
      },
    });
  };

  const handleSetDefaultAddress = async () => {
    const otherAddVals = itemData;
    delete otherAddVals["isDefault"];
    const userAddress = { ...otherAddVals, isDefault: true };
    const response = await updateAddress({ userAddress });
    if (response?.status?.toString()?.includes("20")) {
      successNotification(`${otherAddVals?.addressLabel} now set to default!`);
      setModalVisible(!modalVisible);
      router.push("profile");
    } else {
      errorNotification(response?.data?.message);
    }
  };

  const handleDeleteAddress = async () => {
    const response = await deleteAddress({
      country: itemData?.country,
      addressLabel: itemData?.addressLabel,
    });
    if (response?.status?.toString()?.includes("20")) {
      successNotification(
        `Successfully deleted address with label ${itemData?.addressLabel}!`
      );
      setModalVisible(!modalVisible);
      router.push("profile");
    } else {
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
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Pressable onPress={() => router.back()} href="/profile" replace>
            <AntDesign name="arrow-left" size={22} color={theme.title} />
          </Pressable>
          <NormalText style={{ color: theme.title, fontSize: 18 }}>
            Manage address
          </NormalText>
          <Pressable onPress={() => router.push("add-address")}>
            <Fontisto name="plus-a" size={22} color={theme.title} />
          </Pressable>
        </View>

        {/* Address Card */}

        {shippingAddressData ? (
          shippingAddressData?.data?.map((ele, i) => (
            <ThemedAddressOpposite key={i} style={styles.addressBox}>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
                >
                  <ThemedText style={{ color: theme.title, fontWeight: "700" }}>
                    {ele?.addressLabel}
                  </ThemedText>
                  {ele?.isDefault ? (
                    <ThemedViewOpposite style={styles.miniBox}>
                      <ThemedTextOpposite>(default address)</ThemedTextOpposite>
                    </ThemedViewOpposite>
                  ) : null}
                </View>

                {/* Options Button */}
                <Pressable
                  // ref={iconRef}
                  onPress={() => toggleModal(ele)}
                >
                  <SimpleLineIcons
                    name="options-vertical"
                    size={20}
                    color={theme.title}
                  />
                </Pressable>
              </View>

              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: "gray",
                  width: "100%",
                  marginTop: 4,
                }}
              />

              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <NormalText style={{ fontWeight: 600 }}>
                  {ele?.fullName}
                </NormalText>
                <NormalText>{ele?.phoneNumber}</NormalText>
              </View>
              <View>
                <NormalText style={{ color: "gray" }}>{ele?.street}</NormalText>
                <NormalText style={{ color: "gray" }}>{ele?.city}.</NormalText>
              </View>
            </ThemedAddressOpposite>
          ))
        ) : shippingAddressLoading ? (
          <ThemedLoader />
        ) : null}
      </View>

      {/* Positioned Modal */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationOutTiming={300}

        // transparent
        // visible={modalVisible}
        // onRequestClose={() => setModalVisible(false)}
        // style={{ backgroundColor: "#0ff" }}
      >
        {/* <Pressable
          style={styles.fullOverlay}
          onPress={() => setModalVisible(false)}
        > */}
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedAddressOpposite style={[styles.modalBox]}>
            <Pressable onPress={handleEditAddress}>
              <ThemedText style={{ paddingVertical: 10 }}>
                Edit address
              </ThemedText>
            </Pressable>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: "gray",
                width: "100%",
                marginTop: 4,
              }}
            />
            <Pressable onPress={handleSetDefaultAddress}>
              <NormalText style={{ paddingVertical: 10 }}>
                Set as default address
              </NormalText>
            </Pressable>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: "gray",
                width: "100%",
                marginTop: 4,
              }}
            />
            <Pressable onPress={handleDeleteAddress}>
              <NormalText style={{ color: "red", paddingVertical: 10 }}>
                Delete address
              </NormalText>
            </Pressable>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: "gray",
                width: "100%",
                marginTop: 4,
              }}
            />
          </ThemedAddressOpposite>
        </View>
        {/* </Pressable> */}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addressBox: {
    width: "100%",
    height: 150,
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 10,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  miniBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 18,
  },
  fullOverlay: {
    flex: 1,
  },
  modalBox: {
    width: 200,
    borderRadius: 10,
    padding: 20,
    top: 20,
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
