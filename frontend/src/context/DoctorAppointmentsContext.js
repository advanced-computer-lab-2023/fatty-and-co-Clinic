import { useReducer, createContext } from "react";

export const DoctorAppointmentsContext = createContext();

export const doctorAppointmentsReducer = (state, action) => {
  switch (action.type) {
    case "SET_APPOINTMENTS":
      return {
        appointments: action.payload,
      };
    case "ADD_APPOINTMENT":
      return {
        appointments: [action.payload, ...state.appointments],
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

export const DoctorAppointmentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(doctorAppointmentsReducer, {
    appointments: [{}],
  });

  return (
    <DoctorAppointmentsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DoctorAppointmentsContext.Provider>
  );
};
