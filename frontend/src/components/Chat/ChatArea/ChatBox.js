import React from 'react';
import { Avatar, Box, Text, Input, Button , Flex} from '@chakra-ui/react';
import Message from './Message';
import  { useEffect, useState } from "react";

//TODO: SEND THE NEW MESSAGE LOGIC (SETSTATE AND USESTATE TO THE INDEX FILE)
const ChatBox = ({ messages }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
      // Implement your logic to send the new message
      console.log('Sending message:', newMessage);
      // Clear the input field after sending the message
      setNewMessage('');
    };
  
    return (
        <Box
        maxW="600px"
       // mx="auto"
        p={4}
        boxShadow="md"
        borderRadius="md"
        bg="white"
        overflowY="auto"
        h="600px"
      >
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
     
     <Flex mt={240}>
           <Input
             placeholder="Type your message..."
             value={newMessage}
             onChange={(e) => setNewMessage(e.target.value)}
           />
           <Button onClick={handleSendMessage} colorScheme="teal">
             Send
           </Button>
         </Flex>

        </Box>
    );
  };
  
  export default ChatBox;