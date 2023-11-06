import { cookieStorageManager } from "@chakra-ui/system";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("fattyandcoClinicUser"); // TODO: remove from session storage too
    dispatch({ type: "LOGOUT" });
  };
  return logout;
};
