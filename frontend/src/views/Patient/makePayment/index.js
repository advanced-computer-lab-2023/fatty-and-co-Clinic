import react from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./components/PaymentForm";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const PUBLIC_KEY =
  "pk_test_51O9tZeDlw6jDceOALILn3gb3eOAzBSHSuIQKUqUxTX8eSdJn36QpsxAqKWskgVA5TNzo5Zx3OAQbn3I7ZjZHxSZX00M5RKDnCM";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function MakePayment({ amount }) {

  const location = useLocation();
  const { state } = location;

  console.log(state);
  //const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const amount2 = searchParams.get('amount');
 // const amountApt = searchParams.get('Amount')
  const description = searchParams.get('description');
  const PackageName=searchParams.get('PackageName');
  const NationalId=searchParams.get('NationalId');

  const amountApt = state.Amount;
  const DoctorId = state.DoctorId;
  const PatientUsername = state.FamMemUsername;
  const PatientName = state.FamMemName;
  const Date = state.Date;
  

  console.log("hello stripe");
  console.log(searchParams);
  console.log(amountApt);
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm
        Amount={amount2 ? amount2 : amountApt}
        Description={description ? description : "Doctor's appointment"}
        PackageName={PackageName ? PackageName : ""}
        NationalId={NationalId ? NationalId : ""}
        //DoctorUsername={doctorUserName}
        DoctorId = {DoctorId}
        //DoctorName={doctorName}
        PatientUsername={PatientUsername}
        Date={Date}
      />
     
    </Elements>
  );
}
