import { View, StyleSheet, Image, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import RootView from "@/components/RootView";
import Row from "@/components/Row";
import { BodyText, HeaderText } from "@/components/$Text";
import { useFetch } from "@/hooks/useFetch";
import { Colors } from "@/constants/Colors";
import { capitalize, getArtwork } from "@/utilities/pokemon";
import { Card } from "@/components/Card";
import Pokemon from "@/components/Pokemon";

const stylesheet = StyleSheet.create({
  header: {
    margin: 18,
    justifyContent: "space-between"
  },
  background: {
    opacity: 0.1,
    position: "absolute",
    top: 15,
    right: 15
  },
  artwork: {
    alignSelf: "center",
    marginTop: 24,
    zIndex: 1
  },
  details: {
    flex: 1,
    gap: 8,
    marginTop: -72,
    paddingTop: 72,
    alignItems: "center",
    paddingHorizontal: 12
  }
});

export default function Details() {
  const { number } = useLocalSearchParams() as { number: string };
  const { data: pokemon } = useFetch("/pokemon/[number]", { number });
  const { data: species } = useFetch("/pokemon-species/[number]", { number });
  const types = (pokemon && pokemon.types.map(type => type.type.name)) || [];
  const type = types.length && types[0];
  const color = (type && Colors.type[type]) || "#FFF";
  const flavor = species && species.flavor_text_entries.find(entry => entry.language.name === "en");
  const biography = flavor && flavor.flavor_text.replaceAll("\n", " ").replaceAll("POKéMON", "pokémon");

  return (
    pokemon && (
      <RootView style={{ backgroundColor: color }}>
        <View style={{ flex: 1 }}>
          <Image
            style={stylesheet.background}
            source={require("@/assets/images/poke-background.png")}
            width={24}
            height={24}
          />
          <Row style={stylesheet.header}>
            <Pressable onPress={router.back}>
              <Row gap={8}>
                <Image source={require("@/assets/images/back.png")} width={32} height={32} />
                <HeaderText variant={"headline"} color={"light"}>
                  {capitalize(pokemon.name)}
                </HeaderText>
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
          <Card style={stylesheet.details}>
            <Row gap={16}>
              {types.map(type => (
                <Pokemon.Type key={type} type={type} />
              ))}
            </Row>
            <HeaderText variant={"large"} style={{ color }}>
              About
            </HeaderText>
            <Row gap={16}>
              <Pokemon.Characteristic
                title={`${pokemon.height}m`}
                description={"Height"}
                icon={require("@/assets/images/height.png")}
              />
              <Pokemon.Characteristic
                title={`${pokemon.weight / 10}kg`}
                description={"Weight"}
                icon={require("@/assets/images/weight.png")}
              />
              <Pokemon.Characteristic
                title={pokemon.moves
                  .slice(0, 2)
                  .map(({ move }) => `⦿ ${move.name}`)
                  .join("\n")}
                description={"Moves"}
              />
            </Row>
            {biography && <BodyText>{biography}</BodyText>}
            <HeaderText variant={"large"} style={{ color }}>
              Statistics
            </HeaderText>
          </Card>
        </View>
      </RootView>
    )
  );
}
