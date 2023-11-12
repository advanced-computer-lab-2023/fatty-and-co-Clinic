import react from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./components/PaymentForm";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const PUBLIC_KEY =
  "pk_test_51O9tZeDlw6jDceOALILn3gb3eOAzBSHSuIQKUqUxTX8eSdJn36QpsxAqKWskgVA5TNzo5Zx3OAQbn3I7ZjZHxSZX00M5RKDnCM";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function MakePayment({ amount }) {
  const location=useLocation()
  const receipt=location.state.receipt
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm amount={receipt.amount?receipt.amount:amount}
                   description={receipt.description?receipt.description:"Doctor's appointment"}
                   Package={receipt.Package?receipt.Package:""}
                   nationalID={receipt.nationalID?receipt.nationalID:""} />
    </Elements>
  );
}
