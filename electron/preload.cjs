const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  chooseBackupSavePath: (defaultFileName) =>
    ipcRenderer.invoke("backup:save-dialog", defaultFileName),

  copyBackupFile: (sourcePath, destinationPath) =>
    ipcRenderer.invoke("backup:copy-file", sourcePath, destinationPath),
});
