import { useReducer, createContext } from "react";

export const WalletContext = createContext();

export const walletReducer = (state, action) => {
  switch (action.type) {
    case "GET_WALLET":
      return { ...state, Wallet: action.payload };
    case "ADD_TO_WALLET":
      return {
        ...state,
        Wallet: state.Wallet + action.payload,
      };
    case "DEDUCT_FROM_WALLET":
      return {
        ...state,
        Wallet: state.Wallet - action.payload,
      };
    default:
      return state;
  }
};

export const WalletContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, { Wallet: null });
  return (
    <WalletContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WalletContext.Provider>
  );
};
