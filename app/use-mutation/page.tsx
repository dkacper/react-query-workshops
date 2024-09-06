"use client";
import * as React from "react";
import { Stack } from "@mantine/core";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AddHotelForm, HotelFormValues} from "@/app/components/AddHotelForm";
import { HotelsGrid } from "@/app/components/HotelsGrid";
import {delay} from "@/app/utils";

export default function Page() {
  // @TODO: post a new hotel using useMutation
  // POST http://localhost:8080/hotels
  // Add optimistic update. Read more: https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates
    const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
      mutationKey: ["addHotel"],
      mutationFn: async (values: HotelFormValues) => {
          await delay();
          await fetch('http://localhost:8080/hotels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
      },
      onSettled: async () => {
          return await queryClient.invalidateQueries({
              queryKey: ['hotels'],
          });
      }
  });

  return (
    <Stack>
      <AddHotelForm onSubmit={(values) => mutate(values)} isSubmitting={isPending} />
      <HotelsGrid />
    </Stack>
  );
}
