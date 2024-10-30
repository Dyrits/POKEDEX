import { View, ViewProps, ViewStyle, StyleSheet } from "react-native";

const stylesheet = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center"
  } satisfies ViewStyle
});

type Props = ViewProps & {
  gap?: number;
};

export default function Row({ style, gap = 0, ...props }: Props) {
  return <View style={[stylesheet.row, style, { gap }]} {...props} />;
}
