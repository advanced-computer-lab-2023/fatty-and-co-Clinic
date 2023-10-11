import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ExpandableComponent from "components/Misc/ExpandableComponent"; // Import the ExpandableComponent

function RequestsRow(props) {
  const { Username, Name, Status } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  // State to track the expansion of the ExpandableComponent
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the expansion state
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {Name}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {Username}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Badge
          bg={
            Status === "Accepted"
              ? "green.400"
              : Status === "Rejected"
              ? "red.400"
              : bgStatus
          }
          color={
            Status === "Online"
              ? "white"
              : Status === "Rejected"
              ? "white"
              : colorStatus
          }
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {Status}
        </Badge>
      </Td>

      <Td>
        <a href="https://example.com">
          <Button p="0px" bg="teal.300" variant="no-hover">
            <Text
              fontSize="md"
              color="white"
              fontWeight="bold"
              cursor="pointer"
            >
              Details
            </Text>
          </Button>
        </a>
      </Td>

      {/* Add ExpandableComponent with appropriate props
      <Td colSpan={3}>
        <ExpandableComponent
          apiUrl="http://localhost:4000/admin/getRequest" 
          requestData={{ Username: Username }} 
          isExpanded={isExpanded}
          toggleExpansion={toggleExpansion}
        />
      </Td> */}
    </Tr>
  );
}

export default RequestsRow;
