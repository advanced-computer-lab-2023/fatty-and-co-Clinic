import React, { useEffect, useState } from "react";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import { Flex, Button, Box, Input, Text, Select } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import PatientAppTable from "./components/PatientAppTable";
import { useAuthContext } from "hooks/useAuthContext";

export default function ViewPatientAppointments() {
  const [data, setData] = useState([{}]);
  const [searchParams, setSearchParams] = useState({
    Status: "",
    Date: "",
  });
  const [statusSearchValue, setStatusSearchValue] = useState("");
  const [dateSearchValue, setDateSearchValue] = useState("");

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  // const { PatientUsername } = useParams();
  const options = [
    { label: "Cancelled", value: "Cancelled" },
    { label: "Upcoming", value: "Upcoming" },
    { label: "Completed", value: "Completed" },
    { label: "Rescheduled", value: "Rescheduled" },
  ];

  useEffect(() => {
    const url = API_PATHS.viewAppointPat;
    axios
      .get(url, { params: searchParams, headers: { Authorization } })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [searchParams]);

  const handleSearchButtonClick = () => {
    // Call both search functions with the current search values
    setSearchParams({
      Status: statusSearchValue,
      Date: dateSearchValue,
    });
    console.log(statusSearchValue);
  };

  const handleClrButtonClick = () => {
    setSearchParams({
      Status: "",
      Date: "",
    });
  };

  const handleStatusSearchValueChange = (event) => {
    setStatusSearchValue(event.target.value);
    console.log(statusSearchValue);
  };

  const handleDateSearchValueChange = (event) => {
    setDateSearchValue(event.target.value);
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
          <Select
            bg="white"
            onChange={(e) => {
              handleStatusSearchValueChange(e);
            }}
          >
            <option value="">All</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Input
            bg="white"
            type="date"
            placeholder="Filter by Date"
            onChange={handleDateSearchValueChange}
          />
          <Button onClick={handleSearchButtonClick} marginLeft={4}>
            Filter
          </Button>

          <Button onClick={handleClrButtonClick} marginLeft={4}>
            Clear
          </Button>
        </Flex>

        {/* {(PatientUsername && PatientUsername !== ":PatientUsername" && ( */}
        <PatientAppTable
          title={"Available Appointments"}
          captions={["Doctor Name", "Status", "Type", "Date", "Time"]}
          data={data}
        />
        {/* )) || (
            <Text fontSize="3xl" fontWeight="bold">
              Username not found
            </Text>
          )} */}
      </Flex>
    </Box>
  );
}
