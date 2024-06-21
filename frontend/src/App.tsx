import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import Schools from "./pages/Schools";
import HighSchools from "./pages/HighSchools";
import Universities from "./pages/Universities";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schools"
          element={
            <ProtectedRoute>
              <Schools />
            </ProtectedRoute>
          }
        />
        <Route
          path="/high-schools"
          element={
            <ProtectedRoute>
              <HighSchools />
            </ProtectedRoute>
          }
        />
        <Route
          path="/universities"
          element={
            <ProtectedRoute>
              <Universities />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
