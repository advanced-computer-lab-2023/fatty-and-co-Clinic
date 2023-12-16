import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import { useDoctorAppointmentsContext } from "hooks/useDoctorAppointmentsContext";

export default function CreateFollowUpButton({ patientUsername }) {
  const { appointments, dispatch } = useDoctorAppointmentsContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState("");

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  console.log(user);

  const handleDate = (event) => {
    setDate(event.target.value);
  };
  const toast = useToast();
  const handleSubmit = () => {
    const url = API_PATHS.followupAppointment;
    axios
      .post(url, null, {
        params: { date: date, PatientUsername: patientUsername },
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
        dispatch({ type: "ADD_APPOINTMENT", payload: response.data });
      })
      .catch((err) =>
        toast({
          title: "Error ",
          description:
            "We've encountered an error while creating your follow up appointment .",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      );
  };

  return (
    <>
      <Button colorScheme="teal" onClick={() => setIsModalOpen(true)}>
        Book Follow Up
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>create follow up appointment</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Input
              bg="white"
              type="datetime-local"
              placeholder="Choose date"
              onChange={handleDate}
            />
          </ModalBody>
          <ModalFooter>
            {" "}
            <Button onClick={handleSubmit} marginLeft={4}>
              Submit
            </Button>
            <Button
              colorScheme="blue"
              marginLeft={4}
              mr={4}
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
