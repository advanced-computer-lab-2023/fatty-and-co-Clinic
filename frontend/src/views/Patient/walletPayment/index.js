import React, { useState, useEffect } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import MakePayment from "views/Patient/makePayment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "views/Patient/makePayment/components/PaymentForm";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button, Box, Text, Spinner } from "@chakra-ui/react";

const WalletPayment = ({ Amount, DoctorId, PatientUsername, Date }) => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleWalletPayment = async () => {
    try {
      // Assuming you have an API endpoint for wallet payment verification
      const response = await axios.post(
        API_PATHS.walletPayment,
        {
          amount: Amount,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.data.success) {
        console.log("Payment successful!");
        //create the appointment
        const response = await fetch(API_PATHS.addAppointment, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            DoctorId: DoctorId,
            PatientUsername: PatientUsername,
            Status: "Pending",
            Date: Date,
          }),
        });
        //paydoctor
        const response2 = await fetch(API_PATHS.payDoctor, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            DoctorId: DoctorId,
            PatientUsername: PatientUsername,
            Amount: Amount,
          }),
        });
        setLoading(false);
        toast.success("Payment successful!");
        history.push("../makePayment/ThankYou");
      } else {
        console.log("Payment declined. Insufficient funds.");
        setLoading(false);
        toast.error("Insufficient funds. Please add funds to your wallet.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error processing wallet payment:", error);
      // Handle errors such as network issues, server errors, etc.
    }
  };

  return (
    <Box textAlign="center">
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
      <ToastContainer />
    </Box>
  );
};

export default WalletPayment;
