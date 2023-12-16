import React, { useEffect, useState } from "react";
import { Flex, Box, Text, HStack, toast } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import Conversation from "components/Chat/Conversation";
import ChatBox from "components/Chat/ChatArea/ChatBox";
import socketIOClient from "socket.io-client";

const ENDPOINT = API_PATHS.base;
const socket = socketIOClient(ENDPOINT);
const ChatWithPatient = () => {
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  console.log(user);

  const [currentUsername, setCurrentUsername] = useState("");

  const [chatPatients, setChatPatients] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();
  const [currentPatient, setCurrentPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(false);

  socket.on("receivedNotification", (recUsername, sendUsername) => {
    console.log("notif username");
    console.log(recUsername);
    console.log(currentUsername);
    if (recUsername === currentUsername) {
      console.log("notification received");
      const updatedPat_rec = chatPatients.map((d) =>
        d.Username === sendUsername ? { ...d, hasNotif: true } : d
      );
      setChatPatients(updatedPat_rec);
      //setRender(true);
      console.log("chatPatsafternotification");
      console.log(chatPatients);
    }
  });

  const getPatientUsername = async () => {
    try {
      const response = await axios.get(API_PATHS.getPatientUsernameSocket, {
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

  useEffect(() => {}, [chatPatients]);

  const fetchMessages = async () => {
    try {
      console.log("fetching messages");
      console.log(currentPatient.Username);
      const patUser = currentPatient.Username;
      const response = await axios.get(API_PATHS.getMessages, {
        params: { Receiver: patUser },
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

  useEffect(() => {}, [selectedPatient]);

  useEffect(() => {}, [messages]);

  useEffect(() => {
    if (currentPatient) {
      fetchMessages();
    }
  }, [currentPatient]);

  const handlePatientClick = async (patient) => {
    setCurrentPatient(patient);
    setSelectedPatient(true);

    const updatedPat = chatPatients.map((d) =>
      d.Username === patient.Username ? { ...d, hasNotif: false } : d
    );
    setChatPatients(updatedPat);

    console.log("clicked");
    console.log(patient.Username);

    await axios.put(
      API_PATHS.setNotificationsToSeen,
      { senderUsername: patient.Username },
      { headers: { Authorization } }
    );
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
    console.log("user type");
    console.log(user.Type);
    if (user.userType === "Doctor") {
      getDoctorUsername();
    } else {
      getPatientUsername();
    }
    fetchConversations();
  }, []);

  return (
    <Flex marginTop={75}>
      <HStack spacing="300" w="850px" align="start">
        <Box w="250px">
          <Text>My patients</Text>
          {chatPatients.map((patient) => (
            <Conversation
              key={patient._id}
              user={patient}
              onClick={() => handlePatientClick(patient)}
              hasNotif={patient.hasNotif}
            />
          ))}
        </Box>
        {selectedPatient ? (
          <Box w="600px">
            <Text>Chat</Text>
            <ChatBox messages={messages} receiver={currentPatient} />
          </Box>
        ) : (
          <span>Open a conversation to see Chat</span>
        )}
      </HStack>
    </Flex>
  );
};

export default ChatWithPatient;
