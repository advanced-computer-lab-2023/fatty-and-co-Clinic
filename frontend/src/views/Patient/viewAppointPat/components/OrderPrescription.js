import {
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";

import { usePrescriptionContext } from "hooks/usePrescriptionContext";

export default function OrderPrescription({
  customkey,
  setHasPrescription,
}) {
  const {placeOrder} = usePrescriptionContext();
  const { user } = useAuthContext();
    const toast = useToast();
  const Authorization = `Bearer ${user.token}`;
  console.log(user);


const handleOrder = async () => {
  try{
    await placeOrder(customkey, Authorization);
    toast({
      title: "prescription added to cart",
      description:
        "The Medicines in this prescription have been added to your pharmacy cart.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }
  catch(err){
    toast({
      title: "Error ",
      description:
        "We've encountered an error while adding this prescription to your cart.",
      status: "error",
      duration: 9000,
      isClosable: true,
    })
  }};
  return (
    <>
      <Button colorScheme="blue" onClick={handleOrder}>
        Order Prescription
      </Button>
    </>
  );
}
