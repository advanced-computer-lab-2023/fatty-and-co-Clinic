import { useReducer, createContext } from "react";

export const PrescriptionContext = createContext();

export const prescriptionReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRESCRIPTIONS":
      return {
        prescriptions: action.payload,
      };
    case "ADD_PRESCRIPTION":
      return {
        prescriptions: [...state.prescriptions, action.payload],
      };
  
    default:
      return state;
  }
};

export const PrescriptionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(prescriptionReducer, {
    prescriptions: [],
  });

  return (
    <PrescriptionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PrescriptionContext.Provider>
  );
};
