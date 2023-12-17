import { PatientAppointmentsContext } from "context/PatientAppointmentsContext";
import { useContext } from "react";

export const usePatientAppointmentsContext = () => {
  const context = useContext(PatientAppointmentsContext);

  if (!context) {
    throw Error(
      "Custom:usePatientAppointmentsContext should be used inside a PatientAppointmentsContextProvider"
    );
  }
  return context;
};
