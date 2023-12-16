import { useContext } from "react";
import { FollowUpRequestsContext } from "context/FollowUpRequestsContext";

export const useFollowUpRequestsContext = () => {
  const context = useContext(FollowUpRequestsContext);

  if (!context) {
    throw Error(
      "Custom:useFollowUpRequestsContext should be used inside a FollowUpRequestsContextProvider"
    );
  }
  return context;
};
