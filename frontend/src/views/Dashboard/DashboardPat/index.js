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
} from "@chakra-ui/react";
// assets
import peopleImage from "assets/img/people-image.png";
import alborglab from "assets/img/alborglab.png";
import orange from "assets/img/orange.jpg";
import logoChakra from "assets/svg/logo-white.svg";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import React, { useEffect, useState } from "react";
import { dashboardTableData, timelineData } from "variables/general";
import ActiveUsers from "./components/ActiveUsers";
import BuiltByDevelopers from "./components/BuiltByDevelopers";
import MiniStatistics from "./components/MiniStatistics";
import OrdersOverview from "./components/OrdersOverview";
import Projects from "./components/Projects";
import SalesOverview from "./components/SalesOverview";
import WorkWithTheRockets from "./components/WorkWithTheRockets";
import io from "socket.io-client";
import socketIOClient from "socket.io-client";
import { Link } from "react-router-dom";
import DoctorCard from "views/Patient/viewDoctors/components/DoctorCard";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import { useHistory } from "react-router-dom";
// const ENDPOINT = "http://localhost:8000";
// const notificationSocket = socketIOClient(ENDPOINT);
import { FaStethoscope, FaCalendarCheck } from "react-icons/fa";
import AppointmentsRow from "components/Tables/AppointmentsRow";
import AppointmentsRowDash from "components/Tables/AppointmentRowDash";
export default function DashboardPat() {
  const iconBoxInside = useColorModeValue("white", "white");

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const [notifications, setNotifications] = useState([]);

  const history = useHistory();

  const handleRowClick = (row) => {
    setSelectedRow(row);

    history.push(newUrl, newState);
  };
  // useEffect(() => {
  //   notificationSocket.on("notification", (data) => {
  //     setNotifications((prevNotifications) => [...prevNotifications, data]);
  //     console.log(data);
  //   });
  // }, []);

  //featured docs
  const [data, setData] = useState([{}]);

  const [appointments, setAppointments] = useState([{}]); //my appointments
  const [searchParams, setSearchParams] = useState({
    Name: "",
    Speciality: "",
  });

  //for the moreDoctors button
  let newUrl = `./viewDoctors`;


  //For the moreAppointments button
  let appointmentsUrl = `./viewAppointPat`;
  useEffect(() => {
    const url = API_PATHS.viewDoctors;
    axios
      .get(url, { params: searchParams, headers: { Authorization } })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const url = API_PATHS.viewAppointPat;
    axios
      .get(url, { headers: { Authorization } })
      .then((response) => {
        const upcomingAppointments = response.data.filter(appointment => appointment.Status === 'Upcoming');
        setAppointments(upcomingAppointments);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {}, [data]);
  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>

{/* //featured doctors */}
<Flex
        flexDirection="column"
        pt={{ base: "120px", md: "75px" }}
        align="center"
      >
        <Box boxShadow="base" p="6" rounded="md" bg="white" width="100%">
          <Flex justifyContent="center">
            <Heading mb="4" fontSize="xl">
              <Flex align="center">
                <Box mr={3}>
                  <FaStethoscope size={20} />
                </Box>
                Featured Doctors
              </Flex>
            </Heading>
          </Flex>
          <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
            {data.slice(0, 4).map((row) => (
              <DoctorCard
                key={row.Username}
                Name={row.Name}
                Speciality={row.Speciality}
                Cost={row.Cost}
                CostOld={row.CostOld}
                onClick={() => handleRowClick(row)}
              />
            ))}
          </SimpleGrid>

          <Flex justifyContent="center" mt="4">
            <Button
              colorScheme="teal"
              onClick={() => {
                history.push(newUrl);
              }}
            >
              View More Doctors
            </Button>
          </Flex>
        </Box>
      </Flex>
      <Grid
        templateColumns={{ md: "1fr", lg: "1.8fr 1.2fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        my="26px"
        gap="24px"
      >

<WorkWithTheRockets
          backgroundImage={alborglab}
          title={"Coming soon"}
          description={
            "Your health is our priority. Seamless integration with your lab results with ALBORG. You will be able to check your results through Shebeen Health Clinic and apply for lab packages Accuracy you can trust"
          }
        />
        <BuiltByDevelopers
          title={"Tip of the day"}
          name={"Seasonal Flu!"}
          description={
            "Guava and Orange help improve immunity since they are rich in Vitamin C"
          }
          image={
            <Image
              src={orange}
              alt="chakra image"
              minWidth={{ md: "300px", lg: "auto" }}
            />
          }
        />
 
      </Grid>


      {/* //testing notifications */}
      {/* <div>NOTIFICATIONS </div>
      <Grid container spacing={3}>
        {notifications.map((notification, index) => (
          <Grid item xs={12} key={index}>
            <div>{notification.message}</div>
          </Grid>
        ))}
      </Grid> */}


      


      {
        //my appointments
      }

      <Flex
        flexDirection="column"
        pt={{ base: "120px", md: "75px" }}
        align="left"
      >
        <Box boxShadow="base" p="6" rounded="md" bg="white" width="50%">
          <Flex justifyContent="center">
            <Heading mb="4" fontSize="xl">
              <Flex align="center">
                <Box mr={3}>
                <FaCalendarCheck size={20} />
                </Box>
                Upcoming Appointments
              </Flex>
            </Heading>
          </Flex>
          <Table >
            {appointments.slice(0, 3).map((row) => (
              <AppointmentsRowDash
                key={row.Username}
                DoctorName={row.DoctorName}
                Status={row.Status} 
                Type={row.FollowUp ? "Follow Up" : "First Time"}
                DateTime={row.Date}
              />
            ))}
          </Table>

          <Flex justifyContent="center" mt="4">
            <Button
              colorScheme="teal"
              onClick={() => {
                history.push(appointmentsUrl);
              }}
            >
              View My Appointments
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
