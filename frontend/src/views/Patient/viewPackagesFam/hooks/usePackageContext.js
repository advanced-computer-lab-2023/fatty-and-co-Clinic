import { useContext } from "react";
import { PackageContext } from "../components/Context";

export const usePackageContext = () => {
  const context = useContext(PackageContext);

  if (!context) {
    throw Error(
      "Custom:usePackageContext should be used inside an PackageContextProvider"
    );
  }
  return context;
};
