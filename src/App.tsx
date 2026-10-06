import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";
import SoldiersPage from "./pages/SoldiersPage";
import RequisitesPage from "./pages/RequisitesPage";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/soldiers" element={<SoldiersPage />} />
        <Route path="/requisites" element={<RequisitesPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
