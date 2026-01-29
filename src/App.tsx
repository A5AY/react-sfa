import type { ReactNode } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CustomerListPage from "./pages/CustomerListPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";
import CustomerCreatePage from "./pages/CustomerCreatePage";

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
            <CustomerListPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/customers/:id"
        element={
          <PrivateRoute>
            <CustomerDetailPage />
          </PrivateRoute>
        }
      />

      <Route path="/customers/new" element={ <PrivateRoute>
      <CustomerCreatePage />
    </PrivateRoute>
  }
  />
    </Routes>
  );
}
