import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Input,
  useDisclosure,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { usePackageContext } from "../hooks/usePackageContext";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";

function PackageForm() {
  const { dispatch } = usePackageContext();
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Session_Discount, setSession_Discount] = useState("");
  const [Medicine_Discount, setMedicine_Discount] = useState("");
  const [Family_Discount, setFamily_Discount] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  //   const handleSubmit =

  const textColor = useColorModeValue("gray.700", "white");
  const toast = useToast();
  return (
     <Text>
     
    </Text>
   );
}

export default PackageForm;
