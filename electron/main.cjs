const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

let backendProcess = null;

const startBackend = () => {
  const backendPath = path.join(__dirname, "backend", "dist", "main.js");

  backendProcess = spawn(process.execPath, [backendPath], {
    env: {
      ...process.env,
      ELECTRON_RUN_AS_NODE: "1",
      OPORA_DATA_PATH: path.resolve(__dirname, "../../dilovod"),
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

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
  });

  if (app.isPackaged) {
    mainWindow.loadFile("dist/index.html");
  } else {
    mainWindow.loadURL("http://localhost:5173");
  }
};

app.whenReady().then(() => {
  startBackend();
  createWindow();

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
