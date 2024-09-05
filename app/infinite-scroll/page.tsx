"use client";
import * as React from "react";
import { Stack } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddHotelForm, HotelFormValues } from "@/app/components/AddHotelForm";
import { delay } from "@/app/utils";
import { HotelsGridInfinite } from "@/app/components/HotelsGridInfinite";

export default function Page() {
  const queryClient = useQueryClient();
  const postHotel = useMutation({
    mutationFn: async (values: HotelFormValues) => {
      await delay();
      await fetch(`http://localhost:8080/hotels`, {
        method: "POST",
        body: JSON.stringify(values),
      });
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["hotels"] });
    },
  });

  return (
    <Stack>
      <AddHotelForm
        onSubmit={postHotel.mutate}
        isSubmitting={postHotel.isPending}
      />
      <HotelsGridInfinite />
    </Stack>
  );
}
