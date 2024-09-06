"use client";
import * as React from "react";
import { Button, Center, Loader, SimpleGrid, Stack, Text } from "@mantine/core";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import { HotelDTO } from "../types";
import { Hotel } from "./Hotel";
import {useIntersection} from "@mantine/hooks";
import {useEffect} from "react";

export function HotelsGridInfinite() {
  // @TODO: implement infinite scroll using useInfiniteQuery
  // GET http://localhost:8080/hotels
  // Pagination params: ?_page=1&_per_page=5
  // Fetch function return type: Promise<{
  //   data: HotelDTO[];
  //   next: number;
  // }>
  // read more: https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries
    const { entry, ref } = useIntersection();
  const { data, isPending, isError, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["hotels-pages"],
    queryFn: async ({
        pageParam,
    }): Promise<{
        data: HotelDTO[];
        next: number;
    }> => {
      const res = await fetch(`http://localhost:8080/hotels?_page=${pageParam}&_per_page=5`);
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return await res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next,
  });

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry?.isIntersecting, hasNextPage, fetchNextPage]);

  if (isError) {
    return <Text>Something went wrong</Text>;
  }

  if (isPending) {
    return (
      <Stack align="center">
        <Loader />
        <Text>Loading...</Text>
      </Stack>
    );
  }

  return (
    <>
      <SimpleGrid cols={3}>
        {data?.pages.flatMap(({data}) => data).map(({ id, name, description, price }) => (
          <Hotel key={id} name={name} description={description} price={price} />
        ))}
      </SimpleGrid>

        <div ref={ref} />
      {/*<Button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        Load more
      </Button>*/}
    </>
  );
}
