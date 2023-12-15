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
  
  function AppointmentsDocRow(props) {
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
        const isUpcomingAppointment = (status) => {
          return status === "Upcoming";
        };
      
    return (
      <Tr>
        {DoctorName && (
          <Td minWidth={{ sm: "150px" }} pl="0px">
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
          <Td minWidth={{ sm: "150px" }} pl="10px">
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
        <Td minWidth={{ sm: "150px" }} pl="15px">
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
  
        <Td minWidth={{ sm: "150px" }} >
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
  
        <Td minWidth={{ sm: "150px" }} pr="20px" >
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
    <Td minWidth={{ sm: "150px" }}>
      {(Status === "Upcoming" ) && ( // Render the reschedule button only if status is "Upcoming"
       <Button
       colorScheme="teal"
       onClick={() => props.handleRescheduleAppointment(PatientUsername)}
     >
       Reschedule
     </Button>
  )}
</Td>
     
      </Tr>
    );
  }
  
  export default AppointmentsDocRow;
  