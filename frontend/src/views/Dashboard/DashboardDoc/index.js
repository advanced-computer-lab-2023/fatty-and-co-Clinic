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
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
  Td
} from "@chakra-ui/react";
// assets
import peopleImage from "assets/img/people-image.png";
// import alborglab from "assets/img/alborglab.png";
// import orange from "assets/img/orange.jpg";
import logoChakra from "assets/svg/logo-white.svg";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import { IoChatbubbleEllipses } from "react-icons/io5";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
  
} from "components/Icons/Icons.js";
import { ChevronRightIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { dashboardTableData, timelineData } from "variables/general";
// import io from "socket.io-client";
// import socketIOClient from "socket.io-client";
import { Link } from "react-router-dom";
// import DoctorCard from "views/Patient/viewDoctors/components/DoctorCard";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import { useHistory } from "react-router-dom";

import { FaStethoscope, FaCalendarCheck } from "react-icons/fa";
import AppointmentsRow from "components/Tables/AppointmentsRow";
// import AppointmentsRowDash from "components/Tables/AppointmentRowDash";
import { set } from "date-fns";


// const ENDPOINT = "http://localhost:8000";
// const socket = socketIOClient(ENDPOINT);

export default function DashboardDoc() {
  const iconBoxInside = useColorModeValue("white", "white");
const toast = useToast();

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const [notifications, setNotifications] = useState([]);

  const history = useHistory();
  const [currentUsername, setCurrentUsername] = useState("");
  const [hasNotif, setHasNotif] = useState(false);
  const [upcoming, setUpcoming] = useState([]);
  

//   socket.on("receivedNotification", (recUsername, sendUsername) => {
//     console.log("notif username");
//     console.log(recUsername);
//     console.log(currentUsername);
//     if (recUsername === currentUsername) {
//       console.log("notification received");
//       setHasNotif(true);
//     }
//   });

//   let chatUrl = `./chatWithPatient`;

//   const getDoctorUsername = async () => {
//     try {
//       const response = await axios.get(API_PATHS.getDocUsernameSocket, {
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

//   const getHasNotifInitial = async () => {
//     const url = API_PATHS.getChatPatients;
//     axios
//       .get(url, { headers: { Authorization } })
//       .then((response) => {
//         const hasNotif = response.data.some(
//           (patient) => patient.hasNotif === true
//         );
//         console.log("hey");
//         console.log(hasNotif);
//         setHasNotif(hasNotif);
//       })
//       .catch((err) => console.log(err));
//   };

//   socket.on("receivedNotification", (recUsername, sendUsername) => {
//     console.log("notif username");
//     console.log(recUsername);
//     console.log(currentUsername);
//     if (recUsername === currentUsername) {
//       console.log("notification received");
//       setHasNotif(true);
//       //setRender(true);
//       console.log("chatDocsafternotification");
//     }
//   });


   useEffect(() => {
      const getUpcomingAppointments = async () => {
        try {
          const response = await fetch(`${API_PATHS.viewAppointments}`, {
            headers: {
              Authorization: Authorization,
              // Other headers if needed
            },
          });
          if (response.ok) {
            const result = await response.json();
            console.log(result);
            setUpcoming(result);
          } else {
            console.error("Error getting appointments:", response.statusText);
          }
        } catch (error) {
          console.error("Error checking appointment status:", error.message);
        }
      };
    getUpcomingAppointments();
   }, []);
useEffect(() => {
  console.log(upcoming); // Log the value here
}, [upcoming]);
//   useEffect(() => {}, [hasNotif]);

//   useEffect(() => {
//     getDoctorUsername();
//     getHasNotifInitial(); //to know if he has notification mn abl kda msln afel el app w fata7o
//   }, []);
  const handleViewAll = async () => {
    const redirectUrl = `/doctor/viewAppointments`;
    history.replace(redirectUrl);
  };
  return (
    <>
      <Grid templateColumns={{ sm: "1fr", xl: "repeat(2, 1fr)" }} gap="22px">
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="4"
          boxShadow="md"
          mt="20"
        >
          <Card>
            <Flex direction="column">
              <CardHeader p="12px 5px" mb="12px">
                <Text fontSize="lg" fontWeight="bold">
                  Your upcoming Appointments
                </Text>
              </CardHeader>
              <CardBody>
                <Flex direction="column" w="100%">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Patient name</Th>
                        <Th>FollowUp</Th>
                        <Th>Date</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {upcoming.map(
                        (appointment, index) =>
                          // Check if the appointment has status "Upcoming" before rendering
                          appointment.Status === "Upcoming" && (
                            <Tr key={index}>
                              <Td
                                minWidth={{ sm: "100px" }}
                                fontWeight="semibold"
                              >
                                {appointment.PatientName}
                              </Td>
                              <Td fontWeight="semibold">
                                {appointment.FollowUp
                                  ? "Follow Up"
                                  : "First Time"}
                              </Td>
                              <Td
                                minWidth={{ sm: "90px" }}
                                fontWeight="semibold"
                              >
                                {appointment.Date}
                              </Td>
                            </Tr>
                          )
                      )}
                    </Tbody>
                  </Table>
                </Flex>
              </CardBody>
              <Text textAlign="center" fontSize="sm" color="gray.500" mt={2}>
                <Button
                  colorScheme="teal"
                  size="sm"
                  leftIcon={<ChevronRightIcon />}
                  onClick={handleViewAll}
                >
                  View all appointments
                </Button>
              </Text>
            </Flex>
          </Card>
        </Box>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="4"
          boxShadow="md"
          mt="20"
        >
          <Card></Card>
        </Box>
      </Grid>
    </>
  );
}
