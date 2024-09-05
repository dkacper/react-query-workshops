"use client";
import * as React from "react";
import { Center, Loader, SimpleGrid, Stack, Text } from "@mantine/core";
import { Hotel } from "@/app/components/Hotel";
import { HotelDTO } from "@/app/types";

export default function Page() {
  // @TODO: Refactor this code to useQuery
  // GET http://localhost:8080/hotels
  const [isPending, setIsPending] = React.useState(true);
  const [data, setData] = React.useState<HotelDTO[]>();
  const [isError, setIsError] = React.useState();

  React.useEffect(() => {
    // Use `ignore` flag to avoid race conditions
    let ignore = false;
    setIsPending(true);
    fetch(`http://localhost:8080/hotels`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((d) => {
        if (!ignore) {
          setData(d);
          setIsError(undefined);
        }
      })
      .catch((e) => {
        if (!ignore) {
          setIsError(e);
          setData(undefined);
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsPending(false);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

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
