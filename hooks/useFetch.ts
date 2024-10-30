import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const url = "https://pokeapi.co/api/v2";

type APIResponse = {
  [key: string]: {
    count: number;
    next: string;
    previous: string;
    results: {
      name: string;
      url: string;
    }[];
  };
};

export function useFetch<T extends keyof APIResponse>(endpoint: T) {
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const response = await fetch(url + endpoint);
      return (await response.json()) as Promise<APIResponse[T]>;
    }
  });
}

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
