
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
function statuspackagerow(props) {
    const { Patient, Status,  PackageName, Enddate,Startdate,Renewaldate} = props;
    const textColor = useColorModeValue("gray.700", "white");
  
    return (
      <Tr>
        <Td minWidth={{ sm: "100px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {Patient}
            </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "100px" }} pl="50px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {Status}
            </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "100px" }} pl="25px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {PackageName}
            </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "100px" }} pl="60px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {Enddate}
            </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "100px" }} pl="70px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {Startdate}
            </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "100px" }} pl="70px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {Renewaldate}
            </Text>
          </Flex>
        </Td>
      </Tr>
    );
  }
  
  export default statuspackagerow;