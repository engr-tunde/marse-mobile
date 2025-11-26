import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ThemedViewOpposite = ({ style, safe = false, ...props }) => {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;

  if (!safe)
    return (
      <View style={[{ backgroundColor: theme.title }, style]} {...props} />
    );

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          backgroundColor: theme.title,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedViewOpposite;
