import { View, StyleSheet, Image, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import RootView from "@/components/RootView";
import Row from "@/components/Row";
import { HeaderText } from "@/components/$Text";
import { useFetch } from "@/hooks/useFetch";
import { Colors } from "@/constants/Colors";
import { capitalize, getArtwork } from "@/utilities/pokemon";

const stylesheet = StyleSheet.create({
  header: {
    margin: 18,
    justifyContent: "space-between"
  },
  background: {
    opacity: 0.1,
    position: "absolute",
    top: 8,
    right: 8,
  },
  artwork: {
    alignSelf: "center",
    marginTop: 24
  }
});

export default function Pokemon() {
  const { number } = useLocalSearchParams() as { number: string };
  const { data: pokemon } = useFetch("/pokemon/[number]", { number });
  const type = pokemon && pokemon.types[0].type.name;
  const color = (type && Colors.type[type]) || "#FFF";

  return pokemon && (
    <RootView style={{ backgroundColor: color }}>
      <View>
        <Image style={stylesheet.background} source={require("@/assets/images/poke-background.png")} width={24} height={24} />
        <Row style={stylesheet.header}>
          <Pressable onPress={router.back}>
            <Row gap={8}>
              <Image source={require("@/assets/images/back.png")} width={32} height={32} />
              <HeaderText variant={"headline"} color={"light"}>{capitalize(pokemon.name)}</HeaderText>
            </Row>
          </Pressable>
          <HeaderText color={"light"}>#{number.padStart(3, "0")}</HeaderText>
        </Row>
        <Image
          style={stylesheet.artwork}
          source={{
            uri: getArtwork(number)
          }}
          width={200}
          height={200}
        />
      </View>
    </RootView>
  );
}
