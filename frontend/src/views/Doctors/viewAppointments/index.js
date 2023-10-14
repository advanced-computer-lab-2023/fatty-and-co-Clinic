import React, { useEffect, useState } from "react";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import AppointmentsTable from "./components/AppointmentsTable";
import { Flex, Button, Box ,Input,Text} from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useRef } from "react";

export default function ViewAppointments() {
  const [data, setData] = useState([{}]);
  const [searchParams, setSearchParams] = useState({
    Status: "",
    Date: "",
  });

  const [filterParams, setFilterParams] = useState({
    Status: "",
    date: [],
    hour: [],
    DoctorUsername: "",
  });
  const { DoctorUsername } = useParams();
  const options = [
    { label: "Cancelled", value: "Cancelled" },
    { label: "Upcoming", value: "Upcoming" },
    { label: "Completed", value: "Completed" },
    { label: "Rescheduled", value: "Rescheduled" }
  ];
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const url = API_PATHS.viewAppointments + DoctorUsername;;
      axios
        .get(url, { params: filterParams })
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [filterParams]);

  const [statusFilterValue, setStatusFilterValue] = useState("");
  const [dayFilterValue, setDayFilterValue] = useState([]);
  const [hourFilterValue, setHourFilterValue] = useState([]);
  const [dayHourFilterValue, setDayHourFilterValue] = useState([]);

  //add date and hour
  const handleFilterOnChange = (value) => {
    setFilterParams({
      ...filterParams,
      Status: statusFilterValue,
      date: dayFilterValue,
      hour: hourFilterValue,
      DoctorUsername: DoctorUsername,
    });
  };

  const handleStatusFilter = (event) => {
    setStatusFilterValue(event.target.value);
  };

  const handleDateFilter = (event) => {
    setDayFilterValue(event.target.value);
  };

  const handleHourFilter = (event) => {
    setHourFilterValue(event.target.value);
  };

  const handleDateHourValue = (event) => {
    setDayHourFilterValue(event.target.value);
    const newDate = new Date(event.target.value);
    const newHour = newDate.getHours() + newDate.getMinutes() / 100;
    setDayFilterValue(newDate);
    setHourFilterValue(newHour);
  };

  useEffect(() => {
    const url = API_PATHS.viewAppointments + DoctorUsername;
    axios
      .get(url, { params: searchParams })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [searchParams]);

  const [statusSearchValue, setStatusSearchValue] = useState("");
  const [dateSearchValue, setDateSearchValue] = useState("");

  const handleSearchButtonClick = () => {
    // Call both search functions with the current search values
    setSearchParams({
      ...searchParams,
      Status: statusSearchValue,
      Date: dateSearchValue,
    });
  };

  const handleClrButtonClick = () => {
    setDayFilterValue([]);
    setHourFilterValue([]);
    setFilterParams({
      Status: "",
      date: [],
      hour: [],
      DoctorUsername: DoctorUsername,
    });
  };

  const handleStatusSearchValueChange = (value) => {
    setStatusSearchValue(value);
  };

  const handleDateSearchValueChange = (value) => {
    setDateSearchValue(value);
  };

  return (
    <Box pt="80px">
      <Flex
        direction="column"
        alignItems="flex-start"
        pt="50px"
        justifyContent="flex-start"
      >
        <Flex direction="row" alignItems="flex-start">
          <SearchBar
            placeholder="Status..."
            onChange={handleStatusSearchValueChange}
          />
          <SearchBar
            placeholder="yyyy-mm-dd"
            onChange={handleDateSearchValueChange}
            marginLeft={4} // Add margin to the left
          />
          <Button onClick={handleSearchButtonClick} marginLeft={4}>
            Search
          </Button>
        </Flex>

        <Flex direction="row" alignItems="flex-start">
          <select onChange={handleStatusFilter}>
            <option value="">All</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>


          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            value={dayHourFilterValue}
            onChange={handleDateHourValue}
          />

          <Button onClick={handleFilterOnChange} marginLeft={4}>
            filter
          </Button>

          <Button onClick={handleClrButtonClick} marginLeft={4}>
            Clear
          </Button>
        </Flex>
        {(DoctorUsername && DoctorUsername !== ":DoctorUsername" && (
          <AppointmentsTable
          title={"Available Appointments"}
          captions={["Doctor Name", "Patient Name", "Status", "Date"]}
          data={data}
        />
        )) || (
          <Text fontSize="3xl" fontWeight="bold">
            Username not found
          </Text>
        )}
      </Flex>
    </Box>
  );
}
