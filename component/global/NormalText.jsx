import { Text } from "react-native";

const NormalText = ({ style, type = "title", title = false, ...props }) => {
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

  return <Text style={[{ fontFamily: fontFamily }, style]} {...props} />;
};

export default NormalText;
