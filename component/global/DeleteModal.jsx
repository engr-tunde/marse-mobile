import { cartDelete } from "@/assets/images";
import React from "react";
import { Image, Modal, Pressable, StyleSheet, View } from "react-native";
import ThemedText from "./ThemedText";
import ThemedView from "./ThemedView";
import ThemedViewOpposite from "./ThemedViewOpposite";

export default function ConfirmModal({
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
          <Image
            source={cartDelete}
            style={{ width: 50, height: 50, marginBottom: 10 }}
          />
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
              style={[styles.button, { backgroundColor: "#ccc" }]}
              onPress={onCancel}
            >
              <ThemedText style={styles.cancelText}>{cancelText}</ThemedText>
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
    color: "#666",
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
    borderRadius: 8,
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
