import axios from "axios";

const BaseUrl = "http://localhost:8080";

export const getAllEmployees = async (search = "", page = 1, limit = 5) => {
  const url = `${BaseUrl}/api/employee?search=${search}&page=${page}&limit=${limit}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    return error;
  }
};

export const createEmployee = async (employee) => {
  const url = `${BaseUrl}/api/employee`;
  try {
    const formData = new FormData();

    for (const key in employee) {
      formData.append(key, employee[key]);
    }

    const response = await axios.post(url, formData);

    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateEmployee = async (employee, id) => {
  const url = `${BaseUrl}/api/employee/${id}`;
  try {
    const formData = new FormData();

    for (const key in employee) {
      formData.append(key, employee[key]);
    }

    const response = await axios.put(url, formData);

    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployee = async (id) => {
  const url = `${BaseUrl}/api/employee/${id}`;
  try {
    const response = await axios.delete(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeeById = async (id) => {
  const url = `${BaseUrl}/api/employee/${id}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};