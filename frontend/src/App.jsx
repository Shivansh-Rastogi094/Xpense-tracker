import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/dashboard/Home";
import Income from "./pages/dashboard/Income";
import Expense from "./pages/dashboard/Expense";
import { Toaster } from "react-hot-toast";

import UserProvider from "./context/UserContext";
import BackgroundShader from "./components/BackgroundShader";

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/Dashboard" />
  ) : (
    <Navigate to="/Login" />
  );
};

const App = () => {
  return (
    <UserProvider>
      <BackgroundShader />
      <div className="relative z-10">
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </Router>
      </div>

      {/* THEMED TOASTER */}
      <Toaster
        toastOptions={{
          className: 'glass-modal text-on-surface font-medium border border-white/10 shadow-2xl',
          style: {
            fontSize: "14px",
            borderRadius: "12px",
            padding: "12px 20px",
          },
          success: {
            iconTheme: {
              primary: 'var(--color-secondary)', 
              secondary: 'var(--color-surface)',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--color-error)', 
              secondary: 'var(--color-surface)',
            },
          },
        }}
      />
    </UserProvider>
  );
};

export default App;