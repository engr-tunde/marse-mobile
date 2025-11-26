import { Colors } from "@/constants/Colors";
import { ActivityIndicator, useColorScheme, View } from "react-native";

const ThemedLoader = ({ className }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <View className={` w-full flex justify-center items-center ${className}`}>
      <ActivityIndicator size="large" color={theme.title} />
    </View>
  );
};

export default ThemedLoader;
