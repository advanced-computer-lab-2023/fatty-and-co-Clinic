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
  
  function DocSlotRow(props) {
    const { DayName, Hour, isSelected } = props;
    const textColor = useColorModeValue("gray.700", "white");
  
    return (
      <Tr
        //onClick={onClick}
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
              {Hour}
            </Text>
          </Flex>
        </Td>
  
        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {Cost}
          </Text>
        </Td>
        <Td>
            <Button onClick={editClickHandler}>Edit</Button>

            <Button onClick={deleteClickHandler} colorScheme="red">Delete</Button>
        </Td>  
      </Tr>
    );
  }
  
  export default DocSlotRow;
  