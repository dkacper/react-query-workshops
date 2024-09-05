"use client";
import * as React from "react";
import { Button, Paper, Stack, TextInput, Title } from "@mantine/core";

export interface HotelFormValues {
  name: string;
  description: string;
  price: string;
}

interface AddHotelFormProps {
  onSubmit: (values: HotelFormValues) => void;
  isSubmitting?: boolean;
}

export function AddHotelForm(props: AddHotelFormProps) {
  const { onSubmit, isSubmitting } = props;
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState(
    "Lorem ipsum description."
  );
  const [price, setPrice] = React.useState("7999");

  const hanldeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSubmitting && name && description && price) {
      onSubmit({ name, description, price: `$${price}` });
    }
  };

  return (
    <Paper p="lg" withBorder>
      <Title order={2}>Add new hotel</Title>
      <form onSubmit={hanldeSubmit}>
        <Stack>
          <TextInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <TextInput
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <TextInput
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.currentTarget.value)}
          />
          <Button type="submit" loading={isSubmitting}>
            Submit
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
