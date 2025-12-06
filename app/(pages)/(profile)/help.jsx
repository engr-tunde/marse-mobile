import ThemedText from "@/component/global/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { Pressable, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Help() {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const glStyles = globalStyles();

  const recipientEmail = "marse@gmail.com";
  const subject = "Inquiry about my order";

  const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}`;

  const handleSendEmail = async () => {
    // try {
    //   const canOpen = await Linking.canOpenURL(mailtoUrl);
    //   if (canOpen) {
    //     await Linking.openURL(mailtoUrl);
    //   } else {
    //     infoNotification("No email client found on your device.");
    //   }
    // } catch (error) {
    //   console.error("An error occurred:", error);
    //   errorNotification("Unable to open support chat link");
    // }
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
            Help Center
          </ThemedText>
          <AntDesign name="arrow-left" size={24} color={theme.uiBackground} />
        </View>

        <View style={styles.container}>
          <View style={styles.cardRow}>
            <View style={styles.cardContent}>
              <View style={[styles.cardIcon, { borderColor: theme.title }]}>
                <FontAwesome5 name="phone-alt" size={20} color={theme.title} />
              </View>
              <ThemedText style={{ fontWeight: 600 }}>
                Contact Number
              </ThemedText>
              <ThemedText type="text" style={{ fontWeight: 400 }}>
                +318914897
              </ThemedText>
            </View>
            <View style={styles.cardContent}>
              <View style={[styles.cardIcon, { borderColor: theme.title }]}>
                <MaterialCommunityIcons
                  name="email-open"
                  size={23}
                  color={theme.title}
                />
              </View>
              <ThemedText style={{ fontWeight: 600 }}>Email address</ThemedText>
              <ThemedText type="text" style={{ fontWeight: 400 }}>
                {recipientEmail}
              </ThemedText>
            </View>
          </View>
          <View style={styles.cardRow}>
            <View style={styles.cardContent}>
              <View style={[styles.cardIcon, { borderColor: theme.title }]}>
                <MaterialCommunityIcons
                  name="web"
                  size={27}
                  color={theme.title}
                />
              </View>
              <ThemedText style={{ fontWeight: 600 }}>Website</ThemedText>
              <ThemedText type="text" style={{ fontWeight: 400 }}>
                https://themrse.com
              </ThemedText>
            </View>
            <View style={styles.cardContent}>
              <View style={[styles.cardIcon, { borderColor: theme.title }]}>
                <SimpleLineIcons
                  name="location-pin"
                  size={22}
                  color={theme.title}
                />
              </View>
              <ThemedText style={{ fontWeight: 600 }}>Location</ThemedText>
              <ThemedText type="text" style={{ fontWeight: 400 }}>
                Lagos, Nigeria
              </ThemedText>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 2,
            width: "100%",
            backgroundColor: theme.cardBackground,
          }}
        ></View>

        <View style={[styles.cardContent, { gap: 15, paddingHorizontal: 10 }]}>
          <ThemedText
            style={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Customer Support
          </ThemedText>
          <ThemedText
            type="text"
            style={{ fontSize: 13, fontWeight: 400, marginBottom: 10 }}
          >
            {`Have any issues with your shopping experience? \nWe'd love to hear from you, share your feedback below.`}
          </ThemedText>

          <Pressable onPress={handleSendEmail}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                justifyConalignItemstent: "center",
                gap: 8,
                padding: 13,
                backgroundColor: theme.uiBackground,
                // borderWidth: 1,
                // borderColor: theme.title,
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                margin: 10,
              }}
            >
              <ThemedText
                type="text"
                style={{ fontSize: 13, fontWeight: 400, paddingTop: 2 }}
              >
                Let's discuss
              </ThemedText>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={23}
                color={theme.title}
              />
            </View>
          </Pressable>
        </View>
        <View></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "88%",
    paddingLeft: 20,
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    gap: 40,
  },
  cardRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: 5,
  },
  cardIcon: {
    height: 43,
    width: 43,
    borderRadius: "50%",
    // padding: 10,
    borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
});
