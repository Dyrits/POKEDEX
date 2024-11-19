import { Image, View, StyleSheet, ViewProps, Pressable, Platform } from "react-native";
import { Link } from "expo-router";

import { Card } from "@/components/Card";
import { BodyText } from "@/components/$Text";
import { useThemeColors } from "@/hooks/useThemeColors";

const stylesheet = StyleSheet.create({
  card: {
    position: "relative",
    alignItems: "center",
    padding: 4
  },
  caption: {
    alignSelf: "flex-end"
  },
  shadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    borderRadius: 7,
    zIndex: -1
  }
});

type Props = {
  number: number;
  name: string;
} & Omit<ViewProps, "id">;

export function PokemonCard({ number, name, style, ...props }: Props) {
  const colors = useThemeColors();

  return (
    <Link href={{ pathname: "/pokemon/[number]", params: { number } }} asChild>
      <Pressable style={style}>
        <Card style={stylesheet.card} {...props}>
          <BodyText variant={"caption"} color={"medium"} style={stylesheet.caption}>
            #{String(number).padStart(3, "0")}
          </BodyText>
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`
            }}
            width={72}
            height={72}
          />
          <BodyText>{name}</BodyText>
          <View style={[stylesheet.shadow, { backgroundColor: colors.light }]} />
        </Card>
      </Pressable>
    </Link>
  );
}
