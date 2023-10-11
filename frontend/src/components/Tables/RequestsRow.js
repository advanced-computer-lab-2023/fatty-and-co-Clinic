import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton 
} from "@chakra-ui/react";
import RequestButton from "views/Admin/Requests/components/RequestButton";
import React, { useState } from "react";


function RequestsRow(props) {
  const { Username, Name, Status } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {Name}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {Username}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Badge
          bg={
            Status === "Accepted"
              ? "green.400"
              : Status === "Rejected"
              ? "red.400"
              : bgStatus
          }
          color={
            Status === "Online"
              ? "white"
              : Status === "Rejected"
              ? "white"
              : colorStatus
          }
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {Status}
        </Badge>
      </Td>

      <Td>
        <RequestButton Username = {Username} ></RequestButton>
        
      </Td>
    </Tr>
  );
}

export default RequestsRow;
