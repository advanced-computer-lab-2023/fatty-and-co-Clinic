import { useContext } from "react";
import { NotificationsContext } from "context/NotificationsContext";

export const useNotificationsContext = () => {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw Error(
      "Custom:useNotificationsContext should be used inside a NotificationsContextProvider"
    );
  }
  return context;
};
