// Conversation.js
import React from 'react';
import { Avatar, Box, Text } from '@chakra-ui/react';

const Conversation = ({ user }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      p={4}
      borderRadius="md"
      cursor="pointer"
    >
      <Avatar bg='teal.500' size="sm" name={user.Name} src={user.avatarUrl} />
      <Box ml={4}>
        <Text fontWeight="bold">{user.Name}</Text>
      </Box>
    </Box>
  );
};

export default Conversation;
