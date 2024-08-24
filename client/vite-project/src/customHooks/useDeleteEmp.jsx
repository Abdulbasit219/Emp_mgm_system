// import toast from "react-hot-toast";
// import { deleteEmployee } from "../Apis";
// import { useNavigate } from "react-router-dom";

// const useDeleteEmp = () => {
//   const navigate = useNavigate();

//   const handleDeleteEmp = async (emp, fetchEmployees) => {
//     try {
//       const { success, message } = await deleteEmployee(emp._id);
//       if (success) {
//         toast.success(message);
//         fetchEmployees();
//         navigate("/employee");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return handleDeleteEmp();
// };

// export default useDeleteEmp;


import toast from "react-hot-toast";
import { deleteEmployee } from "../Apis";
import { useNavigate } from "react-router-dom";

const useDeleteEmp = () => {
  const navigate = useNavigate();

  const handleDeleteEmp = async (emp, fetchEmployees) => {
    try {
      const { success, message } = await deleteEmployee(emp._id);
      if (success) {
        toast.success(message);
        if (fetchEmployees) fetchEmployees(); 
        navigate("/employee");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return handleDeleteEmp; 
};

export default useDeleteEmp;
