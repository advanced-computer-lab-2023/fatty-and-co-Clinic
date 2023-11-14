import { useReducer, createContext } from "react";

export const RequestsContext = createContext();

export const requestsReducer = (state, action) => {
  switch (action.type) {
    case "GET_REQUESTS":
      return { ...state, requests: action.payload };
    case "UPDATE_REQUEST":
      return {
        ...state,
        requests: state.requests.map((request) =>
          request._id === action.payload._id ? action.payload : request
        ),
      };
    default:
      return state;
  }
};

export const RequestsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(requestsReducer, { requests: [] });
  return (
    <RequestsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RequestsContext.Provider>
  );
};
