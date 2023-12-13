// ChatBox.js
import React from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const Message = ({ message }) => {

  return (
    <Flex 
      flexDirection={message.isCurrentUser ? "row-reverse" : "row"}
      alignItems="flex-start" // Align items at the start of the flex container
      mb={4}
    >
    
          <Avatar
            size="sm"
            name={message.sender}
            src={message.avatarUrl}
            bg={message.isCurrentUser ? "teal.500" : "gray.200"}
          />
          <Box
            ml={message.isCurrentUser ? 0 : 1}
            mr={message.isCurrentUser ? 1 : 0}
          >
            <Text maxW="300px"
              bg={message.isCurrentUser ? "teal.500" : "gray.200"}
              color={message.isCurrentUser ? "white" : "black"}
              p={3}
              borderRadius="md"
            >
              {message.content} 
            </Text>
            <Text textAlign={message.isCurrentUser ? "right" : "left"} fontSize="sm" color="gray.500" mt={1}>
          {/* {message.timestamp} */}
        </Text>
          </Box>

       
    </Flex>
  );
};

export default Message;
