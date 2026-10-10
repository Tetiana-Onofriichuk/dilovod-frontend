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
  soldierId: number;
  startDate: string;
  endDate: string;
  destination: string;
  soldierFullNameGenitive: string;
  trainingPurpose: string;
  basis: string;
  reportDate: string;
  includeDryRation: boolean;
};

export type TrainingWithoutWeaponReportData = {
  soldierId: number;
  startDate: string;
  endDate: string;
  destination: string;
  soldierFullNameGenitive: string;
  trainingPurpose: string;
  basis: string;
  reportDate: string;
  includeDryRation: boolean;
};

export const generateVacationReport = async (
  data: VacationReportData,
): Promise<Blob> => {
  const response = await fetch(`${API_URL}/vacation-report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Не вдалося створити рапорт");
  }

  return response.blob();
};

export const generateFamilyLeaveReport = async (
  data: FamilyLeaveReportData,
): Promise<Blob> => {
  const response = await fetch(`${API_URL}/family-leave-report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Не вдалося створити рапорт");
  }

  return response.blob();
};

export const generateBankDetailsReport = async (
  data: BankDetailsReportData,
): Promise<Blob> => {
  const response = await fetch(`${API_URL}/bank-details-report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Не вдалося створити рапорт");
  }

  return response.blob();
};

export const generateTrainingWithWeaponReport = async (
  data: TrainingWithWeaponReportData,
): Promise<Blob> => {
  const response = await fetch(`${API_URL}/training-with-weapon-report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Не вдалося створити рапорт на навчання зі зброєю");
  }

  return response.blob();
};

export const generateTrainingWithoutWeaponReport = async (
  data: TrainingWithoutWeaponReportData,
): Promise<Blob> => {
  const response = await fetch(`${API_URL}/training-without-weapon-report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Не вдалося створити рапорт на навчання без зброї");
  }

  return response.blob();
};
