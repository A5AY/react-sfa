import { Routes, Route } from "react-router-dom";
import CustomerListPage from "./pages/CustomerListPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerListPage />} />
      <Route path="/customers/:id" element={<CustomerDetailPage />} />
    </Routes>
  );
}

