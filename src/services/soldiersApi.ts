import axios from "axios";
import type { Soldier } from "../types/soldier";

type SoldiersResponse = {
  soldiers: Soldier[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export const getSoldiers = async (): Promise<SoldiersResponse> => {
  const response = await axios.get<SoldiersResponse>(
    "http://localhost:3000/soldiers",
  );

  return response.data;
};
