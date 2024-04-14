// src/pages/Admin.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from '../firebase-config';
import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduct/AddProduct";
import ListProduct from "../Components/ListProduct/ListProduct";

const Admin = () => {
  if (!auth.currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
      </Routes>
    </div>
  );
};

export default Admin;
