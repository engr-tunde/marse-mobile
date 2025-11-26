import ThemedText from "@/component/global/ThemedText";
import ThemedView from "@/component/global/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

const ProductSize = ({ data, selectedVariant = [], setselectedVariant = () => {} }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  // console.log("data", JSON.stringify(data, null, 2));
  // console.log("selectedVariant", selectedVariant);

  const handleSelectItem = (item, size) => {
    toggleModal();
    let currentSelectedVariants = selectedVariant;
    currentSelectedVariants.push({
      color: item?.color,
      size: size?.label,
      image: item?.images[0]?.url,
    });
    setselectedVariant(currentSelectedVariants);
  };
  const handleRemoveItem = (item) => {
    let otherVariants = selectedVariant?.filter(
      (ele) => ele.color !== item.color && ele.size !== item.size
    );
    setselectedVariant(otherVariants);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable onPress={toggleModal}>
          <ThemedText style={{ fontSize: 16 }}>
            Select sizes and color
          </ThemedText>
        </Pressable>
        <ThemedText style={{ fontSize: 16 }}>Size guide</ThemedText>
      </View>

      <View style={{ display: "flex", gap: 5, marginTop: 15 }}>
        <ThemedText>Selected Items (tap to desselect)</ThemedText>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
          }}
        >
          {selectedVariant?.map((ele, i) => (
            <Pressable key={i} onPress={() => handleRemoveItem(ele)}>
              <View
                style={[
                  {
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    width: "max-content",
                    borderWidth: 0.4,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 3,
                    borderColor: theme.placeholder,
                  },
                ]}
              >
                <View
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 20,
                    backgroundColor: ele?.color?.toLowerCase(),
                  }}
                ></View>
                <ThemedText style={{ fontSize: 12 }}>
                  Size: {ele?.size?.toUpperCase()}
                </ThemedText>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationOutTiming={300}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <ThemedView
            style={{
              width: "90%",
              marginHorizontal: "5%",
              paddingTop: 40,
              paddingBottom: 20,
              borderRadius: 10,
              padding: 10,
            }}
          >
            <Pressable
              onPress={toggleModal}
              style={{
                paddingVertical: 10,
                position: "absolute",
                top: 1,
                left: 6,
                width: "100%",
              }}
            >
              <View
                style={{
                  backgroundColor: theme.title,
                  height: 5,
                  width: "70%",
                  marginHorizontal: "auto",
                  borderRadius: 10,
                }}
              ></View>
            </Pressable>

            {data?.map((item, i) => (
              <View
                key={i}
                style={[
                  styles.itemRow,
                  {
                    borderColor: theme.placeholder,
                  },
                ]}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 20,
                      backgroundColor: item?.color?.toLowerCase(),
                    }}
                  ></View>
                  <ThemedText>{item?.color}</ThemedText>
                </View>
                <View style={styles.sizeBoxRow}>
                  {item.sizes?.map((size, k) => (
                    <Pressable
                      key={k}
                      onPress={() =>
                        selectedVariant.filter(
                          (it) =>
                            it?.size?.toLowerCase() ===
                              size?.label?.toLowerCase() &&
                            it?.color?.toLowerCase() ===
                              item?.color?.toLowerCase()
                        )?.length
                          ? null
                          : handleSelectItem(item, size)
                      }
                    >
                      <View
                        key={k}
                        style={[
                          styles.sizeBoxRow,
                          {
                            borderWidth: 0.5,
                            borderColor: theme.placeholder,
                            padding: 3,
                            borderRadius: 5,
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.sizeBox,
                            { borderColor: theme.placeholder },
                          ]}
                        >
                          {selectedVariant.filter(
                            (it) =>
                              it?.size?.toLowerCase() ===
                                size?.label?.toLowerCase() &&
                              it?.color?.toLowerCase() ===
                                item?.color?.toLowerCase()
                          )?.length ? (
                            <Ionicons
                              name="checkmark-done-circle"
                              color={theme.placeholder}
                              size={15}
                            />
                          ) : null}
                        </View>
                        <ThemedText>
                          Size: {size?.label?.toUpperCase()}
                        </ThemedText>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </ThemedView>
        </View>
      </Modal>
    </View>
  );
};

export default ProductSize;

const styles = StyleSheet.create({
  itemRow: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 10,
    borderWidth: 0.5,
    marginBottom: 10,
    borderRadius: 6,
  },
  sizeBoxRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  sizeBox: {
    borderWidth: 0.5,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
});
