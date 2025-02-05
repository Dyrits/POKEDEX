import { Image, ImageSourcePropType, StyleSheet, View, ViewProps } from "react-native";

import Row from "@/components/Row";
import { BodyText, HeaderText } from "@/components/$Text";

const stylesheet = StyleSheet.create({
  card: {
    flex: 1,
    gap: 4,
    alignItems: "center",
    justifyContent: "space-around",
    height: 42
  }
});

type Props = ViewProps & {
  title: string;
  description: string;
  icon?: ImageSourcePropType;
};

export function PokemonCharacteristic({ title, description, icon, style, ...props }: Props) {
  return (
    <View style={[style, stylesheet.card]}>
      <Row>
        {icon && <Image source={icon} width={16} height={16} />}
        <BodyText variant={"medium"} style={{ marginLeft: 8 }}>
          {title}
        </BodyText>
      </Row>
      <BodyText variant={"caption"} color={"medium"}>
        {description}
      </BodyText>
    </View>
  );
}
