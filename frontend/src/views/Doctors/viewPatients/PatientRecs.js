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
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { BsPrescription2 } from "react-icons/bs";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
export default function PatientAppointmentsDoc() {
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const searchParams = new URLSearchParams(location.search);
  const [appointments, setAppointments] = useState([]);
  const patientName = searchParams.get("name");
  const [meds, setMeds] = useState([]);
  const [status, setStatus] = useState("");
  const [diagnosis, setDiagnosis] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await fetch(
          `${API_PATHS.getAllAppointmentsPat}?patientUsername=${patientName}`,
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
          <ModalFooter>
            <Button
              id="print-button"
              style={{ marginTop: "20px" }}
              // ...

              onClick={(e) => {
                const doc = new jsPDF();
                //write the prescription details text with css
                let y = 23;
                doc.addImage(logo, 50, 10, 20, 20);

                doc.setTextColor("teal");
                doc.setFontSize(20);
                doc.text("SHEBEEN HEALTH ClINC", 75, y);
                doc.setFont("Arial", "normal"); // Set font family and style
                doc.setTextColor("black");
                doc.setFontSize(16);
                y += 15;
                doc.text("Prescription", 15, y);
                doc.setFontSize(10);
                y += 8;
                doc.text(
                  "Date: " +
                    new Date(selectedPrescription.Date).toLocaleDateString(
                      "en-GB"
                    ),
                  20,
                  y
                );
                y += 8;
                doc.text("Diagnosis: " + selectedPrescription.Diagnosis, 20, y);
                y += 8;
                doc.text("Status: " + selectedPrescription.Status, 20, y);
                y += 8;

                // Table headers
                doc.setFont("Arial", "bold");
                doc.setFontSize(12);
                doc.setTextColor("white");
                doc.setFillColor(0, 128, 128); // Set table header background color to teal
                doc.rect(20, y, 140, 10, "F");
                doc.text("Medicine", 25, y + 8);
                doc.text("Dosage", 75, y + 8);
                doc.text("Description", 100, y + 8);
                y += 18;

                doc.setFont("Arial", "normal");
                doc.setFontSize(12);
                doc.setTextColor("black");

                // Table rows
                selectedPrescription.Medicine.forEach((medicine, index) => {
                  doc.text(medicine.Name, 25, y);
                  doc.text(medicine.Dosage + " mg", 77, y);
                  doc.text(medicine.Description, 105, y);
                  y += 10;
                });

                doc.setFontSize(10);
                doc.setFont("Arial", "normal"); // Set font family and style for doctor name
                doc.text("Doctor Signature ", 150, y);
                y += 8;

                doc.setFont("Arial", "italic"); // Set font family and style for doctor signature
                doc.text(selectedPrescription.DoctorName, 150, y);

                // Add signature icon
                // const signatureIcon = doc.splitTextToSize(FaSignature({ size: 20 }), 20);
                // doc.addImage(signatureIcon, 150, y + 10, 20, 20);

                doc.save("Prescription.pdf");
              }}
            >
              Download
              <DownloadIcon ml={2} />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Grid templateColumns={{ sm: "1fr", xl: "2fr 1fr" }} gap="22px">
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="4"
          boxShadow="md"
          mt="20"
        >
          <Card>
            <Flex direction="column">
              <CardHeader p="12px 5px" mb="12px">
                <Text fontSize="lg" fontWeight="bold">
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
        </Box>
        <Box
          borderWidth="1px"
          borderRadius="sm"
          overflow="hidden"
          p="4"
          boxShadow="md"
          mt="20"
        >
          <Card>
            <CardHeader py="12px">
              <Text fontSize="lg" fontWeight="bold">
                {patientName}'s Health records
              </Text>
            </CardHeader>
            <Flex direction="column" align="flex-start">
              {healthRecords &&
                healthRecords.map((healthRecord, index) => (
                  <VStack spacing={1}>
                    <HStack>
                      <Icon viewBox="0 0 200 200" color="teal.400">
                        <path
                          fill="currentColor"
                          d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                        />
                      </Icon>
                      <button
                        onClick={async () => {
                          const filename = healthRecord.filename;
                          const response = await fetch(
                            API_PATHS.downloadFile + filename,
                            {
                              method: "GET",
                              headers: {
                                Authorization,
                              },
                            }
                          );
                          const file = await response.blob();
                          const fileUrl = URL.createObjectURL(file);

                          const link = document.createElement("a");
                          link.href = fileUrl;
                          link.download = filename;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      >
                        {healthRecord.originalname}
                        <Icon as={DownloadIcon} me="3px" />
                      </button>
                    </HStack>
                    <div>
                      {healthRecord.note && healthRecord.note != "null" && (
                        <p>note: {healthRecord.note}</p>
                      )}
                    </div>
                    {index < healthRecords.length && <hr />}
                  </VStack>
                ))}
            </Flex>
          </Card>
        </Box>
      </Grid>
      {/* <Box pt="80px"></Box> */}
    </>
  );
}
