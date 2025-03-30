import { StyleSheet, View, ViewProps } from "react-native";

import Row from "@/components/Row";
import { BodyText } from "@/components/$Text";
import { useThemeColors } from "@/hooks/useThemeColors";

const stylesheet = StyleSheet.create({
  row: {},
  name: {
    width: 80,
    paddingRight: 10,
    borderRightWidth: 1,
    borderStyle: "solid"
  },
  value: {
    width: 25
  },
  range: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  fill: {
    height: 5,
  },
  empty: {
    height: 5,
    opacity: 0.25,
  }
});

type Props = ViewProps & {
  name: string;
  value: number;
  color: string;
};

export function PokemonStatistic({ name, value, color, style, ...props }: Props) {
  const colors = useThemeColors();

  return (
    <Row gap={10} style={[style, stylesheet.row]}>
      <View style={[stylesheet.name, { borderRightColor: colors.medium }]}>
        <BodyText variant={"medium"} style={{ color }}>
          { name }
        </BodyText>
      </View>
      <View style={stylesheet.value}>
        <BodyText variant={"medium"} style={{ color }}>{ value.toString().padStart(3, "0") }</BodyText>
      </View>
      <Row style={stylesheet.range}>
        <View style={[stylesheet.fill, {flex: value, backgroundColor: color }]}></View>
        <View style={[stylesheet.empty, {flex: 255 - value, backgroundColor: color }]}></View>
      </Row>
    </Row>
  );
}
