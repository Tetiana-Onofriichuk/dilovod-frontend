import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";
import SoldiersPage from "./pages/SoldiersPage";
import RequisitesPage from "./pages/RequisitesPage";
import SoldierDetailsPage from "./pages/SoldierDetailsPage";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/soldiers" element={<SoldiersPage />} />
        <Route path="/requisites" element={<RequisitesPage />} />
        <Route path="/soldiers/:id" element={<SoldierDetailsPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
