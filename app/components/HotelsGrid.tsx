"use client";
import * as React from "react";
import { Center, Loader, SimpleGrid, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { HotelDTO } from "../types";
import { Hotel } from "./Hotel";

export function HotelsGrid() {
  const { data, isPending, isError } = useQuery<HotelDTO[]>({
    queryKey: ["hotels"],
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
    <SimpleGrid cols={3}>
      {data?.map(({ id, name, description, price }) => (
        <Hotel key={id} name={name} description={description} price={price} />
      ))}
    </SimpleGrid>
  );
}
