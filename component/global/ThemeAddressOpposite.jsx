import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ThemedAddressOpposite = ({ style, safe = false, children, ...props }) => {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;

  if (!safe)
    return (
      <View style={[{ backgroundColor: theme.address }, style]} {...props} >
         {children}
      </View>
    );

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          backgroundColor: theme.address,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
      {...props}
    >
       {children}
    </View>
  );
};

export default ThemedAddressOpposite;
