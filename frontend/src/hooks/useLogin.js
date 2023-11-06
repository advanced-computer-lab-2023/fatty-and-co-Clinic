import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { API_PATHS } from "API/api_paths";
import { cookieStorageManager } from "@chakra-ui/system";
import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(API_PATHS.login, {
        Username: username,
        Password: password,
      });
      const json = JSON.stringify(res.data);
      localStorage.setItem("user", json); // TODO: make it session storage instead of local storage if remember me not ticked
      dispatch({ type: "LOGIN", payload: res.data });
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
      return err.response;
    }
  };

  return { login, error, loading };
};
