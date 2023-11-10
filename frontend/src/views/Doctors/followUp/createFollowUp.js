import React, { useEffect, useState } from "react";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import {
  Flex,
  Button,
  Box,
  Input,
  Text,
  Select,
  useToast,
} from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useParams } from "react-router-dom";
import AppointmentsTable from "./components/AppointmentsTable";
import { useAuthContext } from "hooks/useAuthContext";

export function createFollowUp() {
  const [date, setDate] = useState("");

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const handleDate = (event) => {
    setDate(event.target.value);
  };
  const handleSubmit = () => {
    const toast = useToast();
    const url = API_PATHS.followupAppointment;
    axios
      .post(url, {
        params: { date, patientUsername },
        headers: { Authorization },
      })
      .then((response) => {
        toast({
          title: "Follow up appointment created",
          description:
            "We've created your the follow up appointment for the selected patient.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err) =>
        toast({
          title: "Error",
          description: "Error while creating your appointment.",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      );
  };

  return (
    <Flex>
      <Input
        bg="white"
        type="datetime-local"
        placeholder="Choose date"
        onChange={handleDate}
      />
      <Button onClick={handleSubmit} marginLeft={4}>
        Submit
      </Button>
    </Flex>
  );
}
