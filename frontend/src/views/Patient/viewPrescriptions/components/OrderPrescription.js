import { Button, useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import { IoAddCircleSharp } from "react-icons/io5";

import { usePrescriptionContext } from "hooks/usePrescriptionContext";

export default function OrderPrescription({ appointmentId }) {
  const { user } = useAuthContext();
  const toast = useToast();
  const Authorization = `Bearer ${user.token}`;
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_PATHS.addToCart, {
        method: "POST",
        headers: {
          Authorization,
        },
        body: JSON.stringify({ appointmentId }),
      });
      console.log("Response", response.status);
      if (response.ok) {
        toast({
          title: "prescription added to cart",
          description:
            "The Medicines in this prescription have been added to your pharmacy cart.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error ",
          description:
            "We've encountered an error while adding this prescription to your cart.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Button
        colorScheme="teal"
        variant="solid"
        rightIcon={<IoAddCircleSharp />}
        onClick={handleSubmit}
      >
        Add To Pharmacy Cart
      </Button>
    </>
  );
}
