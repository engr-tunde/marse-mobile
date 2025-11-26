import {
  categoryBrands,
  categoryKids,
  categoryMen,
  categoryWomen,
} from "@/assets/images";
import NormalText from "@/component/global/NormalText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { useRouter } from "expo-router";
import {
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Category() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;

  const router = useRouter();
  const glStyles = globalStyles();

  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <View
        style={[
          glStyles.containerInner,
          { gap: 20, marginTop: Platform.OS === "ios" ? 10 : 20 },
        ]}
      >
        <View style={{ marginBottom: 20 }}>
          <NormalText
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: theme.title,
              marginBottom: 8,
            }}
          >
            Categories
          </NormalText>
          <Text
            style={{
              color: theme.text,
              fontWeight: "300",
              fontFamily: "Urbanist_400Regular",
            }}
          >
            Select a style to explore
          </Text>
        </View>
        <View style={{ gap: 20 }}>
          <Pressable onPress={() => router.push("/brands")}>
            <Image source={categoryBrands} style={styles.images} />
          </Pressable>
          <Pressable onPress={() => router.push("/men")}>
            <Image source={categoryMen} style={styles.images} />
          </Pressable>
          <Pressable onPress={() => router.push("/women")}>
            <Image source={categoryWomen} style={styles.images} />
          </Pressable>
          <Pressable onPress={() => router.push("/kids")}>
            <Image source={categoryKids} style={styles.images} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 28,
    paddingTop: StatusBar.currentHeight,
  },
  images: {
    width: "100%",
    resizeMode: "contain",
  },
});
