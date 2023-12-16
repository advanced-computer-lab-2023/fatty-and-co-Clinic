// Chakra imports
import {
  Button,
  Box,
  Flex,
  Grid,
  Icon,
  Text,
  useColorModeValue,
  Select,
  Input,
  Divider,
  FormControl,
} from "@chakra-ui/react";
// Assets
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import imageArchitect1 from "assets/img/ImageArchitect1.png";
import imageArchitect2 from "assets/img/ImageArchitect2.png";
import imageArchitect3 from "assets/img/ImageArchitect3.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { FaPlus } from "react-icons/fa";
import AppointmentCard from "./AppointmentCard";
import React, { useEffect, useState } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";

const Appointments = ({ title, description }) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const [appointments, setAppointments] = useState([{}]);
  const [searchParams, setSearchParams] = useState({
    Status: "",
    Date: "",
  });
  const [statusSearchValue, setStatusSearchValue] = useState("");
  const [dateSearchValue, setDateSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const options = [
    { label: "Cancelled", value: "Cancelled" },
    { label: "Upcoming", value: "Upcoming" },
    { label: "Completed", value: "Completed" },
    { label: "Rescheduled", value: "Rescheduled" },
  ];

  useEffect(() => {
    const url = API_PATHS.viewAppointPat;
    setIsLoading(true);
    axios
      .get(url, { params: searchParams, headers: { Authorization } })
      .then((response) => {
        const sortedAppointments = response.data.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        setAppointments(sortedAppointments);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [searchParams]);

  const handleSearchButtonClick = () => {
    // Call both search functions with the current search values
    setSearchParams({
      Status: statusSearchValue,
      Date: dateSearchValue,
    });
  };

  const handleClrButtonClick = () => {
    setSearchParams({
      Status: "",
      Date: "",
    });
    setStatusSearchValue("Status");
    setDateSearchValue("");
  };

  const handleStatusSearchValueChange = (event) => {
    setStatusSearchValue(event.target.value);
    console.log(statusSearchValue);
  };

  const handleDateSearchValueChange = (event) => {
    setDateSearchValue(event.target.value);
  };

  return (
    <Card p='16px' my='24px'>
      <CardHeader p='12px 5px' mb='12px'>
        <Flex direction='column'>
          <Text fontSize='lg' color={textColor} fontWeight='bold'>
            Appointments
          </Text>
          <Text fontSize='sm' color='gray.500' fontWeight='400'>
            My upcoming appointments
          </Text>
        </Flex>
        <Flex direction="row" alignItems="flex-start">
        <Grid templateColumns="repeat(4, 1fr)" gap={6} marginLeft={4}>
          <FormControl>
            <Select
              bg="white"
              value={statusSearchValue}
              onChange={(e) => {
                handleStatusSearchValueChange(e);
              }}
            >
              <option value="Status">Status</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Input
              bg="white"
              type="date"
              placeholder="Filter by Date"
              onChange={handleDateSearchValueChange}
              value={dateSearchValue}
            />
          </FormControl>
          <Button onClick={handleSearchButtonClick} marginLeft={4}>
            Filter
          </Button>
          <Button onClick={handleClrButtonClick} marginLeft={4}>
            Clear
          </Button>
        </Grid>
      </Flex>
      </CardHeader>
      <CardBody px='5px'>
        <Grid
          templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(6, 1fr)" }}
          templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
          gap='24px'>
            {appointments.map((appointment, index) => (
            <AppointmentCard appointment={appointment} index={index + 1} />
            ))}
          <Button
            p='0px'
            bg='transparent'
            color='gray.500'
            border='1px solid lightgray'
            borderRadius='15px'
            minHeight={{ sm: "200px", md: "100%" }}>
            <Flex direction='column' justifyContent='center' align='center'>
              <Icon as={FaPlus} fontSize='lg' mb='12px' />
              <Text fontSize='lg' fontWeight='bold'>
                Book new <br/> appointment
              </Text>
            </Flex>
          </Button>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default Appointments;
