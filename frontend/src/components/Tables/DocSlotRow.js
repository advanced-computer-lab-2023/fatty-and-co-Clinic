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

function DocSlotRow(props) {
  const { isOpen, onToggle } = useDisclosure();

  const {
    DayName,
    Hour,
    timeValueChangeHandler,
    deleteClickHandler,
    editConfirmHandler,
  } = props;
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Tr>
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

      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Button onClick={onToggle}>Edit</Button>
          <Collapse
            in={isOpen}
            transition={{ exit: { delay: 0.3 }, enter: { duration: 0.5 } }}
          >
            <Flex>
              <Input
                bg="white"
                type="time"
                onChange={timeValueChangeHandler}
              />
              <Button onClick={editConfirmHandler} colorScheme="green">Confirm</Button>

            </Flex>

          </Collapse>
        </Flex>
      </Td>

      <Td>
        <Button onClick={deleteClickHandler} colorScheme="red">
          Delete
        </Button>
      </Td>
    </Tr>
  );
}

export default DocSlotRow;
