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

function RequestButton({ Username }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null); // State to store data from the database
  const { user } = useAuthContext();
  const [imgSrc, setImgSrc] = useState("");
  const Authorization = `Bearer ${user.token}`;

  useEffect(() => {
    // Fetch data from the database when the component mounts
    fetch(API_PATHS.getRequest + "?Username=" + Username, {
      method: "GET",
      headers: {
        Authorization: Authorization,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    let url;
    const getLic = async () => {
      await fetch(
        API_PATHS.getRequestMedicalLicense + "?Username=" + Username,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      )
        .then((response) => response.blob())
        .then((images) => {
          // Outside the scope of this function you cannot access `images`
          // because it's async, so you need to handle it inside
          url = URL.createObjectURL(images);
          setImgSrc(url);
        })
        .catch((err) => console.error(err));
    };
    getLic();
  }, []); // Empty dependency array ensures this effect runs only once

  const jsonData = JSON.stringify(data);
  ///////////////////////////////////

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
                <img src={imgSrc} alt="Medical License" />
              </div>
            ) : (
              <p>Loading data...</p>
            )}
          </ModalBody>
          <ModalFooter>
            {/* add accept + reject buttons here */}
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RequestButton;
