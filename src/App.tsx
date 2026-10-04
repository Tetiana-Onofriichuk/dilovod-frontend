import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";
import SoldiersPage from "./pages/SoldiersPage";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/soldiers" element={<SoldiersPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
