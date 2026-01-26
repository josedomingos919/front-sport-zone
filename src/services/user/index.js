import { axiosInstance } from "../../api/axios";

async function getAll(filter = {}) {
  const queryParams = new URLSearchParams(filter);

  try {
    const response = await axiosInstance.get(`users/all/?${queryParams}`);

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function search(value = "") {
  try {
    const response = await axiosInstance.get(`users/search/${value}`);

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function add(data = {}) {
  try {
    const response = await axiosInstance.post("users/create", data);

    return response;
  } catch (error) {
    return error?.response;
  }
}

export const user = { getAll, search, add };
