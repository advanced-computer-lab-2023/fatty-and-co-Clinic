import react from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./components/PaymentForm";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const PUBLIC_KEY =
  "pk_test_51O9tZeDlw6jDceOALILn3gb3eOAzBSHSuIQKUqUxTX8eSdJn36QpsxAqKWskgVA5TNzo5Zx3OAQbn3I7ZjZHxSZX00M5RKDnCM";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function MakePayment({ amount, doctorUserName, doctorName, patientUsername, date }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const amount2 = searchParams.get('amount');
  const description = searchParams.get('description');
  const PackageName=searchParams.get('PackageName')
  const NationalId=searchParams.get('NationalId')
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm
        Amount={amount2 ? amount2 : amount}
        Description={description ? description : "Doctor's appointment"}
        PackageName={PackageName ? PackageName : ""}
        NationalId={NationalId ? NationalId : ""}
        DoctorUsername={doctorUserName}
        DoctorName={doctorName}
        PatientUsername={patientUsername}
        Status="Pending"
        Date={date}
      />
      {doctorUserName}
    </Elements>
  );
}
