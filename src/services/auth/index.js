import { axiosInstance } from "../../api/axios";
import { authActions } from "../../redux/features/auth/actions";
import { dispatch } from "../../redux/store";
import { appRoutesName } from "../../routes/appRoutesName";

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

async function logout(navigate) {
  dispatch(authActions.logout());

  if (navigate) navigate(appRoutesName.login);
  else window.location.href = appRoutesName.login;
}

async function signup(data = {}) {
  try {
    const response = await axiosInstance.post("auth/signup", data);

    return response;
  } catch (error) {
    return error.response;
  }
}

export const auth = { login, logout, signup };
