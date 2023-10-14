import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useParams } from "react-router-dom";
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
  Select,
} from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";

function PatientTable() {
  const { doctorUsername } = useParams();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPatientViewInfo, setSelectedPatientViewInfo] = useState(null);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    patientName: "",
    upcoming: "",
    doctorUsername: "",
  });

  useEffect(() => {
    fetchPatient();
  }, [doctorUsername, filters]);

  const fetchPatient = () => {
    // Construct the URL based on filters and user ID
    let url =
      API_PATHS.viewDoctorPatients + `?DoctorUsername=${doctorUsername}`;
    if (filters.doctorUsername)
      url =
        API_PATHS.viewDoctorPatients +
        `?DoctorUsername=${filters.doctorUsername}`;
    if (filters.patientName) url += `&PatientName=${filters.patientName}`;
    if (filters.upcoming)
      url =
        API_PATHS.viewUpcomingAppointments +
        `?DoctorUsername=${filters.doctorUsername}`;

    axios
      .get(url)
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patient:", error);
      });
  };

  const openModal = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/patient/selectPatient/?id=${id}`
      );
      setSelectedPatient(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const closeModal = () => {
    setSelectedPatient(null);
    setModalOpen(false);
  };

  const openInfoModal = async (patientUsername) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/doctor/viewPatientInfoAndHealthRecords?PatientUsername=${patientUsername}`
      );
      setSelectedPatientViewInfo(response.data);
      setInfoModalOpen(true);
    } catch (error) {
      console.error("Error fetching info and health records:", error);
    }
  };

  const closeInfoModal = () => {
    setSelectedPatientViewInfo(null);
    setInfoModalOpen(false);
  };

  return (
    <Box pt="80px">
      <Formik
        initialValues={filters}
        onSubmit={(values, actions) => {
          setFilters(values); // Update filters state
          fetchPatient();
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form>
            <Field name="doctorUsername">
              {({ field }) => (
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="enter docotr username"
                  />
                </FormControl>
              )}
            </Field>
            <Field name="patientName">
              {({ field }) => (
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="enter Patient name"
                  />
                </FormControl>
              )}
            </Field>
            <Field name="upcoming">
              {({ field }) => (
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="filter for upcoming appointments?"
                  />
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
          {patients.map((patient) => (
            <Tr key={patient._id} onClick={() => openModal(patient._id)}>
              <Td>{patient && patient.Name ? patient.Name : "N/A"}</Td>
              <Td>
                {patient && patient.MobileNum ? patient.MobileNum : "N/A"}
              </Td>
              <Td>
                {patient && patient.DateOfBirth ? patient.DateOfBirth : "N/A"}
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
              <p>Date of birth: {selectedPatient.DateOfBirth}</p>
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

export default PatientTable;
