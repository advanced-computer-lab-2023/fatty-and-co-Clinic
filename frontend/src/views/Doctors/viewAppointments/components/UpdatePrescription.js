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
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import { useDoctorAppointmentsContext } from "hooks/useDoctorAppointmentsContext";
import AddMedButton from "views/Doctors/viewAppointments/components/addMedButton";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";

export default function UpdatePrescription({ customkey }) {
  const { appointments, dispatch } = useDoctorAppointmentsContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState("");

  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionAdd, setDescriptionAdd] = useState("");
  const [addMed, setaddMed] = useState(false);
  const [meds, setMeds] = useState([]);
  

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  console.log(user);

  useEffect(() => {
    const getMeds = async () => {
      try {
        const response = await fetch(
          `${API_PATHS.getPrescriptionMeds}?appointmentId=${customkey}`,
          {
            headers: {
              Authorization: Authorization,
              // Other headers if needed
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          setMeds(result.meds);
        } else {
          console.error(
            "Error getting prescription meds:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error checking prescription status:", error.message);
      }
    };

    // Check prescription status when the component mounts
    getMeds();
  }, []);
  const handleMedicine = (event) => {
    setMedicine(event.target.value);
  };
 const handleDescription = (event) => {
   setDescription(event.target.value);
 };
  const handleDescriptionAdd = (event) => {
    setDescriptionAdd(event.target.value);
  };
  const handleDosage = (event) => {
    setDosage(event.target.value);
  };
  const toast = useToast();
const handleSubmit = async () => {
  
  try {
const response = await fetch(
  `${API_PATHS.addMedToPrescription}?appointmentId=${customkey}&medicine=${medicine}&dosage=${dosage}&description=${descriptionAdd}`,
  {
    method: "POST",
    headers: {
      Authorization,
      // Other headers if needed
    },
  }
);

    if (response.ok) {
      const result = await response.json();
      toast({
        title: "Prescription added",
        description:
          "We've added your prescription to the appointment selected.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setaddMed(true);
      setMeds(result.Medicine);
    } else {
      console.error("Error adding medicine:", response.statusText);
    }
  } catch (error) {
    console.error("Error adding medicine:", error.message);
    toast({
      title: "Error",
      description: "We've encountered an error while adding this medicine.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
};
  const handleAddMed = () => {
    setaddMed(true);
  };
const handleDelete = async (medName) => {
  try {
    const response = await fetch(
      `${API_PATHS.deleteMedFromPrescription}?appointmentId=${customkey}&medicineName=${medName}`,
      {
        method: "POST",
        headers: {
          Authorization,
          // Other headers if needed
        },
      }
    );
      
    if (response.ok) {
      const result = await response.json();
      console.log(result);
     setMeds(result.Medicine);
    } else {
      console.error("Error deleting medicine:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting medicine:", error.message);
  }
};
const handleInc = async (medName,dosage) => {
  try {
    const response = await fetch(
      `${API_PATHS.updateDosage}?AppointmentId=${customkey}&medicineName=${medName}&dosage=${dosage}`,
      {
        method: "POST",
        headers: {
          Authorization,
          // Other headers if needed
        },
      }
    );
    

    if (response.ok) {
      const result = await response.json();
      
      setMeds(result.Medicine);
    } else {
      console.error("Error deleting medicine:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting medicine:", error.message);
  }
};

const handleEdit = async (medName) => {
  try {
    const response = await fetch(
      `${API_PATHS.updateDescription}?AppointmentId=${customkey}&medicineName=${medName}&description=${description}`,
      {
        method: "POST",
        headers: {
          Authorization,
          // Other headers if needed
        },
      }
    );

    if (response.ok) {
      const result = await response.json();

      setMeds(result.Medicine);
    } else {
      console.error("Error deleting medicine:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting medicine:", error.message);
  }
};

  const handleCloseModal = () => {
    setaddMed(false);
    // ...
    setIsModalOpen(false);
  };
  return (
    <>
      <Button colorScheme="blue" onClick={() => setIsModalOpen(true)}>
        Update prescription
      </Button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update prescription</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {meds.map((med, index) => (
              <div>
                <HStack key={index} spacing="48px">
                  <Box
                    bg="teal.400"
                    borderRadius="lg"
                    w="50%"
                    p={2}
                    color="white"
                    borderBottom="4px solid white"
                    borderTop="4px solid white"
                  >
                    <Text color="white" mb="2px" fontWeight="semibold">
                      Medicine: {med.Name}
                    </Text>
                    <Text color="white" mb="2px" fontWeight="semibold">
                      Dosage: {med.Dosage}
                    </Text>
                    <div>
                      <label
                        htmlFor="description"
                        style={{ color: "white", fontWeight: "semibold" }}
                      >
                        Description:
                      </label>
                      <input
                        type="text"
                        id="description"
                        value={description || med.Description}
                        onChange={handleDescription}
                        style={{
                          color: "",
                          marginBottom: "2px",
                          fontWeight: "semibold",
                          backgroundColor: "rgba(0, 0, 0, 0.2)", // Adjust the alpha value as needed
                          border: "none",
                          width: "150px",
                        }}
                      />
                    </div>
                  </Box>

                  <VStack>
                    <Button
                      p="0px"
                      bg="transparent"
                      mb={{ sm: "10px", md: "0px" }}
                      me={{ md: "12px" }}
                      onClick={() => handleDelete(med.Name)}
                    >
                      <Flex
                        color="red.500"
                        cursor="pointer"
                        align="center"
                        p="16px"
                      >
                        <Icon as={FaTrashAlt} me="4px" />
                        <Text fontSize="xs" fontWeight="semibold">
                          DELETE
                        </Text>
                      </Flex>
                    </Button>

                    <ButtonGroup size="sm" isAttached variant="outline">
                      <IconButton
                        aria-label="Add to friends"
                        size="xs"
                        icon={<MinusIcon />}
                        onClick={() => handleInc(med.Name, med.Dosage - 1)}
                      />
                      <Button
                        p="0px"
                        bg="transparent"
                        variant="no-hover"
                        mt="-1"
                      >
                        <Flex
                          color={"black"}
                          cursor="pointer"
                          align="center"
                          p="12px"
                        >
                          <Text fontSize="xs" fontWeight="semibold">
                            DOSAGE
                          </Text>
                        </Flex>
                      </Button>
                      <IconButton
                        aria-label="Add to friends"
                        size="xs"
                        icon={<AddIcon />}
                        onClick={() => handleInc(med.Name, med.Dosage + 1)}
                      />
                    </ButtonGroup>
                    <Button
                      p="0px"
                      bg="transparent"
                      onClick={() => handleEdit(med.Name)}
                    >
                      <Flex
                        color="black"
                        cursor="pointer"
                        align="center"
                        p="12px"
                      >
                        <Icon as={FaPencilAlt} me="4px" />
                      </Flex>
                    </Button>
                  </VStack>
                </HStack>
                <hr width="100%" color="gray" />
              </div>
            ))}

            {!addMed && (
              <Button
                leftIcon={<AddIcon />}
                variant="link"
                colorScheme="blue"
                onClick={handleAddMed}
                mt="4"
              >
                Add medicine to prescription
              </Button>
            )}
            {addMed && (
              <div>
                <Text mb="8px">medicine: </Text>
                <Input
                  medicine={medicine}
                  bg="white"
                  placeholder="Enter medicine"
                  onChange={handleMedicine}
                />
                <Text mb="8px">Dosage: </Text>
                <Input
                  dosage={dosage}
                  bg="white"
                  placeholder="Enter dosage"
                  onChange={handleDosage}
                />
                <Text mb="8px">Description: </Text>
                <Input
                  description={description}
                  bg="white"
                  placeholder="Enter description"
                  onChange={handleDescriptionAdd}
                />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            {" "}
            {addMed && (
              <div>
                <Button
                  leftIcon={<MinusIcon />}
                  colorScheme="red"
                  onClick={() => setaddMed(false)}
                  marginLeft={4}
                  mr={24}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} marginLeft={4}>
                  Add
                </Button>
              </div>
            )}
            <Button
              colorScheme="teal.400"
              marginLeft={4}
              mr={4}
              onClick={handleCloseModal}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
