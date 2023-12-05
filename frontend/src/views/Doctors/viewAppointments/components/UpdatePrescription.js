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
import AddMedButton from "views/Doctors/viewAppointments/components/addMedButton";
import { AddIcon } from "@chakra-ui/icons";

export default function UpdatePrescription({ customkey }) {
  const { appointments, dispatch } = useDoctorAppointmentsContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState("");

  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [addMed, setaddMed] = useState(false);

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  console.log(user);

  const handleMedicine = (event) => {
    setMedicine(event.target.value);
  };
  const handleDosage = (event) => {
    setDosage(event.target.value);
  };
  const toast = useToast();
  const handleSubmit = () => {
    const url = API_PATHS.addMedToPrescription;
    axios
      .post(url, null, {
        params: {
          appointmentId: customkey,
          medicine: medicine,
          dosage: dosage,
        },
        headers: { Authorization },
      })
      .then((response) => {
        toast({
          title: "prescription added",
          description:
            "We've added your prescription to the appointment selected.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setaddMed(true);
      })
      .catch((err) =>
        toast({
          title: "Error ",
          description:
            "We've encountered an error while adding this prescription .",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      );
  };
  const handleAddMed = () => {
    setaddMed(true);
  };
  const handleCloseModal = () => {
    setaddMed(false);
    // ...
    setIsModalOpen(false);
  };
  return (
    <>
      <Button colorScheme="blue" onClick={() => setIsModalOpen(true)}>
        Update prescription
      </Button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update prescription</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {!addMed && (
              <Button
                leftIcon={<AddIcon />}
                variant="link"
                colorScheme="blue"
                onClick={handleAddMed}
                mt="4"
              >
                Add medicine to prescription
              </Button>
            )}
            {addMed && (
              <div>
                <Text mb="8px">medicine: {medicine}</Text>
                <Input
                  medicine={medicine}
                  bg="white"
                  placeholder="Enter medicine"
                  onChange={handleMedicine}
                />
                <Text mb="8px">Dosage: {dosage}</Text>
                <Input
                  dosage={dosage}
                  bg="white"
                  placeholder="Enter dosage"
                  onChange={handleDosage}
                />
                <Button onClick={handleSubmit} marginLeft={4}>
                  Add
                </Button>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            {" "}
            <Button
              colorScheme="blue"
              marginLeft={4}
              mr={4}
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
