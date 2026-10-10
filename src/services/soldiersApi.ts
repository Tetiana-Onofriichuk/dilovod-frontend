import axios from "axios";
import type { Soldier } from "../types/soldier";

type SoldiersResponse = {
  soldiers: Soldier[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type CreateSoldierData = {
  lastName: string;
  lastNameGenitive: string;
  firstName: string;
  patronymic: string;
  rank: string;
  position: string;
  platoon: string;
  squad: string;
  phone: string;
  address: string;
};

export const getSoldiers = async (
  search = "",
  page = 1,
  limit = 20,
): Promise<SoldiersResponse> => {
  const response = await axios.get<SoldiersResponse>(
    "http://localhost:3000/soldiers",
    {
      params: {
        search,
        page,
        limit,
      },
    },
  );

  return response.data;
};

export const getSoldierById = async (id: number): Promise<Soldier> => {
  const response = await axios.get<Soldier>(
    `http://localhost:3000/soldiers/${id}`,
  );

  return response.data;
};
export const createSoldier = async (
  soldierData: CreateSoldierData,
): Promise<Soldier> => {
  const response = await axios.post<Soldier>(
    "http://localhost:3000/soldiers",
    soldierData,
  );

  return response.data;
};

export const updateSoldier = async (
  id: number,
  soldierData: CreateSoldierData,
): Promise<Soldier> => {
  const response = await axios.patch<Soldier>(
    `http://localhost:3000/soldiers/${id}`,
    soldierData,
  );

  return response.data;
};

export const deleteSoldier = async (id: number): Promise<void> => {
  await axios.delete(`http://localhost:3000/soldiers/${id}`);
};
