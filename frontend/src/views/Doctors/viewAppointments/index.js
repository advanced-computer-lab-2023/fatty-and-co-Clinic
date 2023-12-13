import { DoctorAppointmentsContextProvider } from "context/DoctorAppointmentsContext";
import { PrescriptionContextProvider } from "context/PrescriptionContext";
import ViewAppointmentsInner from "./ViewAppointments";

export default function ViewAppointments() {
  return (
    <PrescriptionContextProvider>
      <DoctorAppointmentsContextProvider>
        <ViewAppointmentsInner />
      </DoctorAppointmentsContextProvider>
    </PrescriptionContextProvider>
  );
}
