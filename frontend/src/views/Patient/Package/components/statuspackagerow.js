import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Icon,
  Progress,
  Td,
  Text,
  useToast,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { API_PATHS } from "API/api_paths";
import { CloseIcon } from '@chakra-ui/icons'

import { useAuthContext } from "hooks/useAuthContext";

function Statuspackagerow(props) {
  const {
    Name,
    Status,
    Package,
    Enddate,
    Startdate,
    Renewaldate,
    NationalId,
  } = props;
  const textColor = useColorModeValue("gray.700", "white");

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const toast = useToast();

  const handleCancellation = async (e) => {
    e.preventDefault();
    console.log("NationalId", NationalId);
    try {
      const response = await fetch(API_PATHS.CancelFamilysubscribtion, {
        method: "PATCH",
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ NationalId }),
      });

      //console.log("Response", response.status);
      const errorData = await response.json();

      if (response.ok) {
        toast({
          title: "Cancelled successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

      } else {
        toast({
          title: "Failed to Cancel",
          description: errorData.error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };


  return (
    <Tr>
      <Td minWidth={{ sm: "75px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {Name}
          </Text>
        </Flex>
      </Td>
      <Td minWidth={{ sm: "75px" }} pl="15px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {Status}
          </Text>
        </Flex>
      </Td>
      <Td minWidth={{ sm: "75px" }} pl="30px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {Package}
          </Text>
        </Flex>
      </Td>
      <Td minWidth={{ sm: "50px" }} pl="10px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {Enddate ? new Date(Enddate).toLocaleDateString("en-GB") : ""}
          </Text>
        </Flex>
      </Td>
      <Td minWidth={{ sm: "50px" }} pl="20px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {Startdate ? new Date(Startdate).toLocaleDateString("en-GB") : ""}
          </Text>
        </Flex>
      </Td>
      <Td minWidth={{ sm: "50px" }} pl="20px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {Renewaldate
              ? new Date(Renewaldate).toLocaleDateString("en-GB")
              : ""}{" "}
          </Text>
        </Flex>
      </Td>
      <Td>
        {Status === "Subscribed" && (
          <Button bg="red.500" onClick={handleCancellation}>
            <CloseIcon color="white"/>
          </Button>
        )}
      </Td>
    </Tr>
  );
}

export default Statuspackagerow;
