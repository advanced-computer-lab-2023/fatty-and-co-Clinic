import { useContext } from "react";
import { PackageContext } from "../components/Context";

export const useMedicalHistoryContext = () => {
  const context = useContext(PackageContext);

  if (!context) {
    throw Error(
      "Custom:useMedicalHistoryContext should be used inside an PackageContextProvider"
    );
  }
  return context;
};
