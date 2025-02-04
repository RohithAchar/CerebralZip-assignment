import { loginUser } from "./api";

export const isAuthenticated = async () => {
  if (localStorage.getItem("username") && localStorage.getItem("password")) {
    try {
      await loginUser(
        localStorage.getItem("username")!,
        localStorage.getItem("password")!
      );
      return true;
    } catch (error) {
      return false;
    }
  }
  return false;
};
