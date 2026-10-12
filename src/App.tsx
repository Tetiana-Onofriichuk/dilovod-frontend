import { AnimatePresence } from "motion/react";
import { Route, Routes, useLocation } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import PageTransition from "./components/common/PageTransition";

import HomePage from "./pages/HomePage";
import SoldiersPage from "./pages/SoldiersPage";
import RequisitesPage from "./pages/RequisitesPage";
import SoldierDetailsPage from "./pages/SoldierDetailsPage";
import DocumentsPage from "./pages/DocumentsPage";
import CalendarPage from "./pages/CalendarPage";
import TemplatesPage from "./pages/TemplatesPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const location = useLocation();

  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />

          <Route
            path="/soldiers"
            element={
              <PageTransition>
                <SoldiersPage />
              </PageTransition>
            }
          />

          <Route
            path="/soldiers/:id"
            element={
              <PageTransition>
                <SoldierDetailsPage />
              </PageTransition>
            }
          />

          <Route
            path="/command-staff"
            element={
              <PageTransition>
                <RequisitesPage />
              </PageTransition>
            }
          />

          <Route
            path="/documents"
            element={
              <PageTransition>
                <DocumentsPage />
              </PageTransition>
            }
          />

          <Route
            path="/templates"
            element={
              <PageTransition>
                <TemplatesPage />
              </PageTransition>
            }
          />

          <Route
            path="/calendar"
            element={
              <PageTransition>
                <CalendarPage />
              </PageTransition>
            }
          />
          <Route
            path="/settings"
            element={
              <PageTransition>
                <SettingsPage />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;
