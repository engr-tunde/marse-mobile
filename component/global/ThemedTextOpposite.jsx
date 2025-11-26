import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { Text } from "react-native";

const ThemedTextOpposite = ({
  style,
  type = "title",
  title = false,
  ...props
}) => {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.dark;

  const textColor = type === "title" ? theme.uiBackground : theme.uiBackground;

  const fontFamily =
    style?.fontWeight === 500
      ? "Urbanist_500Medium"
      : style?.fontWeight === 600
      ? "Urbanist_600SemiBold"
      : style?.fontWeight === 700
      ? "Urbanist_700Bold"
      : style?.fontWeight === 800
      ? "Urbanist_800ExtraBold"
      : style?.fontWeight === 900
      ? "Urbanist_900Black"
      : style?.fontWeight === "bold"
      ? "Urbanist_700Bold"
      : "Urbanist_400Regular";

  return (
    <Text
      style={[{ color: textColor, fontFamily: fontFamily }, style]}
      {...props}
    />
  );
};

export default ThemedTextOpposite;
