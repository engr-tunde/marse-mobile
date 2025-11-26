import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function CustomOtp({
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
  ...props
}) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        placeholder={placeholder}
        maxLength={1}                 // only 1 digit per box
        keyboardType="numeric"        // number pad
        style={styles.inputFields}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#bbb"
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,             // space between boxes
  },
  inputFields: {
    width: 50,                       // fixed size for OTP box
    height: 50,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    textAlign: "center",             // center number
    fontSize: 20,
    color: "#000",
  },
});
