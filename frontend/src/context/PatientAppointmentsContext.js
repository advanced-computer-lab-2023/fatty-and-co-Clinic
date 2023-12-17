import { useReducer, createContext } from "react";

export const PatientAppointmentsContext = createContext();

export const patientAppointmentsReducer = (state, action) => {
  switch (action.type) {
    case "SET_APPOINTMENTS":
      return {
        appointments: action.payload,
      };
    case "ADD_APPOINTMENT":
      return {
        appointments: [...state.appointments, action.payload],
      };
    case "UPDATE_APPOINTMENT":
      return {
        appointments: state.appointments.map((appointment) =>
          appointment._id === action.payload._id ? action.payload : appointment
        ),
      };
    case "DELETE_APPOINTMENT":
      return {
        appointments: state.appointments.filter(
          (appointment) => appointment._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const PatientAppointmentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(patientAppointmentsReducer, {
    appointments: [{}],
  });

  return (
    <PatientAppointmentsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PatientAppointmentsContext.Provider>
  );
};
