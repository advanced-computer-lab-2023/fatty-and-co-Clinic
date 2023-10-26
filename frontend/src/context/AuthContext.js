import { createContext, userReducer } from "react";

export const AuthContext = createContext();

// on why we use ...state instead of just {user: action.payload}
// The authReducer function is used to manage the state of the user in the application.
// It uses the spread operator (...state) to create a new state object instead of mutating the existing one.
// This is important because React's re-rendering of components is based on changes in state.
// If we mutate the state directly, React may not recognize that a change has occurred, and therefore may not re-render the component.
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = userReducer(authReducer, { user: null });

  console.log("AuthContextProvider state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
