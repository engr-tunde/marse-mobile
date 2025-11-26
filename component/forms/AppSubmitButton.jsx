import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { useFormikContext } from "formik";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import ThemedTextOpposite from "../global/ThemedTextOpposite";
import ThemedViewOpposite from "../global/ThemedViewOpposite";

const AppSubmitButton = ({ title, style, disabled = false }) => {
  const { handleSubmit, isSubmitting } = useFormikContext();
  const [isPressed, setIsPressed] = useState(false);
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.dark;

  return (
    <Pressable
      // onPressIn={() => setIsPressed(true)}
      // onPressOut={() => setIsPressed(false)}
      onPress={isSubmitting ? null : handleSubmit}
    >
      <ThemedViewOpposite
        style={[styles.loginButton, style, { opacity: isSubmitting ? 0.4 : 1 }]}
      >
        <ThemedTextOpposite style={{ fontWeight: "bold" }}>
          {isSubmitting ? "Submitting..." : title}
        </ThemedTextOpposite>
      </ThemedViewOpposite>
    </Pressable>
  );
};

export default AppSubmitButton;

const styles = StyleSheet.create({
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginTop: 10,
  },
});
