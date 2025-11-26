import { filterDarkIcon, filterIcon } from "@/assets/images";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { Image, Pressable, StyleSheet, TextInput } from "react-native";
import ThemedView from "./ThemedView";

export default function SearchInput({
  handleClick = null,
  handleFilter = null,
  value = "",
  onChangeText,
}) {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.dark;

  return (
    <ThemedView style={[styles.inputWrapper, { borderColor: theme.title }]}>
      <Pressable onPress={handleClick}>
        <Feather
          name="search"
          size={16}
          color={theme.title}
          style={styles.icon}
        />
      </Pressable>

      <TextInput
        placeholder="Search...."
        onChangeText={(value) => onChangeText(value)}
        // value={value}
        style={[styles.inputFields, { color: theme.title }]}
        placeholderTextColor={theme.title}
      />

      <Pressable onPress={handleFilter}>
        <Image
          source={currentTheme === "dark" ? filterDarkIcon : filterIcon}
          style={styles.filterIcon}
          resizeMode="contain"
        />
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 18,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 12,
  },
  inputFields: {
    flex: 1,
    fontSize: 16,
  },
  filterIcon: {
    width: 18,
    height: 18,
    marginLeft: 12,
  },
});
