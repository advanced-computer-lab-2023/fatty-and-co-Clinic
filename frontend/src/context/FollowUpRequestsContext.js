import { useReducer, createContext } from "react";

export const FollowUpRequestsContext = createContext();

export const followUpRequestsReducer = (state, action) => {
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

export const FollowUpRequestsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(followUpRequestsReducer, { requests: [] });
  return (
    <FollowUpRequestsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FollowUpRequestsContext.Provider>
  );
};
