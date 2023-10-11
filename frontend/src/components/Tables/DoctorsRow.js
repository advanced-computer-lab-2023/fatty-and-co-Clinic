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
} from "@chakra-ui/react";
import React from "react";

function DoctorsRow(props) {
  const { Name, Speciality, Cost, isSelected, onClick } = props;
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Tr
      onClick={onClick}
      bg={isSelected ? "blue.100" : "transparent"}
      _hover={{ bg: "gray.100" }}
      cursor="pointer"
    >
      <Td minWidth={{ sm: "250px" }} pl="0px">
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

      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {Speciality}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {Cost}
        </Text>
      </Td>
    </Tr>
  );
}

export default DoctorsRow;
