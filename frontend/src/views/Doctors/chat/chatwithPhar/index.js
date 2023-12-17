import React, { useEffect, useState } from "react";
import { Flex, Box, Text, HStack, toast } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import Conversation from "components/Chat/Conversation";
import ChatBox from "components/Chat/ChatArea/ChatBox";
import socketIOClient from "socket.io-client";
import ChatBoxPharm from "components/Chat/ChatArea/ChatBoxPharm";

//const ENDPOINT = "http://localhost:7000";
//const socket = socketIOClient(ENDPOINT);
const ChatWithPharmacist = () => {
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  console.log(user);

  const [currentUsername, setCurrentUsername] = useState("");

  const currentPharmacist = {
    _id: "6569fc002440c3dfac738b9a",
    Username: "evalpharm",
    Name: "Ethan Clark",
    DateOfBirth: "1962-01-25T22:00:00.000+00:00",
    HourlyRate: 13,
    Affiliation: "Medical Center of Houston",
    EducationalBackground:
      "Medicinsk Licentiat from Washington University School of Medicine in S…",
    __v: 0,
  };

  //const [chatPatients, setChatPatients] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();
  // const [currentPatient, setCurrentPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  /// const [selectedPatient, setSelectedPatient] = useState(false);

  //   socket.on("receivedNotification", (recUsername, sendUsername) => {
  //     console.log("notif username");
  //     console.log(recUsername);
  //     console.log(currentUsername);
  //     if (recUsername === currentUsername) {
  //       console.log("notification received");
  //       const updatedPat_rec = chatPatients.map((d) =>
  //         d.Username === sendUsername ? { ...d, hasNotif: true } : d
  //       );
  //       setChatPatients(updatedPat_rec);
  //       //setRender(true);
  //       console.log("chatPatsafternotification");
  //       console.log(chatPatients);
  //     }
  //   });

  const getDoctorUsername = async () => {
    try {
      const response = await axios.get(API_PATHS.getDocUsernameSocket, {
        headers: { Authorization },
      });
      setCurrentUsername(response.data);
      console.log(response.data);
      //socket.emit('addUser', response.data); // Add this line
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

  //   const getPatientUsername = async () => {
  //     try {
  //       const response = await axios.get(API_PATHS.getPatientUsernameSocket, {
  //         headers: { Authorization },
  //       });
  //       setCurrentUsername(response.data);
  //       console.log(response.data);
  //       //socket.emit('addUser', response.data); // Add this line
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

  const fetchMessages = async () => {
    try {
      console.log("fetching messages");
      console.log(currentUsername);
      // const patUser = currentPatient.Username;
      const response = await axios.get(API_PATHS.getMessages, {
        params: { Receiver: currentUsername },
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

  //useEffect(() => {}, [selectedPatient]);

  useEffect(() => {}, [messages]);

  useEffect(() => {
    console.log("user type");
    //console.log(user.Type);
    if (user.userType === "Doctor") {
      getDoctorUsername();
    } else {
      getPatientUsername();
    }
    console.log("current username");
    // fetchConversations();
    fetchMessages();
  }, []);

  return (
    <Flex marginTop={75}>
      <HStack spacing="300" w="850px" align="start">
        <Box w="250px">
          <Text>The first available pharmacist will talk to you</Text>
        </Box>
        <Flex position="sticky">
          <Box w="600px">
            <Text>Chat</Text>
            <ChatBoxPharm messages={messages} receiver={currentPharmacist} />
          </Box>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default ChatWithPharmacist;
