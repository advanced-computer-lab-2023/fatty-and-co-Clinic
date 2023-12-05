// import React, { useEffect, useState } from "react";
// import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
// import {
//   Flex,
//   Button,
//   Box,
//   Input,
//   Text,
//   Select,
//   Center,
//   Square,
//   Spacer,
//   HStack,
// } from "@chakra-ui/react";
// import { API_PATHS } from "API/api_paths";
// import axios from "axios";

// import { useAuthContext } from "hooks/useAuthContext";
// import Conversation from "components/Chat/Conversation";
// import ChatBox from "components/Chat/ChatArea/ChatBox";
// const chatWithDoc = () => {
//   // const [data, setData] = useState([]);

//   const { user } = useAuthContext();
//   const Authorization = `Bearer ${user.token}`;


//   const [newMessage, setNewMessage] = useState('');

//   const handleSendMessage = () => {
//     // Implement your logic to send the new message
//     console.log('Sending message:', newMessage);
//     // Clear the input field after sending the message
//     setNewMessage('');
//   };

//   const userTest = {
//     name: 'Shorok Aldosoky',
//     avatarUrl: 'https://example.com/avatar.jpg',
    
//   };

//   const url = API_PATHS.getChatDoctors;
//   const chatDocs = axios
//     .get(url, {
//       headers: { Authorization },
//     })
//     .catch((error) => {
//       console.log(error);
//       toast({
//         title: "Error",
//         description: error.response.data.message,
//         status: "error",
//         duration: 9000,
//         isClosable: true,
//       });
//     });


//   const messagesTest = [
//     {
//       sender: 'John Doe',
//       avatarUrl: 'https://example.com/john-avatar.jpg',
//       content: 'Hey, how are you?',
//       timestamp: '10:30 AM',
//       isCurrentUser: false,
//     },
//     {
//       sender: 'You',
//       avatarUrl: 'https://example.com/your-avatar.jpg',
//       content: 'I am good! How about you?I am good! How about you?I am good! How about you?I am good! How about you?I am good! How about you?I am good! How about you?I am good! How about you?',
//       timestamp: '10:32 AM',
//       isCurrentUser: true,
//     },
//   ];

//   useEffect(() => {}, []);

//   return (
//     <Flex marginTop={75}>

//       <HStack spacing="300">
//         <Box w = "250px">
//           <Text>Available Doctors</Text>
//           {chatDocs.map((Doctor) => (
//          <Conversation user={Doctor.Name}/>
//         ))}
          
//         </Box>
//         <Box w = "600px">
//           <Text>Chat</Text>
//           <ChatBox messages={messagesTest} />

//         </Box>
//       </HStack>
//     </Flex>
//   );
// };
// export default chatWithDoc;

import React, { useEffect, useState } from "react";
import { Flex, Box, Text, HStack } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import Conversation from "components/Chat/Conversation";
import ChatBox from "components/Chat/ChatArea/ChatBox";

const ChatWithDoc = () => {
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const [chatDocs, setChatDocs] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();

  const handleSendMessage = () => {
    // Implement your logic to send the new message
    console.log("Sending message:", newMessage);
    // Clear the input field after sending the message
    setNewMessage("");
  };

  
  const messagesTest = [
    {
      sender: "John Doe",
      content: "Hey, how are you?",
      timestamp: "10:30 AM",
      isCurrentUser: false,
    },
    {
      sender: "You",
      content:
        "I am good! How about you?I am good! How about you?I am good! How about you?I am good! How about you?I am good! How about you?I am good! How about you?I am good! How about you?",
      timestamp: "10:32 AM",
      isCurrentUser: true,
    },
  ];
  const fetchConversations = async () => {
    try {
      const response = await axios.get(API_PATHS.getChatDoctors, {
        headers: { Authorization },
      });
      setChatDocs(response.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    fetchConversations();
  }, [Authorization, toast]);

  return (
    <Flex marginTop={75}>
      <HStack spacing="300">
        <Box w="250px">
          <Text>Available Doctors</Text>
          {chatDocs.map((doctor) => (
            <Conversation key={doctor._id} user={doctor} />
          ))}
        </Box>
        <Box w="600px">
          <Text>Chat</Text>
          <ChatBox messages={messagesTest} />
        </Box>
      </HStack>
    </Flex>
  );
};

export default ChatWithDoc;
