import { cookieStorageManager } from "@chakra-ui/system";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    window.location.href = "/auth/signin";
  };
  return logout;
};
