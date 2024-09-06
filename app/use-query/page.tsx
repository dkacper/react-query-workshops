"use client";
import * as React from "react";
import { Center, Loader, SimpleGrid, Stack, Text } from "@mantine/core";
import { Hotel } from "@/app/components/Hotel";
import { HotelDTO } from "@/app/types";
import {useQuery} from "@tanstack/react-query";

const fetchHotels = async () => {
  const res = await fetch("http://localhost:8080/hotels");
  return await res.json();
};

export default function Page() {
  const { data, isError, isPending } = useQuery({queryKey: ["hotels"], queryFn: fetchHotels});


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
