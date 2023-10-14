import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import {
    Box,
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
} from '@chakra-ui/react';

function PatientTable() {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    

    const [filters, setFilters] = useState({
        
        patientName: '',
        upcoming: '',
        doctorUsername: ''
    });
    const doctorUsername = "ikwvdppyyh252";

    useEffect(() => {
        fetchPatient();
    }, [doctorUsername, filters]);

    const fetchPatient = () => {
        // Construct the URL based on filters and user ID
        let url = `http://localhost:8000/appointment/searchpatient/?DoctorUsername=${doctorUsername}`;
        if (filters.doctorUsername) url = `http://localhost:8000/appointment/searchpatient/?DoctorUsername=${filters.doctorUsername}`;
        if (filters.patientName) url += `&PatientName=${filters.patientName}`;
        if (filters.upcoming) url = `http://localhost:8000/appointment/upcoming/?DoctorUsername=${filters.doctorUsername}`;


        axios.get(url)
            .then(response => {
                setPatients(response.data);
            })
            .catch(error => {
                console.error('Error fetching patient:', error);
            });
    };

    const openModal = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/patient/selectPatient/?id=${id}`);
            setSelectedPatient(response.data);
            setModalOpen(true);
        } catch (error) {
            console.error('Error fetching patient data:', error);
        }
    };

    const closeModal = () => {
        setSelectedPatient(null);
        setModalOpen(false);
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
                                    <Input {...field} type="text" placeholder="enter docotr username" />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="patientName">
                            {({ field }) => (
                                <FormControl>
                                    <Input {...field} type="text" placeholder="enter Patient name" />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="upcoming">
                            {({ field }) => (
                                <FormControl>
                                    <Input {...field} type="text" placeholder="filter for upcoming appointments?" />
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
                    {patients.map(patient => (
                        <Tr key={patient._id} onClick={() => openModal(patient._id)}>
                            <Td>{patient && patient.Name ? patient.Name : 'N/A'}</Td>
                            <Td>{patient && patient.MobileNum ? patient.MobileNum : 'N/A'}</Td>
                            <Td>{patient && patient.DateOfBirth ? patient.DateOfBirth : 'N/A'}</Td>
                            <Td>{patient && patient.Gender ? patient.Gender : 'N/A'}</Td>
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
                            <p>Emergency Contact Name:{selectedPatient.EmergencyContact.FullName}</p>
                            <p>Emergency Contact phone number:{selectedPatient.EmergencyContact.PhoneNumber}</p>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </Box>
    );
}

export default PatientTable;
