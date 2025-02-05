import { StyleSheet, View, ViewStyle } from "react-native";

import { Colors } from "@/constants/Colors";
import { HeaderText } from "@/components/$Text";

const stylesheet = StyleSheet.create({
  tag: {
    flex: 0,
    padding: 8,
    borderRadius: 8
  } satisfies ViewStyle
});

type Props = {
  type: keyof (typeof Colors)["type"];
};

export function PokemonType({ type }: Props) {
  return (
    <View style={[stylesheet.tag, { backgroundColor: Colors.type[type] }]}>
      <HeaderText variant="small" color="white" style={{ textTransform: "capitalize" }}>
        {type}
      </HeaderText>
    </View>
  );
}
