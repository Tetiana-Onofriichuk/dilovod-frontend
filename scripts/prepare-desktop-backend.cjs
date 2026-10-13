const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const frontendRoot = path.resolve(__dirname, "..");
const backendRoot = path.resolve(frontendRoot, "..", "dilovod");

const backendDist = path.join(backendRoot, "dist");
const electronBackend = path.join(frontendRoot, "electron", "backend");
const electronBackendDist = path.join(electronBackend, "dist");

const backendPackageLock = path.join(backendRoot, "package-lock.json");
const dependenciesHashFile = path.join(electronBackend, ".dependencies-hash");

const getFileHash = (filePath) => {
  const file = fs.readFileSync(filePath);

  return crypto.createHash("sha256").update(file).digest("hex");
};

console.log("Preparing backend for OPORA Desktop...");

// 1. Build the current backend
console.log("Building NestJS backend...");

execSync("npm run build", {
  cwd: backendRoot,
  stdio: "inherit",
});

// 2. Make sure dist exists
if (!fs.existsSync(backendDist)) {
  throw new Error("Backend dist was not created");
}

// 3. Remove the old Electron backend dist
console.log("Removing old backend dist...");

fs.rmSync(electronBackendDist, {
  recursive: true,
  force: true,
});

// 4. Copy the fresh dist
console.log("Copying fresh backend dist...");

fs.cpSync(backendDist, electronBackendDist, {
  recursive: true,
});

// 5. Copy current backend package files
console.log("Copying backend package files...");

fs.copyFileSync(
  path.join(backendRoot, "package.json"),
  path.join(electronBackend, "package.json"),
);

fs.copyFileSync(
  path.join(backendRoot, "package-lock.json"),
  path.join(electronBackend, "package-lock.json"),
);

// 6. Check whether backend dependencies have changed
const currentDependenciesHash = getFileHash(backendPackageLock);

const savedDependenciesHash = fs.existsSync(dependenciesHashFile)
  ? fs.readFileSync(dependenciesHashFile, "utf8").trim()
  : null;

const dependenciesChanged = currentDependenciesHash !== savedDependenciesHash;

if (dependenciesChanged) {
  console.log("Backend dependencies have changed.");
  console.log("Installing production backend dependencies...");

  execSync("npm ci --omit=dev", {
    cwd: electronBackend,
    stdio: "inherit",
  });

  console.log("Rebuilding better-sqlite3 for Electron...");

  execSync(
    "npx electron-rebuild -v 44.7.0 -f -w better-sqlite3 -m electron/backend",
    {
      cwd: frontendRoot,
      stdio: "inherit",
    },
  );

  fs.writeFileSync(dependenciesHashFile, currentDependenciesHash, "utf8");

  console.log("Backend dependencies are ready.");
} else {
  console.log("Backend dependencies are up to date.");
}
