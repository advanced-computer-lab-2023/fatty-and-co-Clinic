import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { usePackageContext } from "../hooks/usePackageContext";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import { useEffect } from "react";

function HealthRecordRow(props) {
  const { dispatch } = usePackageContext();
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");
  const [filename, setFilename] = useState(props.filename);
  const [note, setNote] = useState(props.note);
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  // set file
  const [file, setFile] = useState(null);
  const downloadFile = async () => {
    const response = await fetch(API_PATHS.downloadFile + props.filename, {
      method: "GET",
      headers: {
        Authorization,
      },
    });
    // i get the file make a url and set it to the file so I can download it if I visit the url
    const file = await response.blob();
    const fileUrl = URL.createObjectURL(file);
    setFile(fileUrl);
  };
  useEffect(() => {
    downloadFile();
  }, []);
  // handle delete
  const handleDelete = async () => {
    const response = await fetch(API_PATHS.removeHealthRecord + props.filename, {
      method: "DELETE",
      headers: { Authorization },
    });
    const data = await response.json();
    if (response.ok) {
      location.reload();
      //dispatch({ type: "DELETE_PACKAGE", payload: props._id });
    } else {
      setMessage(data.message);
    }
  };
  const toast = useToast();

  return (
    <Box p="24px" bg={bgColor} my="22px" borderRadius="12px">
      <Flex justify="space-between" w="100%">
        <Flex direction="column" maxWidth="70%">
          {props.filename.includes(".png") ||
            props.filename.includes(".jpeg") ||
            (props.filename.includes(".jpg") && (
              <img src={file} width="100%" height="500px"></img>
            ))}
          {props.filename.includes(".pdf") && (
            <embed src={file}  type="application/pdf" width="100%" height="500px"></embed>
          )}
          <Text color={nameColor} fontSize="md" fontWeight="bold" mb="10px">
            {props.filename}
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            {props.note && "Doctor note : "}&nbsp;
            <Text as="span" color="gray.500">
              {props.note}
            </Text>
          </Text>
        </Flex>
        <Flex
          direction={{ sm: "column", md: "row" }}
          align="flex-start"
          p={{ md: "24px" }}
        >
          <Button
            p="0px"
            bg="transparent"
            mb={{ sm: "10px", md: "0px" }}
            me={{ md: "12px" }}
            onClick={handleDelete}
          >
            <Flex color="red.500" cursor="pointer" align="center" p="12px">
              <Icon as={FaTrashAlt} me="4px" />
              <Text fontSize="sm" fontWeight="semibold">
                DELETE
              </Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default HealthRecordRow;
