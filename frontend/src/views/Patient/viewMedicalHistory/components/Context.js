import { useReducer, createContext } from "react";

export const PackageContext = createContext();

export const packagesReducer = (state, action) => {
  switch (action.type) {
    case "SET_PACKAGES":
      return {
        packages: action.payload,
      };
    case "ADD_PACKAGE":
      return {
        packages: [action.payload, ...state.packages],
      };
    case "UPDATE_PACKAGE":
      return {
        packages: state.packages.map((Package) =>
          Package._id === action.payload._id ? action.payload : Package
        ),
      };
    case "DELETE_PACKAGE":
      return {
        packages: state.packages.filter(
          (Package) => Package._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const PackageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(packagesReducer, {
    packages: null,
  });
  return (
    <PackageContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PackageContext.Provider>
  );
};
