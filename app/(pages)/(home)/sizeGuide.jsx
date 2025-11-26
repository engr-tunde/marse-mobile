import NormalText from "@/component/global/NormalText";
import ThemedText from "@/component/global/ThemedText";
import TableSizes from "@/component/TableSize";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Size() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;

  const glStyles = globalStyles();

  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={glStyles.containerInner}>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="home" replace>
            <AntDesign name="arrow-left" size={24} color={theme.title} />
          </Link>
          <NormalText
            style={{
              color: theme.title,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Size guide
          </NormalText>
          <View></View>
        </View>
        <TableSizes />
        <View>
          <ThemedText
            style={{
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {" "}
            How to Measure{" "}
          </ThemedText>
          <View style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Entypo name="dot-single" size={18} color="#ccc" />
              <View>
                <NormalText style={styles.textStyle}>
                  Bust: Measure around the fullest part of your
                </NormalText>
                <NormalText style={styles.textStyle}>chest.</NormalText>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Entypo name="dot-single" size={18} color="#ccc" />
              <View>
                <NormalText style={styles.textStyle}>
                  Waist: Measure around the narrowest part of
                </NormalText>
                <NormalText style={styles.textStyle}>your waistline.</NormalText>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Entypo name="dot-single" size={18} color="#ccc" />
              <View>
                <NormalText style={styles.textStyle}>
                  Hips: Measure around the widest part of your
                </NormalText>
                <NormalText style={styles.textStyle}>hips.</NormalText>
              </View>
            </View>
          </View>
        </View>
        <ThemedText
          style={{
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          Fit Notes
        </ThemedText>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color="#ccc" />
            <View>
              <NormalText style={styles.textStyle}>
                Sizes may vary slightly depending on the brand
              </NormalText>
              <NormalText style={styles.textStyle}>or designer.</NormalText>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color="#ccc" />
            <NormalText style={styles.textStyle}>
              For a looser fit, consider sizing up.
            </NormalText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="dot-single" size={18} color="#ccc" />
            <View>
              <NormalText style={styles.textStyle}>
                If you're between sizes, we recommend choosing
              </NormalText>
              <NormalText style={styles.textStyle}>the larger one for comfort.</NormalText>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: "#ddd",
  },
});
