import { cartDelete } from "@/assets/images";
import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import NormalText from "../global/NormalText";
import ThemedText from "../global/ThemedText";
import ThemedView from "../global/ThemedView";
import ThemedViewOpposite from "../global/ThemedViewOpposite";

export default function CancelOrderModal({
  visible,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onCancel}
    >
      <ThemedViewOpposite style={styles.overlay}>
        <ThemedView style={styles.container}>
          <View
            source={cartDelete}
            style={{
              width: 50,
              height: 50,
              marginBottom: 10,
              backgroundColor: "#e53935",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NormalText style={{ color: "#fff", fontSize: 25 }}>x</NormalText>
          </View>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedText style={styles.message}>{message}</ThemedText>

          <View style={styles.buttons}>
            <Pressable
              style={[styles.button, { backgroundColor: "#e53935" }]}
              onPress={onConfirm}
            >
              <ThemedText style={styles.confirmText}>{confirmText}</ThemedText>
            </Pressable>

            <Pressable
              style={[
                styles.button,
                { borderColor: "#e53935", borderWidth: 1 },
              ]}
              onPress={onCancel}
            >
              <NormalText style={[styles.cancelText, { color: "#e53935" }]}>
                {cancelText}
              </NormalText>
            </Pressable>
          </View>
        </ThemedView>
      </ThemedViewOpposite>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  container: {
    // backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    height: 250,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "600",
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
