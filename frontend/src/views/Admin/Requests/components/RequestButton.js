import {
  Avatar,
  Badge,
  Button,
  Flex,
  HStack,
  Td,
  Divider,
  Text,
  Tr,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Icon,
  Img,
  useToast,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import { useRequestsContext } from "hooks/useRequestsContext";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import {
  FaBirthdayCake,
  FaMoneyBillAlt,
  FaHospital,
  FaGraduationCap,
} from "react-icons/fa";
import {
  ChevronRightIcon,
  HamburgerIcon,
  InfoOutlineIcon,
  EmailIcon,
} from "@chakra-ui/icons";

function RequestButton({ Username, Status }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null); // State to store data from the database
  const { requests, dispatch } = useRequestsContext();
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const toast = useToast();

  useEffect(() => {
    axios
      .get(API_PATHS.getRequest, {
        params: { Username: Username },
        headers: { Authorization },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // const jsonData = JSON.stringify(data);

  const handleAccept = async () => {
    axios
      .post(
        API_PATHS.acceptRequest,
        { Username: Username },
        {
          headers: { Authorization },
        }
      )
      .then((response) => {
        console.log(response);
        toast({
          title: "Request accepted",
          description: "Request accepted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        dispatch({ type: "UPDATE_REQUEST", payload: response.data });
      })
      .catch((error) => {
        console.error("Error accepting request:", error);
        toast({
          title: "Error accepting request",
          description: error.response.data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleReject = async () => {
    axios
      .put(
        API_PATHS.rejectRequest,
        { Username: Username },
        {
          headers: { Authorization },
        }
      )
      .then((response) => {
        console.log(response);
        toast({
          title: "Request rejected",
          description: "Request rejected successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        dispatch({ type: "UPDATE_REQUEST", payload: response.data });
      })
      .catch((error) => {
        console.error("Error rejecting request:", error);
        toast({
          title: "Error rejecting request",
          description: error.response.data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  // handle file download
  const downloadIdFile = async () => {
    let IdFileName = data.IdFileName;
    const idF = await fetch(API_PATHS.getRequestFile + IdFileName, {
      headers: {
        Authorization: Authorization,
      },
    });
    const idFileBlob = await idF.blob();
    const idFileurl = URL.createObjectURL(idFileBlob);

    const link = document.createElement("a");
    link.href = idFileurl;
    link.download = "id file" + IdFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPharmacyDegreeFile = async () => {
    let PharmacyDegreeName = data.PharmacyDegreeName;
    const PharmacyDegre = await fetch(
      API_PATHS.getRequestFile + PharmacyDegreeName,
      {
        headers: {
          Authorization: Authorization,
        },
      }
    );
    const PharmacyDegreeBlob = await PharmacyDegre.blob();
    const PharmacyDegreurl = URL.createObjectURL(PharmacyDegreeBlob);

    const link = document.createElement("a");
    link.href = PharmacyDegreurl;
    link.download = "pharmacy degree file" + PharmacyDegreeName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadWorkingLicenseFile = async () => {
    let WorkingLicenseName = data.WorkingLicenseName;
    const license = await fetch(API_PATHS.getRequestFile + WorkingLicenseName, {
      headers: {
        Authorization: Authorization,
      },
    });
    const licenseBlob = await license.blob();
    const licenseurl = URL.createObjectURL(licenseBlob);

    const link = document.createElement("a");
    link.href = licenseurl;
    link.download = "working license file" + WorkingLicenseName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // end of handle file download

  return (
    <>
      <Button colorScheme="teal" onClick={() => setIsModalOpen(true)}>
        Details
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            {data ? (
              <div>
                <Card mr="30">
                  <CardHeader p="12px 5px" mb="12px">
                    <HStack>
                      <InfoOutlineIcon color="teal.400" />
                      <Text fontSize="lg" fontWeight="bold">
                        {data.Username} Information
                      </Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    {data.Username && data.Username !== ":username" ? (
                      <Flex flexDirection="column">
                        <HStack>
                          <Icon
                            as={EmailIcon}
                            boxSize={6}
                            color={useColorModeValue("teal.500", "teal.300")}
                          />
                          <Text fontWeight="normal">{data.Email}</Text>
                        </HStack>
                        <Divider my="2" />
                        <HStack>
                          <Icon
                            as={FaBirthdayCake}
                            boxSize={6}
                            color={useColorModeValue("teal.500", "teal.300")}
                          />
                          <Text fontWeight="normal">{data.DateOfBirth}</Text>
                        </HStack>
                        <Divider my="2" />
                        <HStack>
                          <Icon
                            as={FaMoneyBillAlt}
                            boxSize={6}
                            color={useColorModeValue("teal.500", "teal.300")}
                          />
                          <Text>${data.HourlyRate}</Text>
                        </HStack>
                        <Divider my="2" />
                        <HStack>
                          <Icon
                            as={FaHospital}
                            boxSize={6}
                            color={useColorModeValue("teal.500", "teal.300")}
                          />
                          <Text>{data.Affiliation}</Text>
                        </HStack>
                        <Divider my="2" />
                        <HStack>
                          <Icon
                            as={FaGraduationCap}
                            boxSize={6}
                            color={useColorModeValue("teal.500", "teal.300")}
                          />
                          <Text>{data.EducationalBackground}</Text>
                        </HStack>
                      </Flex>
                    ) : (
                      <Text fontSize="3xl" fontWeight="bold" textAlign="center">
                        Username not found
                      </Text>
                    )}
                  </CardBody>
                </Card>
                {/* <p>Request Details: {jsonData}</p> */}
                <VStack spacing={3} w="80%">
                  <button onClick={downloadIdFile}>
                    ID File
                    <Icon as={DownloadIcon} me="3px" />
                  </button>
                  <button onClick={downloadPharmacyDegreeFile}>
                    Pharmacy Degree
                    <Icon as={DownloadIcon} me="3px" />
                  </button>
                  <button onClick={downloadWorkingLicenseFile}>
                    Working License
                    <Icon as={DownloadIcon} me="3px" />
                  </button>
                </VStack>
              </div>
            ) : (
              <Flex align="center" justify="center" height="200px">
                <Text fontSize="lg">Loading user data...</Text>
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            {Status == "Pending" ? (
              <div>
                <Button colorScheme="green" mr={3} onClick={handleAccept}>
                  Accept
                </Button>
                <Button colorScheme="red" mr={3} onClick={handleReject}>
                  Reject
                </Button>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            ) : (
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RequestButton;
