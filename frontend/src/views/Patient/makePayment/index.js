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

  // console.log(state);
  //const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const amount2 = searchParams.get("amount");
  //const amountApt = searchParams.get('Amount')
  const description = searchParams.get("description");
  const PackageName = searchParams.get("PackageName");
  const NationalId = searchParams.get("NationalId");

  let Amount;
  let CostFam;
  let DoctorId;
  let FamMemName;
  let Date;

  if (!PackageName && description !== "Subscription payment") {
    const { state } = location;
    //amountApt = state.Amount;
    Amount= state.Cost,
   // CostFam= state.CostFam,
    DoctorId = state.DoctorId;
    FamMemName = state.FamMemName;
    Date = state.Date;
    console.log("state fam name: " + FamMemName);
  }

  console.log("amount2:" + amount2);
  //console.log("amountApt:" + amountApt);
  console.log("description:" + description);
  console.log("PackageName:" + PackageName);
  console.log("NationalId:" + NationalId);
  console.log("DoctorId:" + DoctorId);
  //console.log("PatientUsername:" + PatientUsername);
  console.log("fammemname:" + FamMemName);
  console.log("Date:" + Date);
  // console.log("hello stripe");
  // console.log(searchParams);
  // console.log(amountApt);
  // console.log("doctor's id:" + DoctorId);
  // console.log("patient's username:" + PatientUsername);
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm
        Amount={ amount2 ? amount2 : Amount ? Amount : 0}
        Description={description ? description : "Doctor's appointment"}
        PackageName={PackageName ? PackageName : ""}
        NationalId={NationalId ? NationalId : ""}
        //DoctorUsername={doctorUserName}
        DoctorId={DoctorId || ""}
        //DoctorName={doctorName}
        FamMemName={FamMemName || ""}
        Date={Date || ""}
        //CostFam={CostFam? CostFam : 0}
      />
    </Elements>
  );
}
