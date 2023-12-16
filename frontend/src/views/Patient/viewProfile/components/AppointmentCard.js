// Chakra imports
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const AppointmentCard = ({ appointment, index }) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const date = new Date(appointment.Date);

  return (
    <Flex direction='column'>
      <Box mb='20px' position='relative' borderRadius='15px'>
        <Box
          w='100%'
          h='100%'
          position='absolute'
          top='0'
          borderRadius='15px'
          bg='linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)'></Box>
      </Box>
      {/*  Border!! */}
      {/* <Box
        p='0px'
        bg='transparent'
        color='gray.500'
        border='1px solid lightgray'
        borderRadius='15px'
        minHeight={{ sm: "200px", md: "100%" }}> */}
        <Flex direction='column'>
          <Text fontSize='md' color='gray.500' fontWeight='600' mb='10px'>
            Appintment #{index}
          </Text>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Doctor:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {appointment.DoctorName}
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Date:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
            {new Date(appointment.Date).toLocaleDateString("en-GB")}
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Type:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
            {appointment.FollowUp ? "Follow Up" : "First Time"}
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Time:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
            {new Date(appointment.Date).toLocaleTimeString("en-GB")}
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Status:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
            {appointment.Status}
            </Text>
          </Flex>
          {/* <Flex justifyContent='space-between'>
            <Button
              variant='outline'
              colorScheme='teal'
              minW='110px'
              h='36px'
              fontSize='xs'
              px='1.5rem'>
              VIEW APPOINTMENT
            </Button>
          </Flex> */}
        </Flex>
      {/* </Box> */}
    </Flex>
  );
};

export default AppointmentCard;
