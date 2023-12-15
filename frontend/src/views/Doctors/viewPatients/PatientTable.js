import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Heading,
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
  Input,
  Checkbox,
  Icon,
  VStack,
  Flex,
  HStack,
  Text,
  ModalFooter,
  
  
} from "@chakra-ui/react";
import {
  DownloadIcon,
  InfoOutlineIcon,
  PhoneIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import HealthRecordForm from "./components/HealthRecordForm";
import { useHistory } from "react-router-dom";

export function PatientTable() {
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPatientViewInfo, setSelectedPatientViewInfo] = useState(null);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [healthRecords, setHealthRecords] = useState(null);
  const history = useHistory();

  const [filters, setFilters] = useState({
    patientName: "",
    upcoming: false,
  });

  useEffect(() => {
    fetchPatient();
  }, [filters]);

  const fetchPatient = () => {
    // Construct the URL based on filters and user ID
    const url = filters.upcoming
      ? API_PATHS.viewUpcomingAppointments
      : API_PATHS.viewDoctorPatients;

    const params = {};
    if (filters.patientName) params.PatientName = filters.patientName;
    console.log(params);
    axios
      .get(url, { params, headers: { Authorization } })
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patient:", error);
      });
  };

  const openModal = async (id) => {
    try {
      const response = await axios.get(API_PATHS.getPatient, {
        params: { id },
        headers: { Authorization },
      });
      setSelectedPatient(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching patient data:", error.message);
    }
  };

  const closeModal = () => {
    setSelectedPatient(null);
    setModalOpen(false);
  };

  const openInfoModal = async (patientUsername) => {
    try {
      const response = await axios.get(API_PATHS.viewInfoAndHealthRecords, {
        params: {
          PatientUsername: patientUsername,
        },
        headers: { Authorization },
      });
      setSelectedPatientViewInfo(response.data);
      setInfoModalOpen(true);
    } catch (error) {
      console.error("Error fetching info and health records:", error);
    }
    const fetchHealthRecords = async () => {
      const response = await fetch(
        API_PATHS.getMedicalHistory + patientUsername,
        {
          headers: {
            Authorization,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setHealthRecords(data.MedicalHistory);
        // dispatch({ type: "SET_PACKAGES", payload: data });
      } else {
        console.log(data);
      }
    };
    fetchHealthRecords();
  };

      const handleViewRecords = async () => {
          const redirectUrl = `/doctor/patientRecords/?name=${selectedPatient.Username}`;
          history.replace(redirectUrl);
      };

  const closeInfoModal = () => {
    setSelectedPatientViewInfo(null);
    setInfoModalOpen(false);
    setModalOpen(false);
  };

  return (
    <Box pt="80px">
      <Formik
        initialValues={filters}
        onSubmit={(values, actions) => {
          setFilters(values); // Update filters state
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form>
            <Field name="patientName">
              {({ field }) => (
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter Patient name"
                  />
                </FormControl>
              )}
            </Field>
            <Field name="upcoming" type="checkbox">
              {({ field }) => (
                <FormControl>
                  <Checkbox
                    {...field}
                    onChange={(e) => {
                      setFilters({ ...filters, upcoming: e.target.checked });
                    }}
                  >
                    Filter for upcoming appointments?
                  </Checkbox>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              search
            </Button>
          </Form>
        )}
      </Formik>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Patient name</Th>
            <Th>Mobile Number</Th>
            <Th>Date of birth</Th>
            <Th>Gender</Th>
          </Tr>
        </Thead>
        <Tbody>
          {patients?.map((patient) => (
            <Tr
              _hover={{ backgroundColor: "gray.200" }}
              cursor="pointer"
              key={patient._id}
              onClick={() => openModal(patient._id)}
            >
              <Td fontWeight="semibold">
                {patient && patient.Name ? patient.Name : "N/A"}
              </Td>
              <Td fontWeight="semibold">
                {patient && patient.MobileNum ? patient.MobileNum : "N/A"}
              </Td>
              <Td fontWeight="semibold">
                {patient && patient.DateOfBirth
                  ? new Date(patient.DateOfBirth).toLocaleDateString("en-GB")
                  : "N/A"}
              </Td>
              <Td fontWeight="semibold">
                {patient && patient.Gender ? patient.Gender : "N/A"}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {selectedPatient && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {" "}
              <HStack spacing="2">
                <InfoOutlineIcon color="teal.500" />
                <Text>{selectedPatient.Name}</Text>
                <Text>{selectedPatient.Gender}</Text>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing="2" align="stretch">
                <HStack spacing="2">
                  <PhoneIcon color="teal.500" />
                  <Text>{selectedPatient.MobileNum}</Text>
                </HStack>
                <HStack spacing="2">
                  <span
                    role="img"
                    aria-label="gift"
                    style={{ fontSize: "20px" }}
                  >
                    🎁
                  </span>
                  <Text>
                    {" "}
                    {new Date(selectedPatient.DateOfBirth).toLocaleDateString(
                      "en-GB"
                    )}
                  </Text>
                </HStack>
                <hr></hr>
                {/* <p>Package Name:{selectedPatient.PackageName}</p> */}
                <HStack spacing="2">
                  <WarningTwoIcon color="teal.500" />
                  <Text fontWeight="semibold">Emergency contact: </Text>
                </HStack>
                <HStack spacing="2">
                  <InfoOutlineIcon color="teal.500" />
                  <Text> {selectedPatient.EmergencyContact.FullName}</Text>
                </HStack>
                <HStack spacing="2">
                  <PhoneIcon color="teal.500" />
                  <Text>{selectedPatient.EmergencyContact.PhoneNumber}</Text>
                </HStack>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleViewRecords}>
                View Information and Health records.
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {selectedPatientViewInfo && (
        <Modal isOpen={isInfoModalOpen} onClose={closeInfoModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Patient Information and Health records</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Heading as="h5" size="sm">
                Health Records :
              </Heading>
              {/* start of health records  TODO: make it a component */}
              <Flex
                direction={{ sm: "column", md: "row" }}
                align="flex-start"
                p={{ md: "5px" }}
              >
                <Flex direction="column" align="flex-start">
                  {healthRecords &&
                    healthRecords.map((healthRecord, index) => (
                      <VStack spacing={1}>
                        <button
                          onClick={async () => {
                            const { filename } = healthRecord;
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
                        <div>
                          {healthRecord.note && healthRecord.note != "null" && (
                            <p>note: {healthRecord.note}</p>
                          )}
                        </div>
                        {index < healthRecords.length && <hr />}
                      </VStack>
                    ))}
                </Flex>
                <Flex direction="column" align="flex-start">
                  <HealthRecordForm
                    PatientUsername={selectedPatient.Username}
                  />
                </Flex>
              </Flex>
              {/* end of health records */}
              <hr />
              <Heading as="h5" size="sm">
                Appointments:
              </Heading>
              <ul style={{ listStyleType: "decimal" }}>
                {selectedPatientViewInfo.appointments.map(
                  (appointment, index) => (
                    <li key={index}>
                      <p>Reserved on: {appointment.createdAt}</p>
                      <p>Date: {appointment.Date}</p>
                      <p>Status: {appointment.Status}</p>
                      {index < selectedPatientViewInfo.appointments.length && (
                        <hr />
                      )}
                    </li>
                  )
                )}
              </ul>

              <Heading as="h5" size="sm">
                Prescriptions:
              </Heading>
              <ul style={{ listStyleType: "decimal" }}>
                {selectedPatientViewInfo.prescriptions.map(
                  (prescription, i) => (
                    <li key={i}>
                      <p>Date: {prescription.Date}</p>
                      <p>Diagnosis: {prescription.Diagnosis}</p>
                      <p>Status: {prescription.Status}</p>
                      <p>Medicine:</p>
                      <ol
                        style={{
                          listStyleType: "lower-alpha",
                          marginLeft: "40px",
                        }}
                      >
                        {prescription.Medicine.map((medicine, j) => (
                          <li key={j}>{medicine.Name}</li>
                        ))}
                      </ol>
                      {i < selectedPatientViewInfo.prescriptions.length && (
                        <hr />
                      )}
                    </li>
                  )
                )}
              </ul>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}
