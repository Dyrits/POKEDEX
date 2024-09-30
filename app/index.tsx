import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { HeaderText } from "@/components/$Text";
import { Card } from "@/components/Card";

import { useThemeColors } from "@/hooks/useThemeColors";
import { PokemonCard } from "@/components/Pokemon/PokemonCard";

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 12
  },
  listing: {
    flex: 1
  },
  list: {
    padding: 12
  },
  item: {
    flex: 1 / 3
  },
  grid: {
    gap: 6
  }
});

export default function Index() {
  const colors = useThemeColors();
  const pokemons = Array.from({ length: 151 }, (_, index) => {
    return {
      id: index + 1,
      name: `Pokemon #${index + 1}`
    };
  });

  return (
    <SafeAreaView
      style={[stylesheet.container, { backgroundColor: colors.primary }]}
    >
      <View style={stylesheet.header}>
        <Image
          source={require("@/assets/images/pokeball.png")}
          width={24}
          height={24}
        />
        <HeaderText variant={"headline"} color={"light"}>
          Pokédex
        </HeaderText>
      </View>
      <Card style={stylesheet.listing}>
        <FlatList
          data={pokemons}
          renderItem={({ item }) => (
            <PokemonCard
              id={item.id}
              name={item.name}
              style={stylesheet.item}
            />
          )}
          keyExtractor={item => String(item.id)}
          numColumns={3}
          columnWrapperStyle={stylesheet.grid}
          contentContainerStyle={[stylesheet.list, stylesheet.grid]}
        />
      </Card>
    </SafeAreaView>
  );
}
