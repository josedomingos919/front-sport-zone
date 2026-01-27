import { axiosInstance } from "../../api/axios";

async function add(data = {}) {
  try {
    const response = await axiosInstance.post("atleta/create", data);

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function update(data = {}) {
  try {
    const response = await axiosInstance.put("atleta/update/" + data?.id, data);

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
    const response = await axiosInstance.get(`atleta/all?${queryParams}`);

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function search(value = "") {
  try {
    const response = await axiosInstance.get(`atleta/search/${value}`);

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function remove(id = "") {
  try {
    const response = await axiosInstance.delete(`atleta/${id}`);

    return response;
  } catch (error) {
    return error?.response;
  }
}

export const atleta = {
  update,
  remove,
  add,
  search,
  getAll,
};
