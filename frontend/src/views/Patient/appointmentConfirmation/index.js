import React, { useState, useEffect } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { AddIcon } from "@chakra-ui/icons";
import { AiFillCreditCard } from "react-icons/ai";
import MakePayment from "views/Patient/makePayment";
import react from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "views/Patient/makePayment/components/PaymentForm";
import { useHistory, useLocation } from "react-router-dom";
import {
  Flex,
  Button,
  Box,
  Text,
  Input,
  Textarea,
  Collapse,
  useDisclosure,
  UseDisclosureProps,
  Select,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Heading,
} from "@chakra-ui/react";

function AppointmentConfirmation() {
  const [selectedPayment, setSelectedPayment] = useState("");
  const history = useHistory();

  const location = useLocation();
  const { state } = location;

  console.log("this state");
  console.log(state);

  const handleCheckout = () => {
    console.log("Checkout with payment method:", selectedPayment);

    if (selectedPayment === "Credit Card") {
      history.push("./payment", state);
    } else if (selectedPayment === "Wallet") {
      console.log("hello wallet");
      history.push("./walletPayment", state);
    }
  };

  return (
    <Box mt="80px" textAlign="center">
      <Heading mb="4">Doctor's Appointment Confirmation</Heading>

      <Flex
        direction="column"
        w="300px"
        background="transparent"
        borderRadius="15px"
        p="20px"
        mx="auto"
        boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
      >
        <FormControl mb="4">
          <FormLabel fontSize="sm" fontWeight="normal">
            Select Payment Method
          </FormLabel>
          <RadioGroup
            id="paymentMethod"
            name="paymentMethod"
            required
            value={selectedPayment}
            onChange={(value) => setSelectedPayment(value)}
          >
            <Radio value="Wallet">Wallet</Radio>
            <Radio value="Credit Card">Credit Card</Radio>
          </RadioGroup>
        </FormControl>

        <Button colorScheme="teal" onClick={handleCheckout}>
          Checkout
        </Button>
      </Flex>
    </Box>
  );
}

export default AppointmentConfirmation;
