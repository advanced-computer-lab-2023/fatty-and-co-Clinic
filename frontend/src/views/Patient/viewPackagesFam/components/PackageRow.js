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

function PackageRow(props) {
  const { dispatch } = usePackageContext();
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");
  const [Name, setName] = useState(props.Name);
  const [Price, setPrice] = useState(props.Price);
  const [Session_Discount, setSession_Discount] = useState(
    props.Session_Discount
  );
  const [Medicine_Discount, setMedicine_Discount] = useState(
    props.Medicine_Discount
  );
  const [Family_Discount, setFamily_Discount] = useState(props.Family_Discount);
  const [message, setMessage] = useState("");
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  // handle delete
  const handleDelete = async () => {
    const response = await fetch(API_PATHS.deletePackage + props._id, {
      method: "DELETE",
      headers: { Authorization },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "SET_PACKAGE", payload: props._id });
    } else {
      setMessage(data.message);
    }
  };

  // handle edit
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <Box p="24px" bg={bgColor} my="22px" borderRadius="12px">
      <Flex justify="space-between" w="100%">
        <Flex direction="column" maxWidth="70%">
          <Text color={nameColor} fontSize="md" fontWeight="bold" mb="10px">
            {props.Name}
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Price:&nbsp;
            <Text as="span" color="gray.500">
              {props.Price} <small>EGP</small>
            </Text>
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Session Discount:&nbsp;
            <Text as="span" color="gray.500">
              {props.Session_Discount} <small>%</small>
            </Text>
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Medicine Discount: &nbsp;
            <Text as="span" color="gray.500">
              {props.Medicine_Discount} <small>%</small>
            </Text>
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Family Discount: &nbsp;
            <Text as="span" color="gray.500">
              {props.Family_Discount} <small>%</small>
            </Text>
          </Text>
        </Flex>
         <Flex
          direction={{ sm: "column", md: "row" }}
          align="flex-start"
          p={{ md: "24px" }}
        >
        </Flex>
      </Flex> 

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {Name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Text fontSize="sm" fontWeight="semibold">
                just add the diffrent values
              </Text>
         
          
            </Stack>
          </ModalBody>

          <ModalFooter>
         
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default PackageRow;
