import ThemedText from "@/component/global/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SelectReason() {
  const [selected, setSelected] = useState<{ [string]: boolean }>({});
  const [otherReason, setOtherReason] = useState("");
    const { currentTheme } = useTheme();
    const theme = Colors[currentTheme] ?? Colors.light;
  
    const glStyles = globalStyles();

  const toggleSelect = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const reasons = [
    "I order by mistake",
    "The delivery is taking too long",
    "Item is too expensive",
    "I want to change my order",
    "Other",
  ];

  return (
    <SafeAreaView style={[glStyles.container, { backgroundColor: theme.uiBackground }]}>
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[glStyles.containerInner]}>
        <View style={styles.header}>
          <AntDesign name="arrow-left" size={24} color="#fff" />
          <ThemedText style={styles.headerText}>Select reason</ThemedText>
          <View />
        </View>

        <Text style={styles.subtitle}>Select reasons for cancellation</Text>

        <View>
          {reasons.map((id) => (
            <View key={id}>
              <Pressable
                onPress={() => toggleSelect(id)}
                style={styles.optionRow}
              >
                <ThemedText style={styles.optionText}>{id}</ThemedText>

                <View
                  style={[
                    styles.circleCheckbox,
                    selected[id] && styles.circleCheckboxSelected,
                  ]}
                >
                  {selected[id] && <View style={styles.innerCircle} />}
                </View>
              </Pressable>

              {id === "Other" && selected["Other"] && (
                <TextInput
                  style={styles.input}
                  placeholder="Please specify your reason"
                  placeholderTextColor="#888"
                  value={otherReason}
                  onChangeText={setOtherReason}
                />
              )}
            </View>
          ))}
        </View>
        <View style={styles.submitButton}>
          <Pressable onPress={() => router.push("/forgetPassword")}>
            <ThemedText>Submit</ThemedText>
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
    backgroundColor: "#000",
    paddingTop: StatusBar.currentHeight,
    gap: 28,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 600,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  circleCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  circleCheckboxSelected: {
    borderColor: "#fff",
    backgroundColor: "#fff2",
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    color: "#fff",
    height: 100,
  },
  submitButton: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginTop: 28,
  },
});
