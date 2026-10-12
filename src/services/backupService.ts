import axios from "axios";

export type BackupResponse = {
  message: string;
  path: string;
};

export const createBackup = async (): Promise<BackupResponse> => {
  const response = await axios.post<BackupResponse>(
    "http://localhost:3000/backup",
  );

  return response.data;
};

export type RestoreBackupResponse = {
  success: boolean;
  message: string;
  safetyBackupPath: string;
};

export const restoreBackup = async (
  file: File,
): Promise<RestoreBackupResponse> => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post<RestoreBackupResponse>(
    "http://localhost:3000/backup/restore",
    formData,
  );

  return response.data;
};
