import { useRef, useState } from "react";
import { createBackup, restoreBackup } from "../services/backupService";
import RestoreBackupModal from "../components/settings/RestoreBackupModal";

const SettingsPage = () => {
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedBackupFile, setSelectedBackupFile] = useState<File | null>(
    null,
  );
  const [isRestoring, setIsRestoring] = useState(false);

  const handleCreateBackup = async () => {
    try {
      setIsCreatingBackup(true);
      setMessage("");

      await createBackup();

      setMessage("Резервну копію успішно створено");
    } catch {
      setMessage("Не вдалося створити резервну копію");
    } finally {
      setIsCreatingBackup(false);
    }
  };

  const handleRestoreBackup = async () => {
    if (!selectedBackupFile) {
      return;
    }

    try {
      setIsRestoring(true);
      setMessage("");

      await restoreBackup(selectedBackupFile);

      setSelectedBackupFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setMessage("Дані OPORA успішно відновлено");
    } catch {
      setMessage("Не вдалося відновити резервну копію");
    } finally {
      setIsRestoring(false);
    }
  };
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-zinc-900">Налаштування</h1>

        <p className="mt-2 text-zinc-500">
          Керування даними та резервними копіями системи
        </p>
      </div>

      <section className="max-w-3xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">
          Резервне копіювання
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Створюйте резервні копії бази даних і документів OPORA та відновлюйте
          дані у разі необхідності.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={handleCreateBackup}
            disabled={isCreatingBackup}
            className="cursor-pointer rounded-lg bg-zinc-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCreatingBackup ? "Створення..." : "Створити резервну копію"}
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            Відновити з резервної копії
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".zip,application/zip"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (file) {
                setSelectedBackupFile(file);
              }
            }}
          />
        </div>

        {message && <p className="mt-4 text-sm text-zinc-600">{message}</p>}
      </section>

      <RestoreBackupModal
        isOpen={selectedBackupFile !== null}
        fileName={selectedBackupFile?.name ?? ""}
        isRestoring={isRestoring}
        onClose={() => {
          if (isRestoring) {
            return;
          }

          setSelectedBackupFile(null);

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }}
        onConfirm={handleRestoreBackup}
      />
    </div>
  );
};

export default SettingsPage;
