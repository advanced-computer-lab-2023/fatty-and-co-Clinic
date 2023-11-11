import { PackageContextProvider } from "./components/Context";
import MedicalHistoryI from "./index";

function MedicalHistortDoctor() {
  return (
    <PackageContextProvider>
      <MedicalHistoryI />
    </PackageContextProvider>
  );
}

export default MedicalHistortDoctor;
