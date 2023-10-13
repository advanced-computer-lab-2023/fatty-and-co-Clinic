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

function PrescriptionTable() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const patientUsername = "Marioooom";

    const [filters, setFilters] = useState({
        doctorUsername: '',
        date: '',
        status: '',
    });

    useEffect(() => {
        fetchPrescriptions();
    }, [patientUsername, filters]);

    const fetchPrescriptions = () => {
        // Construct the URL based on filters and user ID
        let url = `http://localhost:8000/patient/getPrescriptions/?PatientUsername=${patientUsername}`;

        if (filters.doctorUsername) url += `&DoctorUsername=${filters.doctorUsername}`;
        if (filters.date) url += `&Date=${filters.date}`;
        if (filters.status) url += `&Status=${filters.status}`;

        axios.get(url)
            .then(response => {
                setPrescriptions(response.data);
            })
            .catch(error => {
                console.error('Error fetching prescriptions:', error);
            });
    };

    const openModal = async (prescriptionId) => {
        try {
            const response = await axios.get(`http://localhost:8000/patient/selectPrescription/?id=${prescriptionId}`);
            setSelectedPrescription(response.data);
            setModalOpen(true);
        } catch (error) {
            console.error('Error fetching prescription data:', error);
        }
    };

    const closeModal = () => {
        setSelectedPrescription(null);
        setModalOpen(false);
    };

    return (
        <Box pt="80px">
            <Formik
                initialValues={filters}
                onSubmit={(values, actions) => {
                    setFilters(values); // Update filters state
                    fetchPrescriptions();
                    actions.setSubmitting(false);
                }}
            >
                {(props) => (
                    <Form>
                        <Field name="doctorUsername">
                            {({ field }) => (
                                <FormControl>
                                    <Input {...field} type="text" placeholder="Filter by Doctor Name" />
                                </FormControl>
                            )}
                        </Field>

                        <Field name="date">
                            {({ field }) => (
                                <FormControl>
                                    <Input {...field} type="date" placeholder="Filter by Date" />
                                </FormControl>
                            )}
                        </Field>

                        <Field name="status">
                            {({ field }) => (
                                <FormControl>
                                    <Select {...field} placeholder="Filter by Status">
                                        <option value="Filled">Filled</option>
                                        <option value="Unfilled">Unfilled</option>
                                    </Select>
                                </FormControl>
                            )}
                        </Field>

                        <Button
                            mt={4}
                            colorScheme="teal"
                            isLoading={props.isSubmitting}
                            type="submit"
                        >
                            Filter
                        </Button>
                    </Form>
                )}
            </Formik>

            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Doctor Name</Th>
                        <Th>Date</Th>
                        <Th>Diagnosis</Th>
                        <Th>Medicine</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {prescriptions.map(prescription => (
                        <Tr key={prescription._id} onClick={() => openModal(prescription._id)}>
                            <Td>{prescription && prescription.DoctorUsername ? prescription.DoctorUsername : 'N/A'}</Td>
                            <Td>{prescription && prescription.Date ? prescription.Date : 'N/A'}</Td>
                            <Td>{prescription && prescription.Diagnosis ? prescription.Diagnosis : 'N/A'}</Td>
                            <Td>
                                <ul>
                                    {prescription.Medicine.map((medicine, index) => (
                                        <li key={index}>{medicine.Name}</li>
                                    ))}
                                </ul>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {selectedPrescription && (
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Prescription Details</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <p>Doctor Username: {selectedPrescription.DoctorUsername}</p>
                            <p>Date: {selectedPrescription.Date}</p>
                            <p>Diagnosis: {selectedPrescription.Diagnosis}</p>
                            <p>Medicines:</p>
                            <ul>
                                {selectedPrescription.Medicine.map((medicine, index) => (
                                    <li key={index}>{medicine.Name}</li>
                                ))}
                            </ul>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </Box>
    );
}

export default PrescriptionTable;
