import {
  Flex,
  Td,
  Text,
  Button,
} from "@chakra-ui/react";
import React from "react";
import CreateFollowUpButton from "views/Doctors/viewAppointments/components/CreateFollowUpButton";

function AppointmentsRow(props) {
  const {
    DoctorName,
    DoctorUsername,
    PatientName,
    PatientUsername,
    Status,
    Type,
    DateTime,
  } = props;

  const textColor = "gray.700"; // You may change this according to your color scheme

  return (
    <tr style={{ borderBottom: '2px solid #ddd', background:"#f4f4f4" }}>
      {DoctorName && (
        <Td minWidth={{ sm: "160px" }} pl="10px" padding="10px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text
              fontSize="md"
              color="black"
              fontWeight="bold"
              minWidth="100%"
            >
              {DoctorName}
            </Text>
          </Flex>
        </Td>
      )}
      <Td minWidth={{ sm: "150px" }} pl="0px" padding="10px">
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

      <Td minWidth={{ sm: "150px" }} pl="0px" padding="10px">
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

      <Td minWidth={{ sm: "190px" }} padding="10px">
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {new Date(DateTime).toLocaleDateString("en-GB")}
        </Text>
      </Td>
      <Td minWidth={{ sm: "190px" }} padding="10px">
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {new Date(DateTime).toLocaleTimeString("en-GB")}
        </Text>
      </Td>
      {PatientUsername && Status === "Completed" && (
        <Td minWidth={{ sm: "150px" }} padding="10px">
          <CreateFollowUpButton patientUsername={PatientUsername} />
        </Td>
      )}

      <Td minWidth={{ sm: "150px" }} padding="10px">
        {Status === "Upcoming" || Status === "Rescheduled" ? (
          <Button
            colorScheme="red"
            onClick={() => props.handleCancelAppointment(DoctorUsername)}
          >
            Cancel
          </Button>
        ) : null}
      </Td>
    </tr>
  );
}

export default AppointmentsRow;
