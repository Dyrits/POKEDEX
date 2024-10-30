import { Text, Image, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import { useThemeColors } from "@/hooks/useThemeColors";
import { useFetch } from "@/hooks/useFetch";
import { capitalize, URLtoIdentifier } from "@/utilities/pokemon";
import { HeaderText } from "@/components/$Text";
import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/Pokemon/PokemonCard";
import { SearchBar } from "@/components/SearchBar";
import Row from "@/components/Row";

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    gap: 16
  },
  header: {
    paddingHorizontal: 12
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
  const [search, setSearch] = useState<string>(String());
  // const { data, isFetching, refetch, fetchNextPage } =useInfiniteFetch("/pokemon?limit=30");
  const { data, isFetching, refetch } = useFetch("/pokemon?limit=100000&offset=0");

  // let pokemons = data ? data.pages.flatMap(page => page.results) : [];
  let pokemons = data ? data.results : [];
  pokemons = search
    ? pokemons.filter(
        pokemon =>
          pokemon.name.includes(search.toLowerCase()) || URLtoIdentifier(pokemon.url).toString().includes(search)
      )
    : pokemons;

  return (
    <SafeAreaView style={[stylesheet.container, { backgroundColor: colors.primary }]}>
      <Row style={stylesheet.header} gap={16}>
        <Image source={require("@/assets/images/pokeball.png")} width={24} height={24} />
        <HeaderText variant={"headline"} color={"light"}>
          Pokédex
        </HeaderText>
      </Row>
      <Row>
        <SearchBar search={search} onSearch={setSearch} />
      </Row>
      <Card style={stylesheet.listing}>
        <FlatList
          data={pokemons}
          renderItem={({ item }) => (
            <PokemonCard id={URLtoIdentifier(item.url)} name={capitalize(item.name)} style={stylesheet.item} />
          )}
          keyExtractor={item => String(item.url)}
          numColumns={3}
          columnWrapperStyle={stylesheet.grid}
          contentContainerStyle={[stylesheet.list, stylesheet.grid]}
          onRefresh={async () => {
            await refetch();
          }}
          refreshing={isFetching}
          /*
          onEndReached={async () => {
           await fetchNextPage();
           }}
           */
        />
      </Card>
    </SafeAreaView>
  );
}
