import { PackageContextProvider } from "./components/Context";
import MedicalHistoryI from "./index";

function MedicalHistory() {
  return (
    <PackageContextProvider>
      <MedicalHistoryI />
    </PackageContextProvider>
  );
}

export default MedicalHistory;
