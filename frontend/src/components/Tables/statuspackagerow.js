
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
function Statuspackagerow(props) {
    const { Name, Status,  Package, Enddate,Startdate,Renewaldate} = props;
    const textColor = useColorModeValue("gray.700", "white");
  
    return (
      <Tr>
        <Td minWidth={{ sm: "75px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {Name}
            </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "75px" }} pl="15px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {Status}
            </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "75px" }} pl="30px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {Package}
            </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "50px" }} pl="10px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
            {Enddate?new Date(Enddate).toLocaleDateString("en-GB"):""}            
            </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "50px" }} pl="20px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
            {Startdate?new Date(Startdate).toLocaleDateString("en-GB"):""}        
                </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "50px" }} pl="20px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
            {Renewaldate?new Date(Renewaldate).toLocaleDateString("en-GB"):""}            </Text>
          </Flex>
        </Td>
      </Tr>
    );
  }
  
  export default Statuspackagerow;