import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  // useEffect(() => {
  //   setTimeout(() => {
  //     // router.replace("/signin");
  //   }, 100);
  // }, []);

  return (
    <SafeAreaView style={style.container}>
      <View>
        <Text style={style.text} onPress={() => router.replace("signin")}>
          Coming soon.
        </Text>
        {/* <Image source={splashWomen} resizeMode="cover" style={{ alignContent: "center", justifyContent: "center"}}/>
        <Image source={splashBackground} style={{ flex: 1, zIndex: 1, marginBottom: 20}}/> */}
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  text: {
    color: "#000",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#000056",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
