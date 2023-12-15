import { useReducer, createContext } from "react";

export const PackageContext = createContext();

export const packagesReducer = (state, action) => {
  switch (action.type) {
    case "SET_PACKAGES":
      return {
        packages: action.payload,
      };
    default:
      return state;
  }
};

export function PackageContextProvider({ children }) {
  const [state, dispatch] = useReducer(packagesReducer, {
    packages: null,
  });
  return (
    <PackageContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PackageContext.Provider>
  );
}
