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
      <div>
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
          // This applies the Stormy/Alice palette to notifications
          className: 'bg-white text-stormy-500 shadow-xl border border-alice-200 dark:bg-stormy-300 dark:text-pearl-500 dark:border-stormy-400 font-medium',
          style: {
            fontSize: "14px",
            borderRadius: "12px",
            padding: "12px 20px",
          },
          success: {
            iconTheme: {
              primary: '#006d77', // Stormy Teal
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#e29578', // Tangerine
              secondary: 'white',
            },
          },
        }}
      />
    </UserProvider>
  );
};

export default App;