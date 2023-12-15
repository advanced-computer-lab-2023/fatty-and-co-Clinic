import React, { useEffect, useState } from "react";
import { Flex, Box, Text, HStack, toast } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import Conversation from "components/Chat/Conversation";
import ChatBox from "components/Chat/ChatArea/ChatBox";

const ChatWithDoc = () => {
  const [chatDocs, setChatDocs] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(false);


  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const fetchMessages = async () => {
    try {
      console.log("fetching messages");
      console.log(currentDoctor.Username);
      const docUser = currentDoctor.Username;
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

  useEffect(() => {}, [selectedDoc]);

  useEffect(() => {}, [messages]);

  useEffect(() => {
    if (currentDoctor) {
      fetchMessages();
    }
  }, [currentDoctor]);

  const handleDoctorClick = async (doctor) => {
    setCurrentDoctor(doctor);

    const updatedDoctors = chatDocs.map(d => d.Username === doctor.Username ? { ...d, hasNotif: false } : d);
    setChatDocs(updatedDoctors);

    console.log("clicked");
    console.log(doctor.Username);
    setSelectedDoc(true);
    await axios.put(
      API_PATHS.setNotificationsToSeen,
      { senderUsername: doctor.Username },
      { headers: { Authorization } }
    );
  };




  //so when the user clicks on a doctor, the notification is set to seen
  useEffect(() => {}, [chatDocs]);

  const fetchConversations = async () => {
    try {
      const response = await axios.get(API_PATHS.getChatDoctors, {
        headers: { Authorization },
      });
      console.log(response.data);
      setChatDocs(response.data);
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
          <Text>Available Doctors</Text>
          {chatDocs.map((doctor) => (
            <Conversation
              key={doctor._id}
              user={doctor}
              onClick={() => handleDoctorClick(doctor)}
              hasNotif={doctor.hasNotif}
            />
          ))}
        </Box>
        {selectedDoc ? (
          <Box w="600px">
            <Text>Chat</Text>
            <ChatBox messages={messages} receiver={currentDoctor} />
          </Box>
        ) : (
          <span>Open a conversation to see Chat</span>
        )}
      </HStack>
    </Flex>
  );
};

export default ChatWithDoc;
