import { HotelDTO } from "../types";

export const getHotels = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<{
  data: HotelDTO[];
  next: number;
}> => {
  const res = await fetch(
    `http://localhost:8080/hotels?_page=${pageParam}&_per_page=5`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return await res.json();
};
