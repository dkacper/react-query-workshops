"use client";
import * as React from "react";
import { Button, Center, Loader, SimpleGrid, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { HotelDTO } from "../types";
import { Hotel } from "./Hotel";

export function HotelsGridInfinite() {
  // @TODO: implement infinite scroll using useInfiniteQuery
  // GET http://localhost:8080/hotels
  // Pagination params: ?_page=1&_per_page=5
  // Fetch function return type: Promise<{
  //   data: HotelDTO[];
  //   next: number;
  // }>
  // read more: https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries
  const { data, isPending, isError } = useQuery<HotelDTO[]>({
    queryKey: ["hotels-pages"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/hotels`);
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return await res.json();
    },
  });

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
        {data?.map(({ id, name, description, price }) => (
          <Hotel key={id} name={name} description={description} price={price} />
        ))}
      </SimpleGrid>

      <Button onClick={console.log} disabled={false}>
        Load more
      </Button>
    </>
  );
}
