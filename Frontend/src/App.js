import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import "./App.css";

import AppLayout from "./layout/AppLayout";
import HomeScreen from "./pages/HomeScreen";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
