import { axiosInstance } from "../../api/axios";

async function add(data = {}) {
  try {
    const response = await axiosInstance.post("equipa/create", data);

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function update(data = {}) {
  try {
    const response = await axiosInstance.put("equipa/update/" + data?.id, data);

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
    const response = await axiosInstance.get(`equipa/all?${queryParams}`);

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function search(value = "") {
  try {
    const response = await axiosInstance.get(`equipa/search/${value}`);

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function remove(id = "") {
  try {
    const response = await axiosInstance.delete(`equipa/${id}`);

    return response;
  } catch (error) {
    return error?.response;
  }
}

export const equipa = {
  update,
  remove,
  add,
  search,
  getAll,
};
