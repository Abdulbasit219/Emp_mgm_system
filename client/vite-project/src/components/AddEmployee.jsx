import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { createEmployee, updateEmployee } from "../Apis";

const AddEmployee = ({
  showModal,
  setShowModal,
  fetchEmployees,
  updateEmp,
}) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    profileImage: null,
  });

  const [updateMode, setUpdateMode] = useState(false);

  const resetEmployeeState = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      salary: "",
      profileImage: null,
    });
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { success, message } = updateMode
        ? await updateEmployee(formData, formData._id)
        : await createEmployee(formData);
        if(success) {
          toast.success(message);
          resetEmployeeState();
          setShowModal(false);
          setUpdateMode(false);
          fetchEmployees();
        }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleModals = () => {
    setShowModal(false);
    setUpdateMode(false);
    resetEmployeeState();
  }

  useEffect(() => {
    if (updateEmp) {
      setUpdateMode(true);
      setFormData(updateEmp);
    }
  }, [updateEmp]);

  return (
    <>
      {showModal && (
        <div
          tabIndex="-1"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-100"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-2xl font-bold text-gray-900">
                  {updateMode ? "Update Employee" : "Add Employee"}
                </h3>
                <button
                  type="button"
                  onClick={() => handleModals()}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center text-2xl"
                >
                  <RxCross2 />
                </button>
              </div>

              {/* Modal body */}
              <form onSubmit={handleSubmit}>
                <div className="md:p-5 pl-4 space-y-2 flex flex-col">
                  <label htmlFor="" className="font-semibold text-xl">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="border border-2 rounded w-[90%] p-2"
                    placeholder="Enter Name"
                    name="name"
                    value={formData.name}
                    onChange={handleOnchange}
                  />

                  <label htmlFor="" className="font-semibold text-xl">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    className="border border-2 rounded w-[90%] p-2"
                    placeholder="Enter email address"
                    onChange={handleOnchange}
                  />

                  <label htmlFor="" className="font-semibold text-xl">
                    Phone
                  </label>
                  <input
                    type="number"
                    required
                    name="phone"
                    className="border border-2 rounded w-[90%] p-2"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleOnchange}
                  />

                  <label htmlFor="" className="font-semibold text-xl">
                    Salary
                  </label>
                  <input
                    type="text"
                    required
                    name="salary"
                    className="border border-2 rounded w-[90%] p-2"
                    placeholder="Enter salary"
                    value={formData.salary}
                    onChange={handleOnchange}
                  />

                  <label htmlFor="" className="font-semibold text-xl">
                    Department
                  </label>
                  <input
                    type="text"
                    required
                    name="department"
                    className="border border-2 rounded w-[90%] p-2"
                    placeholder="Enter Department"
                    value={formData.department}
                    onChange={handleOnchange}
                  />

                  <label htmlFor="" className="font-semibold text-xl">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    name="profileImage"
                    className="border border-2 rounded w-[90%] p-2"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Modal footer */}
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  {/* save button */}
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center text-xl"
                  >
                    {updateMode ? "Update" : "Save"}
                  </button>

                  {/* cancel button */}
                  <button
                    onClick={() => handleModals()}
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEmployee;
