import React from "react";
import { Link } from "react-router-dom";
import { MdDelete, MdEditSquare } from "react-icons/md";
import useDeleteEmp from "../customHooks/useDeleteEmp";

const EmployeeTable = ({
  employees,
  pagination,
  fetchEmployees,
  handleUpdateEmployee,
}) => {
  const TableHeader = ["Name", "Email", "Phone", "Department", "Action"];

  const { currentPage, totalPages } = pagination;
  const handleDeleteEmployee = useDeleteEmp();

  const pageNumber = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  const handlePagination = (currPage) => {
    fetchEmployees("", currPage, 5);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {TableHeader.map((header, index) => (
                <th key={index} className="px-6 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No record found
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  key={emp._id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-blue-400 hover:text-blue-500 whitespace-nowrap hover:underline"
                  >
                    <Link to={`/employee/${emp._id}`}>{emp.name}</Link>
                  </th>

                  <td className="px-6 py-4">{emp.email}</td>

                  <td className="px-6 py-4">{emp.phone}</td>

                  <td className="px-6 py-4">{emp.department}</td>

                  <td className="px-6 py-4">
                    <div className="text-2xl">
                      <button
                        className="text-yellow-400 hover:opacity-50"
                        onClick={() => handleUpdateEmployee(emp)}
                      >
                        <MdEditSquare />
                      </button>
                      <button
                        className="text-red-500 hover:opacity-50"
                        onClick={() =>
                          handleDeleteEmployee(emp, fetchEmployees)
                        }
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* pagination  */}
        <nav className="p-2 flex flex-col-reverse md:flex-row items-center justify-between ">
          <span className="bg-[#6099F6] p-1 mt-4  rounded text-white font-bold">
            page {currentPage} of {totalPages}
          </span>

          <ul className="flex md:justify-end ml-4 text-base h-10">
            {/* prev btn */}
            <li>
              <button
                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-[#6099F6] hover:text-white"
                disabled={currentPage === 1}
                onClick={() => handlePrevPage()}
              >
                Previous
              </button>
            </li>

            {/* pagination numbers */}
            {pageNumber.map((page, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePagination(page)}
                  className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 rounded ${
                    currentPage === page
                      ? "bg-[#6099F6] text-white"
                      : "text-gray-500 bg-white hover:bg-[#6099F6] hover:text-white"
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}

            {/* next btn */}
            <li>
              <button
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-[#6099F6] hover:text-white"
                disabled={totalPages === currentPage}
                onClick={() => handleNextPage()}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default EmployeeTable;
