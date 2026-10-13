export {};

declare global {
  interface Window {
    electronAPI?: {
      chooseBackupSavePath: (defaultFileName: string) => Promise<string | null>;

      copyBackupFile: (
        sourcePath: string,
        destinationPath: string,
      ) => Promise<boolean>;
    };
  }
}
