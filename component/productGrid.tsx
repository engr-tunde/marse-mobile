import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from "react-native";

interface Product {
  id?: string | number;
  [key: string]: any;
}

interface ProductGridProps {
  data: Product[];
  renderItem: ListRenderItem<Product>;
  numColumns?: number;
  spacing?: number;
}

export default function ProductGrid({
  data,
  renderItem,
  numColumns = 2,
  spacing = 10,
}: ProductGridProps) {
  const screenWidth = Dimensions.get("window").width;

  // Account for parent container padding (40 total: 20 left + 20 right)
  const parentPadding = 40;

  // Available width after parent padding
  const availableWidth = screenWidth - parentPadding;

  // Calculate spacing between items (numColumns - 1 gaps between items)
  const totalHorizontalSpacing = spacing * (numColumns - 1);

  // Item width calculation
  const itemWidth = (availableWidth - totalHorizontalSpacing) / numColumns;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        renderItem={(props) => {
          const isLastInRow = (props.index + 1) % numColumns === 0;
          return (
            <View
              style={[
                styles.itemContainer,
                {
                  width: itemWidth,
                  marginRight: isLastInRow ? 0 : spacing,
                },
              ]}
            >
              {renderItem({
                ...props,
                item: { ...props.item, _itemWidth: itemWidth },
              })}
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false} // so ScrollView outside can scroll
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  row: {
    justifyContent: "flex-start",
    marginBottom: 12,
  },
  itemContainer: {
    // Container for each item
  },
});
