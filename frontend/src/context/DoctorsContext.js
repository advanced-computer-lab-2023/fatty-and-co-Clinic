import { createContext } from "react";

export const DoctorsContext = createContext();

// on why we use ...state instead of just {doctors: action.payload}
// The authReducer function is used to manage the state of the user in the application.
// It uses the spread operator (...state) to create a new state object instead of mutating the existing one.
// This is important because React's re-rendering of components is based on changes in state.
// If we mutate the state directly, React may not recognize that a change has occurred, and therefore may not re-render the component.
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
