import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  IconButton,
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
  Box,
  Stack,
  HStack,
  VStack,
  StackDivider,
  Icon,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Th,
  Tbody,
  Grid,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { BsPrescription2 } from "react-icons/bs";
import { API_PATHS } from "API/api_paths";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
export default function PatientAppointmentsDoc() {
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const searchParams = new URLSearchParams(location.search);
  const [appointments, setAppointments] = useState([]);
  const patientUserName = searchParams.get("username");
  const patientName = searchParams.get("name");
  const [meds, setMeds] = useState([]);
  const [status, setStatus] = useState("");
  const [diagnosis, setDiagnosis] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await fetch(
          `${API_PATHS.getAllAppointmentsPat}?patientUsername=${patientUserName}`,
          {
            headers: {
              Authorization: Authorization,
              // Other headers if needed
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          setAppointments(result);
        } else {
          console.error("Error getting appointments:", response.statusText);
        }
      } catch (error) {
        console.error("Error getting appointments:", error.message);
      }
    };

    // Check prescription status when the component mounts
    getAppointments();
  }, []);
  const handleCloseModal = () => {
    // ...
    setIsModalOpen(false);
  };
  const fetchPrescription = async (appID) => {
    try {
      const response = await fetch(
        `${API_PATHS.getPrescriptionAPP}?appointmentId=${appID}`,
        {
          headers: {
            Authorization: Authorization,
            // Other headers if needed
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setMeds(result.prescription.Medicine);
        setDiagnosis(result.prescription.Diagnosis);
        setStatus(result.prescription.Status);
        setIsModalOpen(true);
      } else {
        console.error("No prescription found:", response.statusText);
      }
    } catch (error) {
      console.error("Error checking prescription status:", error.message);
    }
  };
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>
            <VStack>
              <Text>Diagnosis: {diagnosis}</Text>
              <Text>Status: {status}</Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text style={{ marginBottom: "8px" }}>Medicines:</Text>
            <ul className="myList" style={{ marginLeft: "40px" }}>
              {meds.map((med, index) => (
                <li key={index} style={{ marginBottom: "8px" }}>
                  <HStack spacing="24px">
                    <span className="medicine-name">{med.Name}</span>
                    <span className="medicine-dosage">
                      {", " + med.Dosage + " mg"}
                    </span>{" "}
                    <HStack>
                      <InfoOutlineIcon color="teal.500" />
                      <Text fontWeight="semibold">{med.Description}</Text>
                    </HStack>
                  </HStack>
                </li>
              ))}
            </ul>
            <style>
              {
                //css for the prescription details
                `
                  .myList li .medicine-name {
                    font-weight: bold;
                    color: #2c3e50;
                  }
                  
                  .myList li .medicine-dosage {
                    font-style: italic;
                    color: #7f8c8d;
                  }
                  `
              }
            </style>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Grid templateColumns={{ sm: "1fr", xl: "repeat(2, 1fr)" }} gap="22px">
        <Card my={{ lg: "24px" }} me={{ lg: "24px" }}>
          <Flex direction="column">
            <CardHeader py="12px">
              <Text  fontSize="lg" fontWeight="bold">
                {patientName}'s Appointments
              </Text>
            </CardHeader>
            <CardBody>
              <Flex direction="column" w="100%">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Doctor name</Th>
                      <Th>Status</Th>
                      <Th>Date</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {appointments.map((appointment, index) => (
                      <Tr>
                        <Td minWidth={{ sm: "100px" }} fontWeight="semibold">
                          {appointment.DoctorName}
                        </Td>
                        <Td fontWeight="semibold">{appointment.Status}</Td>
                        <Td minWidth={{ sm: "90px" }} fontWeight="semibold">
                          {appointment.Date}
                        </Td>
                        <Td minWidth={{ sm: "100px" }}>
                          <Button
                            rightIcon={<BsPrescription2 />}
                            bg="teal.400"
                            color="white"
                            onClick={() => fetchPrescription(appointment._id)}
                          >
                            View prescription
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Flex>
            </CardBody>
          </Flex>
        </Card>
        <Card></Card>
      </Grid>
      {/* <Box pt="80px"></Box> */}
    </>
  );
}
