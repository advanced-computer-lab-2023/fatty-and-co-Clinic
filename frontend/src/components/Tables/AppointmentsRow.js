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
  Stack,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";

import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import CreateFollowUpButton from "views/Doctors/viewAppointments/components/CreateFollowUpButton";
import AddPrescriptionButton from "views/Doctors/viewAppointments/components/addPrescriptionButton";
import AddMedButton from "views/Doctors/viewAppointments/components/addMedButton";
import UpdatePrescription from "views/Doctors/viewAppointments/components/UpdatePrescription";
import { useAuthContext } from "hooks/useAuthContext";
//import { usePrescriptionContext } from "hooks/usePrescriptionContext";

function AppointmentsRow(props) {
  const {
    customkey,
    DoctorName,
    PatientName,
    PatientUsername,
    Status,
    Type,
    DateTime,
  } = props;
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const [hasPrescription, setHasPrescription] = useState("");
   const { prescriptions, dispatch } = usePrescriptionContext();
  useEffect(() => {
    const checkPrescriptionStatus = async () => {
      try {
        const response = await fetch(
          `${API_PATHS.checkForPrescription}?appointmentId=${customkey}`,
          {
            headers: {
              Authorization: Authorization,
              // Other headers if needed
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setHasPrescription(result.hasPrescription);
        } else {
          console.error(
            "Error checking prescription status:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error checking prescription status:", error.message);
      }
    };

    // Check prescription status when the component mounts
    checkPrescriptionStatus();
  }, []);

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
        <Td minWidth={{ sm: "150px" }} pl="0px">
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
      <Td minWidth={{ sm: "100px" }}>
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
