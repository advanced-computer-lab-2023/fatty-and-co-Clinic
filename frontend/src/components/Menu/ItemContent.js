// chakra imports
import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { ClockIcon } from "components/Icons/Icons";
import { BsCircleFill } from 'react-icons/bs';
import PropTypes from "prop-types";
import React from "react";

export function ItemContent(props) {
  const navbarIcon = useColorModeValue("gray.500", "gray.200");
  const notificationColor = useColorModeValue("gray.700", "white");
  const spacing = " ";
  return (
    <>
      <Flex flexDirection="row">
      <Flex flexDirection="column">
        <Text fontSize="14px" mb="5px" color={notificationColor}>
          <Text fontWeight="bold" fontSize="14px" as="span">
            {props.boldInfo}
            {spacing}
          </Text>
          {props.info}
        </Text>
      </Flex>
      <Flex alignItems="flex-end" >
      <BsCircleFill color={"teal"} w="3px" h="3px" me="3`px" />
      </Flex>

      {/* <Avatar
        name={props.aName}
        src={props.aSrc}
        borderRadius="12px"
        me="16px"
      /> */}
      </Flex>
      
    </>
  );
}
