import { axiosInstance } from "../../api/axios";

async function add(data = {}) {
  try {
    const response = await axiosInstance.post("jogo/create", data);

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function update(data = {}) {
  try {
    const response = await axiosInstance.put("jogo/update/" + data?.id, data);

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
    const response = await axiosInstance.get(`jogo/all?${queryParams}`);

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function search(value = "") {
  try {
    const response = await axiosInstance.get(`jogo/search/${value}`);

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function remove(id = "") {
  try {
    const response = await axiosInstance.delete(`jogo/${id}`);

    return response;
  } catch (error) {
    return error?.response;
  }
}

export const jogo = {
  update,
  remove,
  add,
  search,
  getAll,
};
