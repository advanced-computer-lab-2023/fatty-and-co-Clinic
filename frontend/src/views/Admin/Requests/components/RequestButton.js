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
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "axios";



function RequestButton({ Username, Status }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null); // State to store data from the database
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  useEffect(() => {
    // Fetch data from the database when the component mounts
    // fetch(API_PATHS.getRequest + "?Username=" + Username, {
    //   method: "GET",
    // })
    axios
      .get(API_PATHS.getRequest, {
        params: { Username: Username },
        headers: { Authorization },
      })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }, []); 
  }


  const jsonData = JSON.stringify(data);

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
              </div>
            ) : (
              <p>Loading data...</p>
            )}
          </ModalBody>
          <ModalFooter> {/* add accept + reject buttons here */}
          {Status == "Pending" ? (
              <div>
                <Button colorScheme="green" mr={3} onClick={() => handleCustomClick1}>
                  Accept
                </Button>
                <Button colorScheme="red" mr={3} onClick={() => handleCustomClick2}>
                  Reject
                </Button>
                <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
              </div>
            ) : (
              
              <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );


export default RequestButton;
