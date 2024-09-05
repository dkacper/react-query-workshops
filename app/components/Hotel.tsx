"use client";
import * as React from "react";
import { Card, Stack, Text, Title } from "@mantine/core";

interface HotelProps {
  name: string;
  description: string;
  price: string;
}

export function Hotel(props: HotelProps) {
  const { name, description, price } = props;

  return (
    <Card withBorder>
      <Stack>
        <Title order={3}>{name}</Title>
        <Text>{description}</Text>
        <Text>{price}</Text>
      </Stack>
    </Card>
  );
}
