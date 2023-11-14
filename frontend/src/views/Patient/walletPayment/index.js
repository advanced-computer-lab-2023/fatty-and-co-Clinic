import React, { useState, useEffect } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import MakePayment from "views/Patient/makePayment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "views/Patient/makePayment/components/PaymentForm";
import { useHistory, useLocation } from "react-router-dom";
import { useWalletContext } from "hooks/useWalletContext";
//import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Box,
  Text,
  Spinner,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

const WalletPayment = ({ amount, doctorId, patientUsername, date }) => {
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const location = useLocation();
  const { state } = location;
  const { Wallet, dispatch } = useWalletContext();
  console.log(state);
  console.log("hello wallet");
  // const searchParams = new URLSearchParams(location.search);
  //   const amount2 = searchParams.get("amount");
  const Amount = state.Cost;
  const DoctorId = state.DoctorId;
  const PatientUsername = state.PatientUsername;
  const Date = state.Date;
  // console.log("hello stripe");
  // console.log(searchParams);
  console.log(Amount);
  console.log("doctor's id:" + DoctorId);
  console.log("patient's username:" + PatientUsername);
  console.log(Date);

  //   const handleWalletPayment = async () => {
  //     console.log("Attempting wallet payment...");
  //     try {
  //         axios.post(
  //         API_PATHS.walletPayment,
  //         {
  //           Amount: Amount,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${user.token}`,
  //           },
  //         }
  //       ).then((response) => {
  //       console.log("response:");
  //       console.log(response.data);
  //       if (response.data.success) {
  //         console.log("Payment successful!");
  //         //create the appointment
  //         const response = await fetch(API_PATHS.addAppointment, {
  //           method: "POST",
  //           headers: {
  //             Authorization: `Bearer ${user.token}`,
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             DoctorId: DoctorId,
  //             PatientUsername: PatientUsername,
  //             Date: Date,
  //           }),
  //         });
  //         //paydoctor
  //         const response2 = await fetch(API_PATHS.payDoctor, {
  //           method: "POST",
  //           headers: {
  //             Authorization: `Bearer ${user.token}`,
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             DoctorId: DoctorId,
  //           }),
  //         });
  //         setLoading(false);
  //         // toast.success("Payment successful!");
  //         toast({
  //           title: "Payment successful!",
  //           description: "You booked the appointment succsefuly.",
  //           status: "success",
  //           duration: 5000,
  //           isClosable: true,
  //         });
  //         onClose();
  //         history.push("../makePayment/ThankYou");
  //       } else {
  //         console.log("Payment declined. Insufficient funds.");
  //         setLoading(false);
  //         //toast.error("Insufficient funds. Please add funds to your wallet.");
  //         return toast({
  //           title: "failed Appointment booking",
  //           description: "Payment  . Insufficient funds.",
  //           status: "error",
  //           duration: 5000,
  //           isClosable: true,
  //         });
  //       }
  //     });
  //     } catch (error) {
  //       setLoading(false);
  //       console.error("Error processing wallet payment:", error);
  //       // Handle errors such as network issues, server errors, etc.
  //     }
  //   };
  const handleWalletPayment = async () => {
    console.log("Attempting wallet payment...");
    try {
      const response = await axios.post(
        API_PATHS.walletPayment,
        {
          Amount: Amount,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log("response:");
      console.log(response.data);

      if (response.data.success) {
        console.log("Payment successful!");

        // Create the appointment
        const responseAppointment = await fetch(API_PATHS.createAppointment, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            DoctorId: DoctorId,
            PatientUsername: PatientUsername,
            Date: Date,
          }),
        });

        // Pay doctor
        const responsePayDoctor = await fetch(API_PATHS.payDoctor, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            DoctorId: DoctorId,
          }),
        });

        setLoading(false);

        toast({
          title: "Payment successful!",
          description: "You booked the appointment successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        onClose();
        try {
          axios
            .get(API_PATHS.getWalletAmount, {
              headers: { Authorization },
            })
            .then((res) => {
              dispatch({ type: "GET_WALLET", payload: res.data.Wallet });
            });
        } catch (error) {
          console.error("Error fetching wallet amount", error);
        }
        // history.push("../makePayment/ThankYou");
      } else {
        console.log("Payment declined. Insufficient funds.");
        setLoading(false);

        return toast({
          title: "Failed Appointment booking",
          description: "Payment declined. Insufficient funds.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error processing wallet payment:", error);
      // Handle errors such as network issues, server errors, etc.
    }
  };

  return (
    <Box textAlign="center" mt="200px">
      <Text fontSize="xl" mb="4">
        {loading
          ? "Attempting Wallet Payment..."
          : "Wallet Payment Confirmation"}
      </Text>
      {loading ? (
        <Spinner size="xl" color="teal.500" thickness="4px" />
      ) : (
        <Button colorScheme="teal" onClick={handleWalletPayment}>
          Confirm Wallet Payment
        </Button>
      )}
      {/* <ToastContainer /> */}
    </Box>
  );
};

export default WalletPayment;
