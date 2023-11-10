import { DoctorAppointmentsContextProvider } from "context/DoctorAppointmentsContext";
import ViewAppointmentsInner from "./ViewAppointments";

export default function ViewAppointments() {
  return (
    <DoctorAppointmentsContextProvider>
      <ViewAppointmentsInner />
    </DoctorAppointmentsContextProvider>
  );
}
