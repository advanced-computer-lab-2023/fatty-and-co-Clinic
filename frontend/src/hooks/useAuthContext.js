import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error(
      "Custom:useAuthContext should be used inside an AuthContextProvider"
    );
  }

  return context;
};
