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
} from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";

export function PatientTable() {
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPatientViewInfo, setSelectedPatientViewInfo] = useState(null);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    patientName: "",
    upcoming: false,
  });

  useEffect(() => {
    fetchPatient();
  }, [filters]);

  const fetchPatient = () => {
    // Construct the URL based on filters and user ID
    let url = filters.upcoming
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
              <Td>{patient && patient.Name ? patient.Name : "N/A"}</Td>
              <Td>
                {patient && patient.MobileNum ? patient.MobileNum : "N/A"}
              </Td>
              <Td>
                {patient && patient.DateOfBirth
                  ? new Date(patient.DateOfBirth).toLocaleDateString("en-GB")
                  : "N/A"}
              </Td>
              <Td>{patient && patient.Gender ? patient.Gender : "N/A"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {selectedPatient && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Patient Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>patient name: {selectedPatient.Name}</p>
              <p>Mobile Number: {selectedPatient.MobileNum}</p>
              <p>
                Date of birth:{" "}
                {new Date(selectedPatient.DateOfBirth).toLocaleDateString(
                  "en-GB"
                )}
              </p>
              <p>Gender:{selectedPatient.Gender}</p>
              <p>Package Name:{selectedPatient.PackageName}</p>
              <p>
                Emergency Contact Name:
                {selectedPatient.EmergencyContact.FullName}
              </p>
              <p>
                Emergency Contact phone number:
                {selectedPatient.EmergencyContact.PhoneNumber}
              </p>
              <Button
                onClick={() => {
                  openInfoModal(selectedPatient.Username);
                }}
              >
                View Information and Health records.
              </Button>
            </ModalBody>
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
                Health Records:
              </Heading>
              <p>MyHistory.pdf</p>
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
