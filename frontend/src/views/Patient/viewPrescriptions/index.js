import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import { useAuthContext } from "hooks/useAuthContext";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import logo from "assets/img/ShebeenElkom.png";
import {
  Box,
  Grid,
  Input,
  Flex,
  FormControl,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  useColorModeValue,
  Select,
  Text,
} from "@chakra-ui/react";

function PrescriptionTable() {
  const { patientUsername } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [doctorNames, setDoctorNames] = useState(new Set());

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const textColor = useColorModeValue("gray.700", "white");

  useEffect(() => {
    fetchUniqueDoctorNames();
    fetchPrescriptions();
  }, [patientUsername]);

  const fetchUniqueDoctorNames = () => {
    // Fetch all prescriptions to get unique doctor names

    axios
      .get(API_PATHS.viewPrescriptions)
      .then((response) => {
        const uniqueNames = new Set();
        response.data.forEach((prescription) => {
          uniqueNames.add(prescription.DoctorName);
        });
        setDoctorNames(uniqueNames);
      })
      .catch((error) => {
        console.error("Error fetching unique doctor names:", error);
      });
  };

  const fetchPrescriptions = () => {
    // Construct the URL based on filters and patient username
    let url = API_PATHS.viewPrescriptions;

    if (doctorName) url += `&DoctorName=${doctorName}`;
    if (date) url += `&Date=${date}`;
    if (status) url += `&Status=${status}`;

    axios
      .get(url, {
        headers: {
          Authorization: Authorization,
        },
      })
      .then((response) => {
        setPrescriptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching prescriptions:", error);
      });
  };

  const openModal = async (prescriptionId) => {
    try {
      const url = API_PATHS.getPrescription + `?id=${prescriptionId}`;
      console.log(url);
      const response = await axios.get(url, {
        headers: {
          Authorization: Authorization,
        },
      });
      setSelectedPrescription(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching prescription data:", error);
    }
  };

  const closeModal = () => {
    setSelectedPrescription(null);
    setModalOpen(false);
  };

  const handleDoctorNameChange = (event) => {
    setDoctorName(event.target.value);
  };

  const handleStatusChange = (event) => {
    console.log(event);
    setStatus(event.target.value);
  };
  const handleDateChange = (event) => {
    console.log(event);
    setDate(event.target.value);
  };

  return (
    <Box pt="80px">
      <Flex
        direction="column"
        alignItems="flex-start"
        pt="50px"
        justifyContent="flex-start"
      >
        <Flex direction="row" alignItems="flex-start">
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <FormControl>
              <Select
                bg="white"
                placeholder="Select Doctor"
                value={doctorName}
                onChange={handleDoctorNameChange}
              >
                {Array.from(doctorNames).map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <Input
                bg="white"
                type="date"
                placeholder="Filter by Date"
                onChange={handleDateChange}
              />
            </FormControl>
            <FormControl id="status" w="100%" h="10">
              <Select
                bg="white"
                placeholder="Select status"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="Filled">Filled</option>
                <option value="Unfilled">Unfilled</option>
              </Select>
            </FormControl>
            <Button w="100%" h="10" onClick={fetchPrescriptions} marginLeft={4}>
              Search
            </Button>
          </Grid>
        </Flex>
        <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader p="6px 0px 22px 0px">
            <Flex direction="column">
              <Text
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
                pb=".5rem"
              >
                Prescriptions
              </Text>
            </Flex>
          </CardHeader>
          <CardBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Doctor Name</Th>
                  <Th>Date</Th>
                  <Th>Diagnosis</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {prescriptions.map((prescription) => (
                  <Tr
                    key={prescription._id}
                    onClick={() => openModal(prescription._id)}
                  >
                    <Td>
                      {prescription && prescription.DoctorName
                        ? prescription.DoctorName
                        : "N/A"}
                    </Td>
                    <Td>
                      {prescription && prescription.Date
                        ?  new Date(prescription.Date).toLocaleDateString("en-GB")
                        : "N/A"}
                    </Td>
                    <Td>
                      {prescription && prescription.Diagnosis
                        ? prescription.Diagnosis
                        : "N/A"}
                    </Td>
                    <Td>
                      {prescription && prescription.Status
                        ? prescription.Status
                        : "N/A"}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </Flex>
      {selectedPrescription && (
        <Modal
          id={"selectedPrescription._id"}
          isOpen={isModalOpen}
          onClose={closeModal}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Prescription Details</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <p>Doctor Name: {selectedPrescription.DoctorName}</p>
              <p>Date: {new Date(selectedPrescription.Date).toLocaleDateString("en-GB")}</p>
              <p>Diagnosis: {selectedPrescription.Diagnosis}</p>
              <p>Status: {selectedPrescription.Status}</p>
              <p>Medicines:</p>
              <ul style={{ listStyleType: "lower-alpha", marginLeft: "40px" }}>
                {selectedPrescription.Medicine.map((medicine, index) => (
                  <li key={index}>{medicine.Name}</li>
                ))}
              </ul>
              <Button
                id="print-button"
                style={{ marginTop: "20px" }}
                onClick={(e) => {
                  const doc = new jsPdf();
                  //write the prescription details text with css
                  let y = 23;
                  doc.addImage(logo, 50, 10, 20, 20);
                  doc.setTextColor("teal");
                  doc.setFontSize(20);
                  doc.text("SHEBEEN HEALTH ClINC", 75, y);
                  doc.setTextColor("black");
                  doc.setFontSize(16);
                  y += 15;
                  doc.text("Prescription", 15, y);
                  doc.setFontSize(10);
                  y += 8;
                  // doc.text(
                  //   "Patient Name: " + ,
                  //   20,
                  //   y
                  // );
                  // y += 8;
                  doc.text("Date: " + new Date(selectedPrescription.Date).toLocaleDateString("en-GB"), 20, y);
                  y += 8;
                  doc.text(
                    "Diagnosis: " + selectedPrescription.Diagnosis,
                    20,
                    y
                  );
                  y += 8;
                  doc.text("Status: " + selectedPrescription.Status, 20, y);
                  y += 8;
                  doc.text("Medicines: ", 20, y);
                  doc.setFontSize(12);
                  y += 8;
                  //write the medicines list with css
                  selectedPrescription.Medicine.forEach((medicine, index) => {
                    doc.text(medicine.Name, 25, y);
                    y += 10;
                  });
                  doc.setFontSize(10);
                  doc.text(
                    "Doctor Signature " ,
                    150,
                    y
                  );
                  y += 8;
                  doc.text(selectedPrescription.DoctorName, 150, y);

                  doc.save("Prescription.pdf");
                }}
              >
                Print
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}

export default PrescriptionTable;
