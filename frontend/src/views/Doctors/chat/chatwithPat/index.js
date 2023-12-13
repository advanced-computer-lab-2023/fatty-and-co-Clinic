
import React, { useEffect, useState } from "react";
import { Flex, Box, Text, HStack, toast } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import Conversation from "components/Chat/Conversation";
import ChatBox from "components/Chat/ChatArea/ChatBox";
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:8000'; // replace with your server's address and port

const ChatWithPatient = () => {

  // useEffect(() => {
  //   // Connect to the Socket.IO server when the component mounts
  //   const socket = socketIOClient(ENDPOINT);

  //   socket.on('connect', () => {
  //     console.log('Connected to server');
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from server');
  //   });

  //   // Disconnect from the Socket.IO server when the component unmounts
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const [chatPatients, setChatPatients] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();
  const [currentPatient, setCurrentPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(false);
  // const messagesTest = [
  //   {
  //     sender: "John Doe",
  //     content: "Hey, how are you?",
  //     timestamp: "10:30 AM",
  //     isCurrentUser: false,
  //   },
  //   {
  //     sender: "You",
  //     content:
  //       "I am good! How about you?I am good! How about you?I am good! How about you?I am good! How about you?I am good! How about you?I am good! How about you?I am good! How about you?",
  //     timestamp: "10:32 AM",
  //     isCurrentUser: true,
  //   },
  // ];


  const fetchMessages = async () => {
    try {
      console.log("fetching messages");
      console.log(currentPatient.Username);
      const patUser = currentPatient.Username;
      const response = await axios.get(API_PATHS.getMessages, {
        params: { Receiver: patUser},
        headers: { Authorization },
       
      });
      setMessages(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
  }, [selectedPatient]);

  useEffect(() => {

  }, [messages]);


  useEffect(() => {
    if (currentPatient) {
      fetchMessages();
    }
  }, [currentPatient]);
  
  const handlePatientClick = (patient) => {
    setCurrentPatient(patient);
    setSelectedPatient(true);
  };




  const handleSendMessage = () => {
    // Implement your logic to send the new message
    console.log("Sending message:", newMessage);
    // Clear the input field after sending the message
    setNewMessage("");
  };
 
  const fetchConversations = async () => {
    try {
      const response = await axios.get(API_PATHS.getChatPatients, {
        headers: { Authorization },
      });
      console.log(response.data);
      setChatPatients(response.data);
      //console.log(response.data);
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
  }, []);

  return (
    <Flex marginTop={75}>
      <HStack spacing="300" w="850px" align="start">
        <Box w="250px">
          <Text>My patients</Text>
          {chatPatients.map((patient) => (
            <Conversation key={patient._id} user={patient} onClick={() => handlePatientClick(patient)} />
          ))}
        </Box>
        {selectedPatient ? (
  <Box w="600px">
    <Text>Chat</Text>
    <ChatBox messages={messages} receiver={currentPatient}/>
  </Box>
) : (
  <span>Open a conversation to see Chat</span>
)}
      </HStack>
    </Flex>
  );
};

export default ChatWithPatient;
