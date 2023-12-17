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
import { useFollowUpRequestsContext } from "hooks/useFollowUpRequestsContext";

function RequestButton({ Username, Status, FollowUpDate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null); // State to store data from the database
  const { requests, dispatch } = useFollowUpRequestsContext();
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const toast = useToast();

  useEffect(() => {
    axios
      .get(API_PATHS.getFollowUp ,{
        params: { Username: Username , FollowUpDate: FollowUpDate},
        headers: { Authorization },
      })
      .then(async (response) => {
        setData(response.data);
        console.log(response.data);
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
        API_PATHS.acceptFollowUp,
        { Username: Username, FollowUpDate: FollowUpDate },
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
        API_PATHS.rejectFollowUp,
        { Username: Username , FollowUpDate: FollowUpDate},
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
