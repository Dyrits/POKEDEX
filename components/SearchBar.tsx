import { Image, TextInput, View, StyleSheet } from "react-native";

import Row from "@/components/Row";
import { useThemeColors } from "@/hooks/useThemeColors";

const stylesheet = StyleSheet.create({
  row: {
    flex: 1,
    borderRadius: 16,
    height: 32,
    paddingHorizontal: 12
  },
  input: {
    flex: 1,
    height: 16,
    fontSize: 10,
    lineHeight: 16
  }
});

type Props = {
  search: string;
  onSearch: (value: string) => void;
};

export function SearchBar({ search, onSearch }: Props) {
  const colors = useThemeColors();

  return (
    <Row style={[stylesheet.row, { backgroundColor: colors.background }]} gap={8}>
      <Image source={require("@/assets/images/search.png")} width={16} height={16} />
      <TextInput style={stylesheet.input} onChangeText={onSearch} value={search} />
    </Row>
  );
}
