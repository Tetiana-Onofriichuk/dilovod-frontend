import axios from "axios";

import type { Task } from "../types/task";

const API_URL = "http://localhost:3000/tasks";

export type CreateTaskData = {
  title: string;
  description?: string;
  date: string;
};

export type UpdateTaskData = {
  title?: string;
  description?: string;
  date?: string;
  completed?: boolean;
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(API_URL);

  return response.data;
};

export const createTask = async (data: CreateTaskData): Promise<Task> => {
  const response = await axios.post<Task>(API_URL, data);

  return response.data;
};

export const updateTask = async (
  id: number,
  data: UpdateTaskData,
): Promise<Task> => {
  const response = await axios.patch<Task>(`${API_URL}/${id}`, data);

  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
