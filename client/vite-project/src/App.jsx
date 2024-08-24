import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EmployeeMgmnt from "./components/EmployeeMgmnt";
import EmployeeDetails from "./components/EmployeeDetails";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"employee"} />} />
          <Route path="/employee" element={<EmployeeMgmnt />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
