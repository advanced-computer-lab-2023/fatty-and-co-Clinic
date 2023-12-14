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

import { usePrescriptionContext } from "hooks/usePrescriptionContext";

export default function AddPrescriptionButton({ customkey, setHasPrescription }) {
  const { prescriptions, dispatch } = usePrescriptionContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  console.log(user);

  const handleDiagnosis = (event) => {
    setDiagnosis(event.target.value);
  };
  const handleDescription = (event)=>{
    setDescription(event.target.value);
  }
  const handleMedicine = (event) => {
    setMedicine(event.target.value);
  };
  const handleDosage = (event) => {
    setDosage(event.target.value);
  };
  const toast = useToast();
  const handleSubmit = () => {
    
    const meds = {
      Name: medicine,
      Dosage: dosage,
      Description: description,
    };
    const url = API_PATHS.addPrescription;
    axios
      .post(url, null, {
        params: {
          appointmentId: customkey,
          medicines: meds,
          diagnosis: diagnosis,
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
        setHasPrescription (true);
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

  return (
    <>
      <Button colorScheme="blue" onClick={() => setIsModalOpen(true)}>
        Add prescription
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add prescription</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text mb="8px">medicine: </Text>
            <Input
              medicine={medicine}
              bg="white"
              placeholder="Enter medicine"
              onChange={handleMedicine}
            />
            <Text mb="8px">Dosage:</Text>
            <Input
              dosage={dosage}
              bg="white"
              placeholder="Enter dosage"
              onChange={handleDosage}
            />
            <Text mb="8px">description: </Text>
            <Input
              description={description}
              bg="white"
              placeholder="Enter medicine"
              onChange={handleDescription}
            />
            <Text mb="8px">Diagnosis: {diagnosis}</Text>
            <Input
              diagnosis={diagnosis}
              bg="white"
              placeholder="Enter diagnosis"
              onChange={handleDiagnosis}
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
