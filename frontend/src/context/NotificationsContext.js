import { useReducer, createContext } from "react";

export const NotificationsContext = createContext();

export const notificationsReducer = (state, action) => {
  switch (action.type) {
    case "GET_NOTIFICATIONS":
      return { ...state, notifications: action.payload };
    case "UPDATE_NOTIFICATION":
        return {
            ...state,
            notifications: state.notifications.map((notification) =>
              notification._id === action.payload._id ? action.payload : notification
            ),
          };
    
    default:
      return state;
  }
};

export const NotificationsContextProvider = ({ children }) => {
  const [state, Dispatch] = useReducer(notificationsReducer, { notifications: [] });
  return (
    <NotificationsContext.Provider value={{ ...state, Dispatch }}>
      {children}
    </NotificationsContext.Provider>
  );
};
