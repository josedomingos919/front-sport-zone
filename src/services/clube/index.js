import { axiosInstance } from "../../api/axios";

async function add(data = {}) {
  try {
    const response = await axiosInstance.post("clube/create", data);

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function update(data = {}) {
  try {
    const response = await axiosInstance.put("clube/update/" + data?.id, data);

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function getAll(
  filter = {
    page: 1,
    size: 10,
    descricao: null,
  }
) {
  const queryParams = new URLSearchParams(filter);

  try {
    const response = await axiosInstance.get(`clube/all?${queryParams}`);

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function search(value = "") {
  try {
    const response = await axiosInstance.get(`clube/search/${value}`);

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function remove(id = "") {
  try {
    const response = await axiosInstance.delete(`clube/${id}`);

    return response;
  } catch (error) {
    return error?.response;
  }
}

export const clube = {
  update,
  remove,
  add,
  search,
  getAll,
};
