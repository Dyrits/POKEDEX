import { Image, FlatList, StyleSheet } from "react-native";
import { useMemo, useState } from "react";

import { useFetch } from "@/hooks/useFetch";
import { capitalize, extractNumber } from "@/utilities/pokemon";
import { HeaderText } from "@/components/$Text";
import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/Pokemon/PokemonCard";
import { SearchBar } from "@/components/SearchBar";
import Row from "@/components/Row";
import { SortButton } from "@/components/SortButton";
import RootView from "@/components/RootView";

const stylesheet = StyleSheet.create({
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
  const [search, setSearch] = useState<string>(String());
  const [sort, setSort] = useState<"number" | "name">("number");
  // const { data, isFetching, refetch, fetchNextPage } =useInfiniteFetch("/pokemon?limit=30");
  const { data, isFetching, refetch } = useFetch("/pokemon?limit=100000&offset=0");

  const pokemons = useMemo(() => {
    let list = data ? data.results.map(pokemon => ({ name: pokemon.name, number: extractNumber(pokemon.url) })) : [];
    return (
      search
        ? list.filter(pokemon => pokemon.name.includes(search.toLowerCase()) || String(pokemon.number).includes(search))
        : list
    ).sort((pokemon$1, pokemon$2) => (pokemon$1[sort] < pokemon$2[sort] ? -1 : 1));
  }, [data, search, sort]);

  return (
    <RootView>
      <Row style={stylesheet.header} gap={16}>
        <Image source={require("@/assets/images/pokeball.png")} width={24} height={24} />
        <HeaderText variant={"headline"} color={"light"}>
          Pokédex
        </HeaderText>
      </Row>
      <Row gap={16}>
        <SearchBar search={search} onSearch={setSearch} />
        <SortButton value={sort} onValue={setSort} />
      </Row>
      <Card style={stylesheet.listing}>
        <FlatList
          data={pokemons}
          renderItem={({ item }) => (
            <PokemonCard number={item.number} name={capitalize(item.name)} style={stylesheet.item} />
          )}
          keyExtractor={item => String(item.number)}
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
    </RootView>
  );
}
