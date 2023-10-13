import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_PATHS } from 'API/api_paths';
import axios from 'axios';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import {
    Box,
    Flex,
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
    Text,
} from '@chakra-ui/react';

function PrescriptionTable() {
    const { patientUsername } = useParams();
    const [prescriptions, setPrescriptions] = useState([]);
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [doctorName, setDoctorName] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');

    const textColor = useColorModeValue("gray.700", "white");

    useEffect(() => {
        fetchPrescriptions();
    }, [patientUsername]);

    const fetchPrescriptions = () => {
        // Construct the URL based on filters and patient username
        let url = API_PATHS.viewPrescriptions + `?PatientUsername=${patientUsername}`;

        if (doctorName) url += `&DoctorName=${doctorName}`;
        if (date) url += `&Date=${date}`;
        if (status) url += `&Status=${status}`;

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
            const url = API_PATHS.getPrescription + `?id=${prescriptionId}`;
            console.log(url);
            const response = await axios.get(url);
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
            <Flex
                direction="column"
                alignItems="flex-start"
                pt="50px"
                justifyContent="flex-start"
            >
                <Flex direction="row" alignItems="flex-start">
                    <SearchBar
                        placeholder="Doctor name"
                        onChange={setDoctorName}
                    />
                    <SearchBar
                        placeholder="YYYY-MM-DD"
                        onChange={setDate}
                        marginLeft={4}
                    />
                    <SearchBar
                        placeholder="Status"
                        onChange={setStatus}
                        marginLeft={4}
                    />
                    <Button onClick={fetchPrescriptions} marginLeft={4}>
                        Search
                    </Button>
                </Flex>
                <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }}>
                    <CardHeader p="6px 0px 22px 0px">
                        <Flex direction="column">
                            <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
                                Prescriptions
                            </Text>
                        </Flex>
                    </CardHeader>
                    < CardBody >
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
                                {prescriptions.map(prescription => (
                                    <Tr key={prescription._id} onClick={() => openModal(prescription._id)}>
                                        <Td>{prescription && prescription.DoctorName ? prescription.DoctorName : 'N/A'}</Td>
                                        <Td>{prescription && prescription.Date ? prescription.Date : 'N/A'}</Td>
                                        <Td>{prescription && prescription.Diagnosis ? prescription.Diagnosis : 'N/A'}</Td>
                                        <Td>{prescription && prescription.Status ? prescription.Status : 'N/A'}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </CardBody >
                </Card >
            </Flex >
            {selectedPrescription && (
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Prescription Details</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <p>Doctor Name: {selectedPrescription.DoctorName}</p>
                            <p>Date: {selectedPrescription.Date}</p>
                            <p>Diagnosis: {selectedPrescription.Diagnosis}</p>
                            <p>Status: {selectedPrescription.Status}</p>
                            <p>Medicines:</p>
                            <ul>
                                {selectedPrescription.Medicine.map((medicine, index) => (
                                    <li key={index}>{medicine.Name}</li>
                                ))}
                            </ul>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )
            }
        </Box >
    );
}

export default PrescriptionTable;
