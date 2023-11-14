import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Input,
  Stack,
  useToast,
  Select,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import { API_PATHS } from "API/api_paths";
import { useLocation } from "react-router-dom";
import ThankYouCard from "../ThankYou";
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#fff" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const PaymentForm = ({
  Amount,
  Description,
  PackageName,
  NationalId,
  DoctorId,
  FamMemName,
  Date,
}) => {
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  // useEffect(() => {
  //   if (success) {
  //     const redirectTimeout = setTimeout(() => {
  //       return <ThankYouCard />;
  //     }, 3000);

  //     return () => clearTimeout(redirectTimeout);
  //   }
  // }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;

        const response = await axios.post(
          API_PATHS.cardPayment,
          {
            id,
            amount: Amount * 100,
            description: Description,
          },
          { headers: { Authorization } }
        );
        if (response.data.success) {
          if (Description === "Doctor's appointment") {
            const response = await fetch(API_PATHS.createAppointment, {
              method: "POST",
              headers: {
                Authorization,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                DoctorId,
                Date,
                FamMemName,
              }),
            });
            const response2 = await fetch(API_PATHS.payDoctor, {
              method: "POST",
              headers: {
                Authorization,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                DoctorId,
                FamMemName,
              }),
            });
          }
          console.log("Successful payment");
          setSuccess(true);
        }
        if (PackageName && !NationalId) {
          const response = await fetch(API_PATHS.updateMySub, {
            method: "PATCH",
            headers: {
              Authorization,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ PackageName }),
          });
          const errorData = await response.json();
          if (response.ok) {
            console.log("Successful payment");
            setSuccess(true);
          } else {
            toast({
              title: "Failed to pay & subscribe!",
              description: errorData.error,
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            return;
          }
        }
        // if (response.data.success) {
        // console.log("Subscription payment completed successfully!");
        // setSuccess(true);}
        // else {
        //   console.log(error.message);
        // }
        else if (PackageName && NationalId) {
          const response = await fetch(API_PATHS.updateFamSub, {
            method: "PATCH",
            headers: {
              Authorization,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ PackageName, NationalId }),
          });
          const errorData = await response.json();
          if (response.ok) {
            console.log("Successful payment");
            setSuccess(true);
          } else {
            toast({
              title: "Failed to pay & subscribe!",
              description: errorData.error,
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            return;
          }
        }
        // if (response.data.success) {
        // console.log("Subscription payment completed for family member successfully!");
        // setSuccess(true);}
        // else {
        //   console.log(error.message);
        // }
        else {
          console.log(error.message);
        }
      } catch {
        error;
      }
    }
  };

  const formContainerStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    minHeight: "60vh",
    margin: "auto",
    marginTop: "20vh",
    padding: "20px",
    border: "1px solid #ddd",
    backgroundColor: "#4fd1c5",
    backgroundImage: "url('../../../assets/img/people-image.png')",
    backgroundSize: "cover",
  };

  const cardElementStyle = {
    width: "100%",
    height: "40px",
    padding: "15px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9", // Set the background color for the data boxes
  };

  const buttonStyle = {
    width: "80%",
    marginTop: "auto",
    position: "absolute",
    bottom: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    color: "#000",
    backgroundColor: "#fff",
    border: "none",
    padding: "10px",
    cursor: "pointer",
  };

  return (
    <div style={formContainerStyle}>
      {!success ? (
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} style={cardElementStyle} />
            </div>
          </fieldset>
          <button type="submit" style={buttonStyle}>
            Pay
          </button>
        </form>
      ) : (
        <div>
          <h2 style={{ color: "#fff" }}>Successful Payment</h2>
        </div>
      )}
      {/* <Input type="number" onChange={(e) => setAmount(e.target.value)}></Input> */}
    </div>
  );
};

export default PaymentForm;
