import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import { getAllEmployees } from "../Apis";
import AddEmployee from "./AddEmployee";
const EmployeeMgmnt = () => {
  const [showModal, setShowModal] = useState(false);
  const [updateEmp, setUpdateEmp] = useState(null);
  const [allEmployees, setAllEmployees] = useState({
    employees: [],
    pagination: {
      totalEmployee: 14,
      currentPage: 1,
      totalPages: 3,
      pageSize: 5,
    },
  });

  const fetchEmployees = async (search = "", page = 1, limit = 5) => {
    try {
      const { data } = await getAllEmployees(search, page, limit);
      setAllEmployees(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddEmployee = () => {
    setShowModal(true);
  };

  const handleUpdateEmployee = (emp) => {
    setUpdateEmp(emp);
    setShowModal(true);
  };

  const handleSearch = (e) => {
    const data = e.target.value;
    fetchEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="w-full">
      <div className="w-[90%] md:w-[70%] bg-gray-100 mx-auto rounded">
        <h1 className="font-bold md:text-3xl p-2 flex justify-center">
          Employee Managment App
        </h1>

        <div className="flex justify-center">
          <hr className="h-[2px] w-[90%] md:w-[40%] bg-black" />
        </div>

        <div className="flex flex-col-reverse md:flex-row  md:justify-between p-4 gap-y-2">
          <button
            className="bg-blue-500 p-2 text-white font-bold rounded text-xl hover:opacity-80"
            onClick={() => handleAddEmployee()}
          >
            Add
          </button>

          <input
            onChange={handleSearch}
            type="search"
            placeholder="Search Employee..."
            className="rounded p-2 md:w-[40%] outline-none"
          />
        </div>

        <div>
          <EmployeeTable
            handleUpdateEmployee={handleUpdateEmployee}
            fetchEmployees={fetchEmployees}
            employees={allEmployees.employees}
            pagination={allEmployees.pagination}
          />
        </div>

        <div>
          <AddEmployee
            updateEmp={updateEmp}
            showModal={showModal}
            setShowModal={setShowModal}
            fetchEmployees={fetchEmployees}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeMgmnt;
