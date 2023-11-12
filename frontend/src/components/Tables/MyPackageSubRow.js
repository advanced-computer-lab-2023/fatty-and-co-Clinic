
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
function MyPackageSubRow(props) {
    const {Name,Status, Enddate,Startdate,Renewaldate} = props;
    const textColor = useColorModeValue("gray.700", "white");
    return (
      <Tr>
       
        <Td minWidth={{ sm: "25px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {Name}
            </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "25px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {Status}
            </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "25px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {Enddate}
            </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "25px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {Startdate}
            </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "25px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {Renewaldate}
            </Text>
          </Flex>
        </Td>
      </Tr>
    );
  }
  
  export default  MyPackageSubRow ;