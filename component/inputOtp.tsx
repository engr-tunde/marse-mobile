import { SafeAreaView, StyleSheet, TextInput } from "react-native";

interface Props{
    value?: string;
    placeholder: string;
    secureTextEntry?: boolean;
    onChangeText?: (text: string) => void;
}

export default function CustomInput({value, placeholder, onChangeText, secureTextEntry}: Props) {
    return (
        <SafeAreaView>
            <TextInput
            value={value}
            placeholder={placeholder}
            style={styles.inputFields}
            secureTextEntry={secureTextEntry}
            placeholderTextColor="#000"
            onChangeText={onChangeText}
             />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    inputFields: {
        width: 50,
        height:60,
        // backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 8,
        // paddingHorizontal: 20,
        // marginBottom: 20,
        fontSize: 20,
        color: "#000",
        textAlign: "center",
    }
})