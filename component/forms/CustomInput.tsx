import { SafeAreaView, StyleSheet, TextInput } from "react-native";

interface Props {
  value?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
}

export default function CustomInput({
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
}: Props) {
  console.log("value", value);
  return (
    <SafeAreaView>
      <TextInput
        value={value}
        placeholder={placeholder}
        style={[styles.inputFields]}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#bbb"
        onChangeText={onChangeText}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputFields: {
    width: "100%",
    height: 50,
    // backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 3,
    paddingHorizontal: 20,
    color: "#000",
  },
});
