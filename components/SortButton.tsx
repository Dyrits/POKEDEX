import { Pressable, Image, StyleSheet, View } from "react-native";

import { useThemeColors } from "@/hooks/useThemeColors";

const stylesheet = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    flex: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});

type Props = {
  value: "number" | "name";
  onValue: (value: "number" | "name") => void
};

export function SortButton({ value, onValue }: Props) {
  const colors = useThemeColors();
  const asset = {
    number: require("@/assets/images/sort-name.png"),
    name: require("@/assets/images/sort-number.png")
  }[value];

  function handlePress() {
    onValue({ number: "name", name: "number" }[value] as "number" | "name");
  }

  return (
    <Pressable onPress={handlePress}>
      <View style={[stylesheet.button, { backgroundColor: colors.background }]}>
        <Image source={asset} style={{ width: 16, height: 16 }} />
      </View>
    </Pressable>
  );
}
