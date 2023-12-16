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
  Button,
  Textarea,
  Input,
  Collapse,
  Box,
  useDisclosure,
  UseDisclosureProps,
} from "@chakra-ui/react";
import React from "react";

function DoctorSlotApt(props) {
  const { DayName, StartTime, bookRescheduleClick} = props;
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Tr
    >
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {DayName}
          </Text>
        </Flex>
      </Td>

      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {StartTime}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Button   
          onClick={() => props.bookRescheduleClick(DayName,StartTime)}
         colorScheme="teal">
          Reschedule
        </Button>
      </Td>
    </Tr>
  );
}

export default DoctorSlotApt;
