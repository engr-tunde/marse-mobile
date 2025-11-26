import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";

const TableSizes = () => {
  const tableHead = ["Size", "UK", "US", "Chest", "Waist"];
  const tableData = [
    ["XS", "0", "0", "78-80cm", "78-80cm"],
    ["S", "2", "2", "78-80cm", "78-80cm"],
    ["M", "4", "4", "78-80cm", "78-80cm"],
    ["L", "6", "6", "78-80cm", "78-80cm"],
    ["XL", "8", "8", "78-80cm", "78-80cm"],
    ["XXL", "10", "10", "78-80cm", "78-80cm"]
  ];

      const { currentTheme } = useTheme();
      const theme = Colors[currentTheme] ?? Colors.light;

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1, borderColor: "#ccc"}}>
        <Row data={tableHead}  textStyle={[styles.text, { color: theme.title}]} />
        <Rows data={tableData}  textStyle={[styles.text, { color: theme.title}]} />
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
//   head: { height: 50 },
  text: { margin: 6, textAlign: "center", fontFamily: 'Urbanist_400Regular' },
});

export default TableSizes;
