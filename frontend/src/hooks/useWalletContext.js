import { useContext } from "react";
import { WalletContext } from "context/WalletContext";

export const useWalletContext = () => {
  const context = useContext(WalletContext);

  if (!context) {
    throw Error(
      "Custom:useWalletContext should be used inside an WalletContextProvider"
    );
  }
  return context;
};
