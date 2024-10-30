import { View, StyleSheet, ViewProps } from "react-native";

import { Shadows } from "@/constants/Shadows";
import { useThemeColors } from "@/hooks/useThemeColors";

const stylesheet = StyleSheet.create({
  card: {
    borderRadius: 8,
    ...Shadows.soft
  }
});

type Props = ViewProps;

export function Card({ style, ...props }: Props) {
  const colors = useThemeColors();
  return (
    <View {...props} style={[style, stylesheet.card, { backgroundColor: colors.background }]}>
      {props.children}
    </View>
  );
}
