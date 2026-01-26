import { axiosInstance } from "../../api/axios";

async function add(data = {}) {
  try {
    const response = await axiosInstance.post("teacher", data);

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function update(data = {}) {
  try {
    const response = await axiosInstance.put("teacher", data);

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function getAll(filter = {}) {
  const queryParams = new URLSearchParams(filter);

  try {
    const response = await axiosInstance.get(`teacher?${queryParams}`);

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function search(value = "") {
  try {
    const response = await axiosInstance.get(`teacher/search/${value}`);

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function remove(id = "") {
  try {
    const response = await axiosInstance.delete(`teacher/${id}`);

    return response;
  } catch (error) {
    return error?.response;
  }
}

export const teacher = {
  update,
  remove,
  add,
  search,
  getAll,
};
