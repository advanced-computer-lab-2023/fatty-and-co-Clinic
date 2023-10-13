import { createContext } from "react";

export const DoctorsContext = createContext();

export const doctorsReducer = (state, action) => {
  switch (action.type) {
    case "GET_DOCTORS":
      return { ...state, doctors: action.payload };
    case "CREATE_DOCTOR":
      return { ...state, doctors: [action.payload, ...state.doctors] };
    case "UPDATE_DOCTOR":
      return {
        ...state,
        doctors: state.doctors.map((doctor) =>
          doctor._id === action.payload._id ? action.payload : doctor
        ),
      };
    case "DELETE_DOCTOR":
      return {
        ...state,
        doctors: state.doctors.filter(
          (doctor) => doctor._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const DoctorsContextProvider = () => {
  const [state, dispatch] = useReducer(doctorsReducer, { doctors: [] });

  dispatch({ type: "GET_DOCTORS", payload: {} });

  return (
    <DoctorsContext.Provider value={{ state, dispatch }}>
      {children}
    </DoctorsContext.Provider>
  );
};
