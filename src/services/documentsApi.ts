import axios from "axios";
import type { Document } from "../types/document";

const API_URL = "http://localhost:3000/documents";
export type VacationReportData = {
  soldierId: number;
  days: string;
  travelDays: string;
  startDate: string;
  address: string;
  transport: string;
  reportDate: string;
};
export type FamilyLeaveReportData = {
  soldierId: number;
  leaveReason: string;
  days: string;
  address: string;
  startDate: string;
  attachment: string;
  reportDate: string;
};

export type BankDetailsReportData = {
  soldierId: number;
  bankAccount: string;
  bankName: string;
  reportDate: string;
};

export type TrainingWithWeaponReportData = {
  soldierIds: number[];
  startDate: string;
  endDate: string;
  destination: string;
  soldierFullNameGenitive: string;
  additionalSoldiersGenitive: {
    soldierId: number;
    fullNameGenitive: string;
  }[];
  trainingPurpose: string;
  basis: string;
  reportDate: string;
  includeDryRation: boolean;
};

export type TrainingWithoutWeaponReportData = {
  soldierIds: number[];
  startDate: string;
  endDate: string;
  destination: string;
  soldierFullNameGenitive: string;
  additionalSoldiersGenitive: {
    soldierId: number;
    fullNameGenitive: string;
  }[];
  trainingPurpose: string;
  basis: string;
  reportDate: string;
  includeDryRation: boolean;
};

export type PositionAcceptanceReportData = {
  soldierId: number;
  reportDate: string;
};

export const generateVacationReport = async (
  data: VacationReportData,
): Promise<Blob> => {
  const response = await axios.post(`${API_URL}/vacation-report`, data, {
    responseType: "blob",
  });

  return response.data;
};

export const generateFamilyLeaveReport = async (
  data: FamilyLeaveReportData,
): Promise<Blob> => {
  const response = await axios.post(`${API_URL}/family-leave-report`, data, {
    responseType: "blob",
  });

  return response.data;
};

export const generateBankDetailsReport = async (
  data: BankDetailsReportData,
): Promise<Blob> => {
  const response = await axios.post(`${API_URL}/bank-details-report`, data, {
    responseType: "blob",
  });

  return response.data;
};

export const generateTrainingWithWeaponReport = async (
  data: TrainingWithWeaponReportData,
): Promise<Blob> => {
  const response = await axios.post(
    `${API_URL}/training-with-weapon-report`,
    data,
    {
      responseType: "blob",
    },
  );

  return response.data;
};

export const generateTrainingWithoutWeaponReport = async (
  data: TrainingWithoutWeaponReportData,
): Promise<Blob> => {
  const response = await axios.post(
    `${API_URL}/training-without-weapon-report`,
    data,
    {
      responseType: "blob",
    },
  );

  return response.data;
};

export const generatePositionAcceptanceReport = async (
  data: PositionAcceptanceReportData,
): Promise<Blob> => {
  const response = await axios.post(
    `${API_URL}/position-acceptance-report`,
    data,
    {
      responseType: "blob",
    },
  );

  return response.data;
};

export const getDocuments = async (): Promise<Document[]> => {
  const response = await axios.get<Document[]>(API_URL);

  return response.data;
};

export const getSoldierDocuments = async (
  soldierId: number,
): Promise<Document[]> => {
  const response = await axios.get<Document[]>(
    `${API_URL}/soldier/${soldierId}`,
  );

  return response.data;
};

export const downloadDocument = async (
  id: number,
  fileName: string,
): Promise<void> => {
  const response = await axios.get(`${API_URL}/${id}/download`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(response.data);
  const link = window.document.createElement("a");

  link.href = url;
  link.download = fileName;

  window.document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};

export const deleteDocument = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
