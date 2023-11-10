import {
  Avatar,
  AvatarGroup,
  Flex,
  Icon,
  Progress,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import CreateFollowUpButton from "views/Doctors/viewAppointments/components/CreateFollowUpButton";

function AppointmentsRow(props) {
  const {
    DoctorName,
    PatientName,
    PatientUsername,
    Status,
    Type,
    DateTime,
  } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr>
      {DoctorName && (
        <Td minWidth={{ sm: "250px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {DoctorName}
            </Text>
          </Flex>
        </Td>
      )}

      {PatientName && (
        <Td minWidth={{ sm: "250px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {PatientName}
            </Text>
          </Flex>
        </Td>
      )}
      <Td minWidth={{ sm: "150px" }} pl="0px">
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

      <Td minWidth={{ sm: "150px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {Type}
          </Text>
        </Flex>
      </Td>

      <Td minWidth={{ sm: "150px" }}>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {new Date(DateTime).toLocaleDateString("en-GB")}
        </Text>
      </Td>
      <Td minWidth={{ sm: "150px" }}>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {new Date(DateTime).toLocaleTimeString("en-GB")}
        </Text>
      </Td>
      {PatientUsername && Status === "Completed" && (
        <Td minWidth={{ sm: "150px" }}>
          <CreateFollowUpButton patientUsername={PatientUsername} />
        </Td>
      )}
    </Tr>
  );
}

export default AppointmentsRow;
