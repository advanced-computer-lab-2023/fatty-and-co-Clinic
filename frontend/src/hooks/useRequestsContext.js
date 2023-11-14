import { useContext } from "react";
import { RequestsContext } from "context/RequestsContext";

export const useRequestsContext = () => {
  const context = useContext(RequestsContext);

  if (!context) {
    throw Error(
      "Custom:useRequestsContext should be used inside an RequestsContextProvider"
    );
  }
  return context;
};
