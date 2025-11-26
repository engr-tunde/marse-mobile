import { Image, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { filterDarkIcon, filterIcon } from "@/assets/images";

export default function FilterInput() {
      const { currentTheme } = useTheme();
      const theme = Colors[currentTheme] ?? Colors.dark;

    return (
        <ThemedView style={[styles.inputWrapper, { borderColor: theme.title }]}>
                <TextInput
                    placeholder="Dinner gown"
                    style={[styles.inputFields, { color: theme.title }]}
                    placeholderTextColor={theme.title}
                />

                <Image
                    source={currentTheme === "dark" ? filterDarkIcon : filterIcon}
                    style={styles.filterIcon}
                    resizeMode="contain"
                />
            </ThemedView>
    );
}

const styles = StyleSheet.create({
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#fff",
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
        color: "#fff",
        fontSize: 16,
    },
    filterIcon: {
        width: 18,
        height: 18,
        marginLeft: 12,
    }
});
