import type { Requisites } from "../types/requisites";

const API_URL = "http://localhost:3000/requisites";

export type UpdateRequisitesData = Omit<Requisites, "id">;

export const getRequisites = async (): Promise<Requisites> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Не вдалося отримати реквізити");
  }

  return response.json();
};

export const updateRequisites = async (
  data: UpdateRequisitesData,
): Promise<Requisites> => {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Не вдалося зберегти реквізити");
  }

  return response.json();
};
