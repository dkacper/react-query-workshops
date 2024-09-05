"use client";
import * as React from "react";
import { Stack } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { AddHotelForm } from "@/app/components/AddHotelForm";
import { HotelsGrid } from "@/app/components/HotelsGrid";

export default function Page() {
  // @TODO: post a new hotel using useMutation
  // POST http://localhost:8080/hotels
  // Add optimistic update. Read more: https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates

  useMutation({});

  return (
    <Stack>
      <AddHotelForm onSubmit={(values) => console.log({ values })} />
      <HotelsGrid />
    </Stack>
  );
}
