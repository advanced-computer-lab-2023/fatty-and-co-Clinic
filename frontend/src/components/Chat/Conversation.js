// Conversation.js
import React, { useEffect, useState } from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";


const Conversation = ({ user, onClick }) => {
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
      <Avatar bg="teal.500" size="sm" name={user.Name} src={user.avatarUrl} />
      <Box ml={4}>
        <Text fontWeight="bold">{user.Name}</Text>
      </Box>
    </Box>
  );
};

export default Conversation;
