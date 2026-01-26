import { axiosInstance } from "../../api/axios";

async function login({ phone = "", password = "" }) {
  try {
    const response = await axiosInstance.post("auth/signin", {
      phone,
      password,
    });

    return response;
  } catch (error) {
    return error.response;
  }
}

async function signup(data = {}) {
  try {
    const response = await axiosInstance.post("auth/signup", data);

    return response;
  } catch (error) {
    return error.response;
  }
}

export const auth = { login, signup };
