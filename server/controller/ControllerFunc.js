import EmployeeModel from "../models/Models.js";
import Model from "../models/Models.js";

const getAllEmployee = async (req, res) => {
  try {
    //pagination concept
    let { page, limit, search } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    const skip = (page - 1) * limit;
    //page = (1 - 1)*5 = 0 record skip
    //page = (2 - 1)*5 = 5 record skip

    let searchCriteria = {};
    if (search) {
      searchCriteria = {
        name: {
          $regex: search,
          $options: "i", //case insensitive
        },
      };
    }

    const totalEmployee = await Model.countDocuments(searchCriteria);

    const emp = await Model.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

    const totalPages = Math.ceil(totalEmployee / limit);

    res.status(200).send({
      success: true,
      message: "All employees fetched successfully",
      data: {
        employees: emp,
        pagination: {
          totalEmployee,
          currentPage: page,
          totalPages,
          pageSize: limit,
        },
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { name, email, phone, department, salary } = req.body;

    // validations
    const requiredFields = ["name", "email", "department", "phone", "salary"];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).send({
          success: false,
          message: `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } is required`,
        });
      }
    }

    const profileImage = req.file ? req.file?.path : null;
    const body = { name, email, phone, department, salary, profileImage };

    const emp = new Model(body);
    await emp.save();
    res.status(201).send({
      success: true,
      message: "Employee was created successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

const getEmpByID = async (req, res) => {

  try {
    const { id } = req.params;
    const employeeById = await Model.findById({ _id: id });
    if (!employeeById) {
      return res.status(404).send({
        success: false,
        message: "Employee not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Fetched Employee by ID",
      data: employeeById,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

const deleteEmpById = async (req, res) => {
  try {
    const { id } = req.params;
    await Model.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "employee deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const updateEmpByid = async (req, res) => {
  try {
    const { name, email, phone, department, salary } = req.body;
    const { id } = req.params;
    console.log(req.body, req.params.id);

    let updateData = {
      name,
      phone,
      department,
      salary,
      email,
      updatedAt: new Date(),
    };

    if (req.file) {
      updateData.profileImage = req.file.path;
    }

    const updateEmp = await EmployeeModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updateEmp) {
      return res.status(404).send({
        message: "Employee not found",
      });
    }

    res.status(201).send({
      success: true,
      message: "Employee updated successfully",
      updateEmp,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

export {
  getAllEmployee,
  createEmployee,
  getEmpByID,
  deleteEmpById,
  updateEmpByid,
};
