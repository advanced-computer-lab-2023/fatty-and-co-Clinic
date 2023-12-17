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
  import CreateFollowUpButton from "views/Patient/viewAppointPat/components/CreateFollowUpButton";

  
  function PatientAppRow(props) {
    const {
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
          <Td minWidth={{ sm: "150px" }} pl="0px">
            <Flex align="center" py=".8rem" minWidth="40%" flexWrap="nowrap">
              <Text
                     fontSize="md"
                     color={textColor}
                     //fontWeight="bold"
                     minWidth="100%"
              >
                {DoctorName}
              </Text>
            </Flex>
          </Td>
        )}

        <Td minWidth={{ sm: "150px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text
                 fontSize="md"
                 color={textColor}
                 //fontWeight="bold"
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
            //fontWeight="bold"
            minWidth="100%"
            >
              {Type}
            </Text>
          </Flex>
        </Td>
  
        <Td minWidth={{ sm: "150px" }}>
          <Text       fontSize="md"
                     color={textColor}
                     //fontWeight="bold"
                     minWidth="100%">
            {new Date(DateTime).toLocaleDateString("en-GB")}
          </Text>
        </Td>
        <Td minWidth={{ sm: "150px" }}>
          <Text       fontSize="md"
                     color={textColor}
                     //fontWeight="bold"
                     minWidth="100%">
            {new Date(DateTime).toLocaleTimeString("en-GB")}
          </Text>
        </Td>
        {Status === "Completed" && (
          <Td minWidth={{ sm: "150px" }}>
            <CreateFollowUpButton doctorUsername={DoctorUsername} />
          </Td>
  
     
        )}
    
  <Td minWidth={{ sm: "150px" }}>

    {(Status === "Upcoming" ) && ( // Render the cancel button only if status is "Upcoming"
    //edites
         <Button
         colorScheme="teal"
        onClick={() => props.handlereschdule(DoctorUsername)}
       >
         Reschedule
       </Button>
    )}
  </Td>
  <Td minWidth={{ sm: "150px" }}>
    {(Status === "Upcoming" ) && ( // Render the cancel button only if status is "Upcoming"
         <Button
         colorScheme="red"
         onClick={() => props.handleCancelAppointment(DoctorUsername)}
       >
         Cancel
       </Button>
    )}
  </Td>
       
  
      </Tr>
    );
  }
  
  export default PatientAppRow;
  