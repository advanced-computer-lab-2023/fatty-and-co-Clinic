import React from "react";
import { Avatar, Box, Text, Input, Button, Flex } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import Message from "./Message";
import { useEffect, useState } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";

import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:8000"; 
const socket = socketIOClient(ENDPOINT);

console.log(socket);


//TODO: SEND EVENT FOR LIVE NOTIFICATION
//TODO: 
//TODO: SEND THE NEW MESSAGE LOGIC (SETSTATE AND USESTATE TO THE INDEX FILE)
const ChatBox = ({ messages: initialMessages, receiver }) => {
  const [messages, setMessages] = useState(initialMessages); // [ { sender: "user1", content: "Hello", timestamp: "2021-05-01T12:00:00.000Z", isCurrentUser: true }, ...
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const [newMessage, setNewMessage] = useState("");
   
  //const [receiverstate, setReceiverState] = useState
  const [arrivalMessage, setArrivalMessage] = useState("");

  const toast = useToast();

  const [currentUsername, setCurrentUsername] = useState("");

  console.log(user);

//   const getPatientUsername = async () => {
//     try {
//       const response = await axios.get(API_PATHS.getPatientUsernameSocket, {
//         headers: { Authorization },
//       });
//       setCurrentUsername(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//       toast({
//         title: "Error",
//         description: error.message,
//         status: "error",
//         duration: 9000,
//         isClosable: true,
//       });
//     }
//   };

//   const getDoctorUsername = async () => { try {
//     const response = await axios.get(API_PATHS.getDocUsernameSocket, {
//       headers: { Authorization },
//     });
//     setCurrentUsername(response.data);
//     console.log(response.data);
//   } catch (error) {
//     console.log(error);
//     toast({
//       title: "Error",
//       description: error.message,
//       status: "error",
//       duration: 9000,
//       isClosable: true,
//     });
//   }
// };

const getPatientUsername = async () => {
  try {
    const response = await axios.get(API_PATHS.getPatientUsernameSocket, {
      headers: { Authorization },
    });
    setCurrentUsername(response.data);
    console.log(response.data);
    socket.emit('addUser', response.data); // Add this line
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

const getDoctorUsername = async () => {
  try {
    const response = await axios.get(API_PATHS.getDocUsernameSocket, {
      headers: { Authorization },
    });
    setCurrentUsername(response.data);
    console.log(response.data);
    socket.emit('addUser', response.data); // Add this line
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
    // Connect to the Socket.IO server when the component mounts
    
    console.log(user.userType);
    if(user.userType === "Doctor")
    getDoctorUsername();
    else if(user.userType === "Patient")
    getPatientUsername(); 

    console.log("current username");
    console.log(currentUsername);

    //console.log(socket);
    socket.on("connect", () => {
      console.log("Connected to server");
    });

   


    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });


  }, [currentUsername]);

 
  useEffect(() => {
    if (arrivalMessage !== "") {
      setMessages((messages) => [...messages, arrivalMessage]);
    } 
  },[arrivalMessage]);

  useEffect (() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.sendUsername,
        content: data.text,
        timestamp: Date.now(),
        isCurrentUser: data.senderUsername === currentUsername,
      });
    });


  },[]);

  const fetchMessages = async () => {
    try {
      console.log("fetching messages");
      console.log(receiver.Username);
      const docUser = receiver.Username;
      const response = await axios.get(API_PATHS.getMessages, {
        params: { Receiver: docUser },
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
    console.log("messages changed");
    console.log(messages);
  }, [messages]);



  useEffect(() => {
    if (receiver) {
      // Emit a 'changeReceiver' event when the receiver changes
      if(currentUsername == receiver.Username)
      socket.emit('changeReceiver', currentUsername);
    console.log("receiver");
    console.log(receiver);
      fetchMessages();
    }
  }, [receiver]);

  useEffect(() => {
    console.log(" messages changed chatBox");
  }, [messages]);

  const handleSendMessage = async () => {
    try {
      socket.emit('sendMessage', {sendUsername: currentUsername, recUsername: receiver.Username, text: newMessage});
      console.log("Sending message:", newMessage);
      const response = await axios.post(
        API_PATHS.createMessage,
        { Receiver: receiver.Username, text: newMessage },
        { headers: { Authorization } }
      );
      console.log(receiver.Username );
      
      setMessages((messages) => [...messages, response.data]);
      console.log(messages);
      setNewMessage("");

      socket.emit('notification', {sendUsername: currentUsername, recUsername: receiver.Username });

    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  console.log("receiverhello");
  console.log(receiver);

  return (
    <Flex
      direction="column"
      w="550px" // Assuming the width of the Available receivers box is 250px
      p={4}
      boxShadow="md"
      borderRadius="md"
      bg="white"
      overflowY="auto"
      h="600px"
      justifyContent="space-between"
    >
      <Box>
        {messages.length > 0 &&
          messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
      </Box>
      <Flex mt={4}>
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button onClick={handleSendMessage} colorScheme="teal">
          Send
        </Button>
      </Flex>
    </Flex>
  );
};

export default ChatBox;
