import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import { API_PATHS } from "API/api_paths";
import { Input } from "@chakra-ui/react";

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

const PaymentForm = ({ amount }) => {
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

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
            amount: amount * 100,
          },
          { headers: { Authorization } }
        );
        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
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
