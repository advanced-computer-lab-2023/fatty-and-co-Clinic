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
import { FaTrashAlt } from "react-icons/fa";
import { DownloadIcon } from '@chakra-ui/icons'
import { useMedicalHistoryContext } from "../hooks/useMedicalHistoryContext";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import { useEffect } from "react";

function HealthRecordRow(props) {
  const { dispatch } = useMedicalHistoryContext();
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
    const file = await response.blob();
    const fileUrl = URL.createObjectURL(file);
    setFile(fileUrl);
  };
  useEffect(() => {
    downloadFile();
  }, []);
  //handle clickDownload
  const handleClickDownload = () => {
    const link = document.createElement("a");
    link.href = file;
    link.download = props.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // handle delete
  const handleDelete = async () => {
    const response = await fetch(
      API_PATHS.removeHealthRecord + props.filename,
      {
        method: "DELETE",
        headers: { Authorization },
      }
    );
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
          <Text color={nameColor} fontSize="md" fontWeight="bold" mb="10px">
            {props.originalname}
          </Text>
          {(props.filename.includes(".png") ||
            props.filename.includes(".jpeg") ||
            props.filename.includes(".jpg")) && (
              <img src={file} width="100%" height="500px"></img>
            )}

          {/* {props.filename.includes(".pdf") && (
            // <iframe
            //   src={file}
            //   width="100%"
            //   height="500px"
            // ></iframe>
          )} */}
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            {props.note && "Doctor note : "}&nbsp;
            <Text as="span" color="gray.500">
              {props.note}
            </Text>
          </Text>
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
            onClick={handleClickDownload}
          >
            <Flex color="green.500" cursor="pointer" align="center" p="12px">
              <Icon as={DownloadIcon} me="4px" />
              <Text fontSize="sm" fontWeight="semibold">
                DOWNLOAD
              </Text>
            </Flex>
          </Button>
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
       
      </Flex>
    </Box>
  );
}

export default HealthRecordRow;
