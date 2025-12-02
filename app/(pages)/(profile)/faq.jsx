import ThemedText from "@/component/global/ThemedText";
import { Colors } from "@/constants/Colors";
import { faqData } from "@/data";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { Entypo } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StatusBar, View } from "react-native";
import * as Animatable from "react-native-animatable";
import Accordion from "react-native-collapsible/Accordion";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FAQ() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const glStyles = globalStyles();
  const [activeSections, setactiveSections] = useState([]);

  const accordTitle = (data) => {
    return <View>{/* <Text>{data.answer}</Text> */}</View>;
  };
  const accordHeader = (data, index, isActive, sections) => {
    return (
      <Animatable.View
        style={{
          borderBottomColor: !isActive && theme.placeholder,
          borderBottomWidth: 0.5,
          borderRadius: isActive && 10,
          paddingBottom: 3,
          marginTop: 20,
        }}
        duration={300}
        transition={theme.placeholder}
      >
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
            paddingBottom: 10,
          }}
        >
          <ThemedText
            style={{
              fontSize: 16,
              fontWeight: 600,
              textWrap: "wrap",
              maxWidth: "80%",
            }}
          >
            {data.header}
          </ThemedText>
          <Entypo
            name={isActive ? "chevron-small-up" : "chevron-small-down"}
            size={24}
            color={theme.title}
          />
        </View>
      </Animatable.View>
    );
  };
  const accordContent = (data, i, isActive) => {
    return (
      <View
        style={{
          borderBottomColor: isActive && theme.placeholder,
          borderBottomWidth: isActive && 0.5,
          // height: "max-content",
        }}
      >
        <ThemedText
          type="text"
          style={{
            paddingBottom: 12,
            fontSize: 15,
          }}
        >
          {data.content}
        </ThemedText>
      </View>
    );
  };
  const handleUpdateSection = (data) => {
    setactiveSections(data);
  };

  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[glStyles.containerInner, { gap: 20, marginTop: 20 }]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Pressable onPress={() => router.back()}>
            <AntDesign name="arrow-left" size={24} color={theme.title} />
          </Pressable>
          <ThemedText
            style={{
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            FAQ
          </ThemedText>
          <View></View>
        </View>
        <View>
          <Accordion
            sections={faqData}
            activeSections={activeSections}
            renderSectionTitle={accordTitle}
            renderHeader={accordHeader}
            renderContent={accordContent}
            onChange={handleUpdateSection}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
