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

  // handle delete
  const handleDelete = async () => {
    const response = await fetch("/package/deletePackage/" + props._id, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_PACKAGE", payload: props._id });
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
          <Button p="0px" bg="transparent" onClick={onOpen}>
            <Flex color={textColor} cursor="pointer" align="center" p="12px">
              <Icon as={FaPencilAlt} me="4px" />
              <Text fontSize="sm" fontWeight="semibold">
                EDIT
              </Text>
            </Flex>
          </Button>
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
              <Input
                variant="filled"
                type="text"
                placeholder="Name"
                onChange={(e) => {
                  if (e.target.value.length == 0) {
                    setName(props.Name);
                  } else {
                    setName(e.target.value);
                  }
                }}
              />
              <Input
                variant="filled"
                type="number"
                placeholder="Price EGP"
                onChange={(e) => {
                  if (e.target.value.length == 0) {
                    setPrice(props.Price);
                  } else {
                    setPrice(e.target.value);
                  }
                }}
              />
              <Input
                variant="filled"
                type="number"
                placeholder="Session Discount %"
                onChange={(e) => {
                  if (e.target.value.length == 0) {
                    setSession_Discount(props.Session_Discount);
                  } else {
                    setSession_Discount(e.target.value);
                  }
                }}
              />
              <Input
                variant="filled"
                type="number"
                placeholder="Medicine Discount %"
                onChange={(e) => {
                  if (e.target.value.length == 0) {
                    setMedicine_Discount(props.Medicine_Discount);
                  } else {
                    setMedicine_Discount(e.target.value);
                  }
                }}
              />
              <Input
                variant="filled"
                type="number"
                placeholder="Family Discount %"
                onChange={(e) => {
                  if (e.target.value.length == 0) {
                    setFamily_Discount(props.Family_Discount);
                  } else {
                    setFamily_Discount(e.target.value);
                  }
                }}
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={(e) => {
                setName(props.Name);
                setPrice(props.Price);
                setSession_Discount(props.Session_Discount);
                setMedicine_Discount(props.Medicine_Discount);
                setFamily_Discount(props.Family_Discount);
                onClose();
              }}
            >
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={async () => {
                const response = await fetch(
                  "/package/updatePackage/" + props._id,
                  {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      Name,
                      Price,
                      Session_Discount,
                      Medicine_Discount,
                      Family_Discount,
                    }),
                  }
                );
                const data = await response.json();

                if (response.status === 200) {
                  dispatch({ type: "UPDATE_PACKAGE", payload: data });
                  toast({
                    title: "Package Update.",
                    description: "You updated the package succsefuly.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                } else {
                  setMessage(data.message);
                  setName(props.Name);
                  setPrice(props.Price);
                  setSession_Discount(props.Session_Discount);
                  setMedicine_Discount(props.Medicine_Discount);
                  setFamily_Discount(props.Family_Discount);

                  return toast({
                    title: "failed Package Update.",
                    description: "Something went wrong try again.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                }
              }}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default PackageRow;
