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
} from "@chakra-ui/react";
// assets
import peopleImage from "assets/img/people-image.png";
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
import { FaStethoscope } from "react-icons/fa";
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

  const [data, setData] = useState([{}]);
  const [searchParams, setSearchParams] = useState({
    Name: "",
    Speciality: "",
  });

  //for the more button
  let newUrl = `./viewDoctors`;

  useEffect(() => {
    const url = API_PATHS.viewDoctors;
    axios
      .get(url, { params: searchParams, headers: { Authorization } })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [searchParams]);

  useEffect(() => {}, [data]);
  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        <MiniStatistics
          title={"Today's Moneys"}
          amount={"$53,000"}
          percentage={55}
          icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Today's Users"}
          amount={"2,300"}
          percentage={5}
          icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"New Clients"}
          amount={"+3,020"}
          percentage={-14}
          icon={<DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Total Sales"}
          amount={"$173,000"}
          percentage={8}
          icon={<CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
      </SimpleGrid>
      <Grid
        templateColumns={{ md: "1fr", lg: "1.8fr 1.2fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        my="26px"
        gap="24px"
      >
        <BuiltByDevelopers
          title={"Built by Developers"}
          name={"Purity UI Dashboard"}
          description={
            "From colors, cards, typography to complex elements, you will find the full documentation."
          }
          image={
            <Image
              src={logoChakra}
              alt="chakra image"
              minWidth={{ md: "300px", lg: "auto" }}
            />
          }
        />
        <WorkWithTheRockets
          backgroundImage={peopleImage}
          title={"Work with the rockets"}
          description={
            "Wealth creation is a revolutionary recent positive-sum game. It is all about who takes the opportunity first."
          }
        />
      </Grid>
      <Grid
        templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        gap="24px"
        mb={{ lg: "26px" }}
      >
        <ActiveUsers
          title={"Active Users"}
          percentage={23}
          chart={<BarChart />}
        />
        {/* <SalesOverview
            title={"Sales Overview"}
            percentage={5}
            chart={<LineChart />}
          /> */}
      </Grid>
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
        templateRows={{ sm: "1fr auto", md: "1fr", lg: "1fr" }}
        gap="24px"
      >
        <Projects
          title={"Projects"}
          amount={30}
          captions={["Companies", "Members", "Budget", "Completion"]}
          data={dashboardTableData}
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
              colorScheme="blue"
              onClick={() => {
                history.push(newUrl);
              }}
            >
              More
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
