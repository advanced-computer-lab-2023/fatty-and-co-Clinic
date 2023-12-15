import {
  Avatar,
  Badge,
  Button,
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
  VStack,
  Icon,
  Img,
  useToast,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "axios";
import { useRequestsContext } from "hooks/useRequestsContext";

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
      .then(async (response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: error.response.data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, []); // Empty dependency array ensures this effect runs only once

  const jsonData = JSON.stringify(data);

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

  const downloadIdFile = async () => {
    const idF = await fetch(API_PATHS.getRequestFile + data.IdFileName, {
      headers: {
        Authorization: Authorization,
      },
    });
    const idFileBlob = await idF.blob();
    const idFileurl = URL.createObjectURL(idFileBlob);

    const link = document.createElement("a");
    link.href = idFileurl;
    link.download = "id file" + data.IdFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadMedicalDegreeFile = async () => {
    const MedicalDegre = await fetch(
      API_PATHS.getRequestFile + data.MedicalDegreeName,
      {
        headers: {
          Authorization: Authorization,
        },
      }
    );
    const MedicalDegreeBlob = await MedicalDegre.blob();
    const MedicalDegreurl = URL.createObjectURL(MedicalDegreeBlob);

    const link = document.createElement("a");
    link.href = MedicalDegreurl;
    link.download = "medical degree file" + data.MedicalDegreeName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadMedicallicenseFile = async () => {
    const license = await fetch(
      API_PATHS.getRequestFile + data.MedicalLicenseName,
      {
        headers: {
          Authorization: Authorization,
        },
      }
    );
    const licenseBlob = await license.blob();
    const licenseurl = URL.createObjectURL(licenseBlob);

    const link = document.createElement("a");
    link.href = licenseurl;
    link.download = "medical license file" + data.MedicalLicenseName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Button colorScheme="teal" onClick={() => setIsModalOpen(true)}>
        Details
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {data ? (
              <div>
                <p>Request Details: {jsonData}</p>
                <VStack spacing={3} w="80%">
                  <button onClick={downloadIdFile}>
                    ID File
                    <Icon as={DownloadIcon} me="3px" />
                  </button>
                  <button onClick={downloadMedicalDegreeFile}>
                    Medical Degree
                    <Icon as={DownloadIcon} me="3px" />
                  </button>
                  <button onClick={downloadMedicallicenseFile}>
                    Medical License
                    <Icon as={DownloadIcon} me="3px" />
                  </button>
                </VStack>
              </div>
            ) : (
              <p>Loading data...</p>
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
              </div>
            ) : (
              <div></div>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default RequestButton;
