// Remember to remove "use client" directive to make it Server Component
"use client";
import * as React from "react";
import { Stack } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddHotelForm, HotelFormValues } from "@/app/components/AddHotelForm";
import { delay } from "@/app/utils";
import { HotelsGridInfinite } from "../components/HotelsGridInfinite";

export default function Page() {
  // @TODO: Server-side data fetching strategy.
  // 1. Move mutation logic to the separate component
  // 2. Make this Page a Server Component and prefetch `hotels-pages` infinite query
  // 3. Make sure to wrap your app with SsrProviders
  // read more: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
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
