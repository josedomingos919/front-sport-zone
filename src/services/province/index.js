import { axiosInstance } from "../../api/axios";

async function getAll() {
  try {
    const response = await axiosInstance.get("province/all");

    return response;
  } catch (error) {
    return error?.response;
  }
}

async function add(data = {}) {
  try {
    const response = await axiosInstance.post("province/create", data);

    return response;
  } catch (error) {
    return error?.response;
  }
}

export const province = { getAll, add };
