import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import CustomerListPage from "./pages/CustomerListPage";
import CustomerCreatePage from "./pages/CustomerCreatePage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }: { children: ReactNode }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<CustomerListPage />} />
        <Route path="customers/new" element={<CustomerCreatePage />} />
      </Route>
    </Routes>
  );
}
