const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

let backendProcess = null;

const startBackend = () => {
  const backendPath = app.isPackaged
    ? path.join(process.resourcesPath, "backend", "dist", "main.js")
    : path.join(__dirname, "backend", "dist", "main.js");

  backendProcess = spawn(process.execPath, [backendPath], {
    env: {
      ...process.env,
      ELECTRON_RUN_AS_NODE: "1",

      NODE_ENV: app.isPackaged ? "production" : "development",

      OPORA_DATA_PATH: app.isPackaged
        ? path.join(app.getPath("appData"), "OPORA")
        : path.resolve(__dirname, "../../dilovod"),

      OPORA_TEMPLATES_PATH: app.isPackaged
        ? path.join(process.resourcesPath, "templates")
        : path.resolve(__dirname, "../../dilovod/templates"),
    },
    stdio: "inherit",
  });
};

const stopBackend = () => {
  if (backendProcess) {
    backendProcess.kill();
    backendProcess = null;
  }
};

const waitForBackend = async () => {
  const maxAttempts = 50;
  const delay = 200;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      const response = await fetch("http://localhost:3000");

      if (response.ok) {
        return;
      }
    } catch {
      // Backend ще запускається
    }

    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  throw new Error("Backend OPORA не запустився вчасно");
};
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,

    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, "..", "dist", "index.html"));
  } else {
    mainWindow.loadURL("http://localhost:5173");
  }
};

ipcMain.handle("backup:save-dialog", async (_event, defaultFileName) => {
  const result = await dialog.showSaveDialog({
    title: "Зберегти резервну копію OPORA",

    defaultPath: path.join(
      app.getPath("documents"),
      defaultFileName || "OPORA_backup.zip",
    ),

    filters: [
      {
        name: "Резервна копія OPORA",
        extensions: ["zip"],
      },
    ],

    properties: ["createDirectory", "showOverwriteConfirmation"],
  });

  if (result.canceled) {
    return null;
  }

  return result.filePath;
});

ipcMain.handle(
  "backup:copy-file",
  async (_event, sourcePath, destinationPath) => {
    await fs.promises.copyFile(sourcePath, destinationPath);

    return true;
  },
);

app.whenReady().then(async () => {
  startBackend();

  try {
    await waitForBackend();
    createWindow();
  } catch (error) {
    console.error("Не вдалося запустити backend OPORA:", error);

    dialog.showErrorBox(
      "Помилка запуску OPORA",
      "Не вдалося запустити внутрішній сервер OPORA. Спробуйте перезапустити програму.",
    );

    app.quit();
    return;
  }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("before-quit", () => {
  stopBackend();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
