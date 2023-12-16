// Chakra imports
import {
  Flex,
  Grid,
  Image,
  SimpleGrid,
  useColorModeValue,
  Button,
  Box,
  Heading,
  Spacer,
  Table,
  useToast,
} from "@chakra-ui/react";
// assets
import peopleImage from "assets/img/people-image.png";
import alborglab from "assets/img/alborglab.png";
import orange from "assets/img/orange.jpg";
import logoChakra from "assets/svg/logo-white.svg";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import { IoChatbubbleEllipses } from "react-icons/io5";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import React, { useEffect, useState } from "react";
import { dashboardTableData, timelineData } from "variables/general";
import io from "socket.io-client";
import socketIOClient from "socket.io-client";
import { Link } from "react-router-dom";
import DoctorCard from "views/Patient/viewDoctors/components/DoctorCard";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import { useHistory } from "react-router-dom";

import { FaStethoscope, FaCalendarCheck } from "react-icons/fa";
import AppointmentsRow from "components/Tables/AppointmentsRow";
import AppointmentsRowDash from "components/Tables/AppointmentRowDash";
import { set } from "date-fns";

const ENDPOINT = API_PATHS.base;
const socket = socketIOClient(ENDPOINT);

export default function DashboardDoc() {
  const toast = useToast();
  const iconBoxInside = useColorModeValue("white", "white");

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const [notifications, setNotifications] = useState([]);

  const history = useHistory();
  const [currentUsername, setCurrentUsername] = useState("");
  const [hasNotif, setHasNotif] = useState(false);

  socket.on("receivedNotification", (recUsername, sendUsername) => {
    console.log("notif username");
    console.log(recUsername);
    console.log(currentUsername);
    if (recUsername === currentUsername) {
      console.log("notification received");
      setHasNotif(true);
    }
  });

  let chatUrl = `./chat`;

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

  const getHasNotifInitial = async () => {
    const url = API_PATHS.getChatPatients;
    axios
      .get(url, { headers: { Authorization } })
      .then((response) => {
        const hasNotif = response.data.some(
          (patient) => patient.hasNotif === true
        );
        console.log("hey");
        console.log(hasNotif);
        setHasNotif(hasNotif);
      })
      .catch((err) => console.log(err));
  };

  socket.on("receivedNotification", (recUsername, sendUsername) => {
    console.log("notif username");
    console.log(recUsername);
    console.log(currentUsername);
    if (recUsername === currentUsername) {
      console.log("notification received");
      setHasNotif(true);
      //setRender(true);
      console.log("chatDocsafternotification");
    }
  });

  useEffect(() => {}, [hasNotif]);

  useEffect(() => {
    getDoctorUsername();
    getHasNotifInitial(); //to know if he has notification mn abl kda msln afel el app w fata7o
  }, []);

  return (
    <Box
      position="fixed"
      bottom="0"
      right="0"
      width="150px"
      height="150px"
      overflow="hidden"
    >
      <Button
        colorScheme="white"
        borderRadius="full"
        boxShadow="lg"
        p="7"
        position="relative"
        onClick={() => {
          history.push(chatUrl);
        }}
      >
        <IoChatbubbleEllipses size="3.0em" color="teal" />
        {/* Green Dot */}
        {hasNotif && (
          <Box
            position="absolute"
            top="0px"
            right="-1px"
            width="14px"
            height="14px"
            borderRadius="full"
            backgroundColor="teal"
            zIndex="1"
          />
        )}
      </Button>
    </Box>
  );
}
