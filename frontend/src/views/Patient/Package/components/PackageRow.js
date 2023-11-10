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
  const [Status, setStatus] = useState(props.Status);
  const [PackageName, setPackageName] = useState(
    props.PackageName
  );
  const [Enddate, setEnddate] = useState(
    props.Enddate
  );

  const [Startdate, setStartdate] = useState(props.Startdate);
  const [Renewaldate, setRenewaldate] = useState(
    props.Renewaldate);
    const [NationalID, setNationalID] = useState(
      props.NationalID);
      
  const [message, setMessage] = useState("");
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;


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
          Status:&nbsp;
            <Text as="span" color="gray.500">
              {props.Status} 
            </Text>
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
          PackageName:&nbsp;
            <Text as="span" color="gray.500">
              {props.PackageName} 
            </Text>
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
          Enddate: &nbsp;
            <Text as="span" color="gray.500">
              {props.Enddate} 
            </Text>
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
          Renewaldate: &nbsp;
            <Text as="span" color="gray.500">
              {props.Renewaldate} 
            </Text>
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
          Startdate: &nbsp;
            <Text as="span" color="gray.500">
              {props.Startdate} 
            </Text>
          </Text>
        </Flex>
        <Flex
          direction={{ sm: "column", md: "row" }}
          align="flex-start"
          p={{ md: "24px" }}
        >
          {/* <Button
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
          </Button> */}
          <Button p="0px" bg="transparent" onClick={onOpen}>
            <Flex color={textColor} cursor="pointer" align="center" p="12px">
              <Icon as={FaPencilAlt} me="4px" />
              <Text fontSize="sm" fontWeight="semibold">
                Cancel subscribe
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
                placeholder="PackageName"
                onChange={(e) => {
                  if (e.target.value.length == 0) {
                    setPackageName(props.Name);
                  } else {
                    setPackageName(e.target.value);
                  }
                }}
              />
              <Input
                variant="filled"
                type="number"
                placeholder="NationalId"
                onChange={(e) => {
                  if (e.target.value.length == 0) {
                    setNationalID(props.NationalID);
                  } else {
                    setNationalID(e.target.value);
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
              setMessage(data.message);
                setName(props.Name);
                setStatus(props.Status);
                setPackageName(props.PackageName);
                setEnddate(props.Enddate);
                setStartdate(props.Startdate);
                setRenewaldate(props.Renewaldate);
                onClose();
              }}
            >
              Close
            </Button>
          
            <Button
  colorScheme="blue"
  onClick={async () => {
   // console.log("Id", props._id);
    console.log(API_PATHS.CancelFamilysubscribtion );
  
    try {
      const response = await fetch(
        API_PATHS.CancelFamilysubscribtion ,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: Authorization,
          },
          body: JSON.stringify({
            PackageName,
            NationalID,
          }),
        }
      );

      // Check for a successful response (2xx status codes)
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "UPDATE_PACKAGE", payload: data });
        toast({
          title: "Package Update.",
          description: "You Cancelled the package successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        // Handle non-successful response
        const errorMessage = await response.text(); // Assuming the error message is in plain text
        console.error("Failed Package Update. Error:", errorMessage);

        setMessage(errorMessage);
        setName(props.Name);
        setStatus(props.Status);
        setPackageName(props.PackageName);
        setEnddate(props.Enddate);
        setStartdate(props.Startdate);
        setRenewaldate(props.Renewaldate);
        onClose();
        return toast({
          title: "Failed Package Update. Try again.",
          description: "Error: " + errorMessage,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during package update:", error);
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