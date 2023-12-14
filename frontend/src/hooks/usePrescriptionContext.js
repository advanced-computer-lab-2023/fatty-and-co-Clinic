import { PrescriptionContext } from "context/PrescriptionContext";
import { useContext } from "react";

export const usePrescriptionContext = () => {
  const context = useContext(PrescriptionContext);

  if (!context) {
    throw Error(
      "Custom:usePrescriptionContext should be used inside an PrescriptionContextProvider"
    );
  }
  return context;
};
