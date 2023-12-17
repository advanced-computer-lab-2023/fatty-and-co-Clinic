import React from "react";
import {
  Avatar,
  Box,
  Text,
  Input,
  Button,
  Flex,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import Message from "./Message";
import { useEffect, useState } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import { FaVideo } from "react-icons/fa";
import VideoCallComponent from "./VideoCallComponent";
import socketIOClient from "socket.io-client";
import { SettingsIcon } from "@chakra-ui/icons";

const ENDPOINT = "http://localhost:8000";
const socket = socketIOClient(ENDPOINT);

console.log(socket);

//TODO: SEND EVENT FOR LIVE NOTIFICATION
//TODO:
//TODO: SEND THE NEW MESSAGE LOGIC (SETSTATE AND USESTATE TO THE INDEX FILE)
const ChatBox = ({ messages: initialMessages, receiver }) => {
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [messages, setMessages] = useState(initialMessages); // [ { sender: "user1", content: "Hello", timestamp: "2021-05-01T12:00:00.000Z", isCurrentUser: true }, ...
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const [newMessage, setNewMessage] = useState("");

  //const [receiverstate, setReceiverState] = useState
  const [arrivalMessage, setArrivalMessage] = useState("");

  const toast = useToast();

  const [currentUsername, setCurrentUsername] = useState("");

  const [roomName, setRoomName] = useState("roomName"); // Replace with your room name

  const bottomChatRef = React.useRef(null);
  // React.useEffect(() => {
  //   if (bottomChatRef.current) {
  //     bottomChatRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages]);

  console.log("receiver");
  console.log(receiver);

  console.log("user");
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
      socket.emit("addUser", response.data); // Add this line
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
      socket.emit("addUser", response.data); // Add this line
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
  console.log("current username: " + currentUsername);

  useEffect(() => {
    // Connect to the Socket.IO server when the component mounts

    console.log(user.userType);
    if (user.userType === "Doctor") getDoctorUsername();
    else if (user.userType === "Patient") getPatientUsername();

    console.log("current username");
    console.log(currentUsername);

    //console.log(socket);
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Disconnect from the Socket.IO server when the component unmounts
    // return () => {
    //   socket.disconnect();
    // };
  }, [currentUsername]);

  useEffect(() => {
    if (arrivalMessage !== "") {
      setMessages((messages) => [...messages, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.sendUsername,
        content: data.text,
        timestamp: Date.now(),
        isCurrentUser: data.senderUsername === currentUsername,
      });
    });
  }, []);

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
      if (currentUsername == receiver.Username)
        socket.emit("changeReceiver", currentUsername);
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
      setNewMessage("");
      socket.emit("sendMessage", {
        sendUsername: currentUsername,
        recUsername: receiver.Username,
        text: newMessage,
      });
      console.log("Sending message:", newMessage);
      const response = await axios.post(
        API_PATHS.createMessage,
        { Receiver: receiver.Username, text: newMessage },
        { headers: { Authorization } }
      );
      console.log(receiver.Username);

      setMessages((messages) => [...messages, response.data]);
      console.log(messages);

      socket.emit("notification", {
        sendUsername: currentUsername,
        recUsername: receiver.Username,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  console.log("receiverhello");
  console.log(receiver);
  const generateRoomName = () => {
    let patientName = "";
    let doctorName = "";
    if (user.userType === "Patient") {
      patientName = currentUsername;
      doctorName = receiver.Username;
    } else if (user.userType === "Doctor") {
      patientName = receiver.Username;
      doctorName = currentUsername;
    }
    const roomName = `${patientName}-${doctorName}`;
    setRoomName(roomName);
  };

  //  useEffect(() => {
  //    generateRoomName();
  //  }, [receiver]);

  const handleStartVideoCall = async () => {
    try {
      // Send a message to the doctor
      generateRoomName();
      const callMessage = "I have started a video call. Please join.";
      socket.emit("sendMessage", {
        sendUsername: currentUsername,
        recUsername: receiver.Username,
        text: callMessage,
      });
      const response = await axios.post(
        API_PATHS.createMessage,
        { Receiver: receiver.Username, text: callMessage },
        { headers: { Authorization } }
      );
      setMessages((messages) => [...messages, response.data]);

      // Start the video call
      setIsVideoCall(true);
    } catch (error) {
      toast({
        title: "Error starting video call",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error("Error starting video call:", error);
    }
  };

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
      {isVideoCall ? (
        <VideoCallComponent
          roomName={roomName}
          setIsVideoCall={setIsVideoCall}
        ></VideoCallComponent>
      ) : (
        <>
          <Flex direction="column" overflowY="auto" maxHeight="400px">
            <Box>
              {messages.length > 0 &&
                messages.map((message, index) => (
                  <Message key={index} message={message} />
                ))}
              <div ref={bottomChatRef} style={{ height: "0px" }} />
            </Box>
          </Flex>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <Flex mt={4} position="sticky">
              <IconButton
                aria-label="Video Call"
                icon={<Icon as={FaVideo} />}
                onClick={handleStartVideoCall}
                colorScheme="teal"
                mr={2}
              ></IconButton>
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                mr={2}
              />
              <Button type="submit" colorScheme="teal">
                Send
              </Button>
            </Flex>
          </form>
        </>
      )}
    </Flex>
  );
};

export default ChatBox;
