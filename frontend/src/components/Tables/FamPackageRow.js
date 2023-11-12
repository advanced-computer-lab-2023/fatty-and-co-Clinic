
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
function FamPackageRow(props) {
    const { FamName, packName, packPrice, packSessionDiscount, packMedicineDiscount, packFamilyDiscount } = props;
    const textColor = useColorModeValue("gray.700", "white");
  
    return (
      <Tr>
        <Td minWidth={{ sm: "100px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {FamName}
            </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "100px" }} pl="30px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {packName}
            </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "100px" }} pl="25px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {packPrice}
            </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "100px" }} pl="60px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {packSessionDiscount}
            </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "100px" }} pl="70px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {packMedicineDiscount}
            </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "100px" }} pl="70px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {packFamilyDiscount}
            </Text>
          </Flex>
        </Td>
      </Tr>
    );
  }
  
  export default FamPackageRow;