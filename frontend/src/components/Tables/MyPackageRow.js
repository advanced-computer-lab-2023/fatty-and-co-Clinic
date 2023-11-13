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

function MyPackageRow(props) {
  const {
    Name,
    Price,
    Session_Discount,
    Medicine_Discount,
    Family_Discount,
  } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr>
      <Td minWidth={{ sm: "100px" }} pl="0px">
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

      <Td minWidth={{ sm: "100px" }} pl="20px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {Price}
          </Text>
        </Flex>
      </Td>
      <Td minWidth={{ sm: "100px" }} pl="60px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {Session_Discount} {Session_Discount && "%"}
          </Text>
        </Flex>
      </Td>
      <Td minWidth={{ sm: "100px" }} pl="60px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {Medicine_Discount} {Medicine_Discount && "%"}
          </Text>
        </Flex>
      </Td>
      <Td minWidth={{ sm: "100px" }} pl="70px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {Family_Discount} {Family_Discount && "%"}
          </Text>
        </Flex>
      </Td>
    </Tr>
  );
}

export default MyPackageRow;
