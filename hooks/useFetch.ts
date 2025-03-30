import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Colors } from "@/constants/Colors";

const url = "https://pokeapi.co/api/v2";

type APIResponse = {
  "/pokemon?limit=100000&offset=0": {
    count: number;
    next: string;
    previous: string;
    results: {
      name: string;
      url: string;
    }[];
  };
  "/pokemon/[number]": {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: [
      {
        type: {
          name: keyof typeof Colors.type;
        };
      }
    ];
    moves: {
      move: {
        name: string;
      };
    }[];
    stats: {
      base_stat: number;
      stat: {
        name: string;
      };
    }[]
  };
  "/pokemon-species/[number]": {
    flavor_text_entries: {
      flavor_text: string;
      language: string;
    }[];
  };
};

export function useFetch<T extends keyof APIResponse>(endpoint: T, params: { [key: string]: string } = {}) {
  const $endpoint = Object.entries(params).reduce((accumulator: string, [key, value]) => {
    return accumulator.replaceAll(`[${key}]`, value);
  }, endpoint as string);
  return useQuery({
    queryKey: [$endpoint],
    queryFn: async () => {
      const response = await fetch(url + $endpoint);
      return (await response.json()) as Promise<APIResponse[T]>;
    }
  });
}

/*
export function useInfiniteFetch<T extends keyof APIResponse>(endpoint: T) {
  return useInfiniteQuery({
    queryKey: [endpoint],
    initialPageParam: url + endpoint,
    queryFn: async ({ pageParam }) => {
      const response = await fetch(pageParam);
      return (await response.json()) as Promise<APIResponse[T]>;
    },
    getNextPageParam: lastPage => {
      return lastPage.next;
    }
  });
}
*/
