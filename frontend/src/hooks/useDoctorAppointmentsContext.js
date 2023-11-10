import { DoctorAppointmentsContext } from "context/DoctorAppointmentsContext";
import { useContext } from "react";

export const useDoctorAppointmentsContext = () => {
  const context = useContext(DoctorAppointmentsContext);

  if (!context) {
    throw Error(
      "Custom:useDoctorAppointmentsContext should be used inside an DoctorAppointmentsContextProvider"
    );
  }
  return context;
};
