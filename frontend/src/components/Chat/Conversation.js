// Conversation.js
import React, { useEffect, useState } from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";


const Conversation = ({ user, onClick, hasNotif }) => {
  const [hover, setHover] = useState(false);

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      p={4}
      borderRadius="md"
      cursor="pointer"
      onClick= {onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      backgroundColor={hover ? "#f0f0f0" : ""}
    >
<Box position="relative">
  <Avatar bg="teal.500" size="sm" name={user.Name} src={user.avatarUrl} />
  {user.hasNotif && (
    <Box
      position="absolute"
      top="-1"
      right="0"
      h="9px"
      w="8px"
      bg="green.500"
      borderRadius="50%"
    />
  )}
</Box>      <Box ml={4}>
        <Text fontWeight="bold">{user.Name}</Text>
      </Box>
    </Box>
  );
};

export default Conversation;
