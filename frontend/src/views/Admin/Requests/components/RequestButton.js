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
  Img,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "axios";

function RequestButton({ Username, Status }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null); // State to store data from the database
  const { user } = useAuthContext();
  const [IdFile, setIdFileName] = useState(null);
  const [medicalLicense, setMedicalLicense] = useState(null);
  const [MedicalDegree, setMedicalDegree] = useState(null);
  const Authorization = `Bearer ${user.token}`;
  useEffect(() => {
    axios
      .get(API_PATHS.getRequest, {
        params: { Username: Username },
        headers: { Authorization },
      })
      .then(async (response) => {
        setData(response.data);
        // get the files from the backend
        const idF = await fetch(
          API_PATHS.getRequestFile + response.data.IdFileName,
          {
            headers: {
              Authorization: Authorization,
            },
          }
        );
        const idFileBlob = await idF.blob();
        const idFileurl = URL.createObjectURL(idFileBlob);
        setIdFileName(idFileurl);
        //
        const MedicalDegre = await fetch(
          API_PATHS.getRequestFile + response.data.MedicalDegreeName,
          {
            headers: {
              Authorization: Authorization,
            },
          }
        );
        const MedicalDegreeBlob = await MedicalDegre.blob();
        const MedicalDegreurl = URL.createObjectURL(MedicalDegreeBlob);
        setMedicalLicense(MedicalDegreurl);
        //
        const license = await fetch(
          API_PATHS.getRequestFile + response.data.MedicalLicenseName,
          {
            headers: {
              Authorization: Authorization,
            },
          }
        );
        const licenseBlob = await license.blob();
        const url = URL.createObjectURL(licenseBlob);
        setMedicalDegree(url);
        //end of getting files
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
      .catch((error) => {
        console.error("Error accepting request:", error);
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
      .catch((error) => {
        console.error("Error rejecting request:", error);
      });
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
                ID File<img src={IdFile} alt="ID File" />
                Medical Degree<img src={MedicalDegree} alt="Medical Degree" />
                Medical License<img src={medicalLicense} alt="Medical License" />
                
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
