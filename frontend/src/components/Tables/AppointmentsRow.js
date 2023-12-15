import {
  Flex,
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
import AddPrescriptionButton from "views/Doctors/viewAppointments/components/addPrescriptionButton";
import AddMedButton from "views/Doctors/viewAppointments/components/addMedButton";
import UpdatePrescription from "views/Doctors/viewAppointments/components/UpdatePrescription";
import { useAuthContext } from "hooks/useAuthContext";
// import { usePrescriptionContext } from "hooks/usePrescriptionContext";

function AppointmentsRow(props) {
  const { user } = useAuthContext();
  const {
    customkey,
    DoctorName,
    DoctorUsername,
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
      <Td minWidth={{ sm: "150px" }}>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {new Date(DateTime).toLocaleTimeString("en-GB")}
        </Text>
      </Td>
      <Stack spacing={0} direction="row" align="center">
        {PatientUsername && Status === "Completed" && (
          <Td minWidth={{ sm: "100px" }}>
            <CreateFollowUpButton patientUsername={PatientUsername} />
          </Td>
        )}
        {Status === "Completed" && !hasPrescription && (
          <Td minWidth={{ sm: "100px" }}>
            <AddPrescriptionButton
              customkey={customkey}
              setHasPrescription={setHasPrescription}
            />
          </Td>
        )}

        {Status === "Completed" && hasPrescription && (
          <Td minWidth={{ sm: "100px" }}>
            <UpdatePrescription customkey={customkey} />
          </Td>
        )}
      </Stack>
    </Tr>
  );
}

export default AppointmentsRow;
