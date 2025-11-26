import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { Entypo } from "@expo/vector-icons";
import { getIn, useFormikContext } from "formik";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import NormalText from "../global/NormalText";

const AppInputField = ({
  name,
  style,
  defaultValue,
  type = "text",
  ...props
}) => {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme];
  const { errors, values, touched, handleBlur, handleChange } =
    useFormikContext();
  const value = getIn(values, name);
  const error = getIn(errors, name);
  const isInputTouched = getIn(touched, name);
  const [showPassword, setshowPassword] = useState(false);
  const toggleShowPassword = () => {
    setshowPassword(!showPassword);
  };
  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={handleChange(name)}
          secureTextEntry={
            type === "password" ? (showPassword ? false : true) : false
          }
          {...props}
          style={[
            { color: theme.title, width: type === "password" ? "95%" : "100%" },
          ]}
          placeholderTextColor={theme.placeholder}
          defaultValue={defaultValue}
        />
        {type === "password" ? (
          <Pressable
            onPress={toggleShowPassword}
            style={{
              width: "10%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo
              name={showPassword ? "eye-with-line" : "eye"}
              size={23}
              color={theme.title}
            />
          </Pressable>
        ) : null}
      </View>
      {isInputTouched && error ? (
        <NormalText style={{ color: "red", fontSize: 12, marginTop: 2 }}>
          {error}
        </NormalText>
      ) : null}
    </View>
  );
};

export default AppInputField;

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 3,
    paddingHorizontal: 20,
  },
});
