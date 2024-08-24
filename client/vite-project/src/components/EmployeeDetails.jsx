import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById } from "../Apis";
import useDeleteEmp from "../customHooks/useDeleteEmp";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();
  const fetchEmployeeById = async () => {
    try {
      const { data } = await getEmployeeById(id);
      setEmployee(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteEmployee = useDeleteEmp(fetchEmployeeById);

  useEffect(() => {
    fetchEmployeeById();
  }, [id]);

  return (
    <div className="h-screen dark:bg-gray-700 bg-gray-200 pt-12">
      <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <div className="border-b px-4 pb-6">
          <div className="flex justify-end mt-2 text-2xl text-gray-500">
            <button
              className="pointer hover:opacity-50"
              onClick={() => navigate("/employee")}
            >
              <RxCross2 />
            </button>
          </div>

          <div className="text-center my-4">
            <img
              className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
              src={employee.profileImage || "default-image-url.jpg"} // Fallback image URL
              alt={employee.name || "Employee image"} // Alt text
            />
            <div className="py-2">
              <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                {employee.name || "No Name"}
              </h3>
            </div>
          </div>
        </div>

        <div className="font-bold text-xl text-gray-800 dark:text-white ml-4">
          <p>Employee Details:</p>
        </div>

        <div className="px-4 py-4">
          <div className="flex justify-between">
            <p className="font-bold text-xl text-gray-800 dark:text-white mb-2">
              Email:
            </p>
            <p>{employee.email || "No Email"}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-bold text-xl text-gray-800 mb-2">Phone:</p>
            <p>{employee.phone || "No Phone"}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-bold text-xl text-gray-800 mb-2">Department:</p>
            <p>{employee.department || "No Department"}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-bold text-xl text-gray-800 mb-2">Salary:</p>
            <p>{employee.salary || "No Salary"}</p>
          </div>
        </div>

        <div className="flex px-4 p-2">
          <button
            className="p-2 bg-blue-400 rounded text-white pointer hover:opacity-50 font-bold"
            onClick={() => navigate("/employee")}
          >
            Back
          </button>
          <button
            className="p-2 bg-red-400 rounded text-white pointer ml-4 hover:opacity-50 font-bold"
            onClick={() => handleDeleteEmployee(employee)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
