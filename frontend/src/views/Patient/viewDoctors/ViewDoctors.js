import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import { Flex, Button, Box, Text, Input } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "axios";
import DoctorsTable from "./components/DoctorsTable";

export function ViewDoctors() {
  const [data, setData] = useState([{}]);
  const [searchParams, setSearchParams] = useState({
    Name: "",
    Speciality: "",
  });

  const [filterParams, setFilterParams] = useState({
    speciality: "",
    startDate: [],
    endDate: [],
    startHour: [],
    startHour: [],
  });

  const [specialityFilterValue, setSpecialityFilterValue] = useState("");
  const [dayFilterValue, setDayFilterValue] = useState([]);
  const [hourFilterValue, setHourFilterValue] = useState([]);
  const [dayHourFilterValue, setDayHourFilterValue] = useState([]);

  const [startDateFilterVal, setStartDateFilterVal] = useState([]);
  const [endDateFilterVal, setEndDateFilterVal] = useState([]);
  const [startHourFilterVal, setStartHourFilterVal] = useState([]);
  const [endHourFilterVal, setEndHourFilterVal] = useState([]);

  const [nameSearchValue, setNameSearchValue] = useState("");
  const [specialitySearchValue, setSpecialitySearchValue] = useState("");

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const options = data
    .map((doctor) => ({
      label: doctor.Speciality,
      value: doctor.Speciality,
    }))
    .filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i);

  useEffect(() => {
    const url = API_PATHS.viewDoctors;
    axios
      .get(url, { params: searchParams, headers: { Authorization } })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [searchParams]);

  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const url = API_PATHS.filterDoctorSlotEdition;
      axios
        .get(url, { params: filterParams, headers: { Authorization } })
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [filterParams]);

  // add date and hour
  const handleFilterOnChange = (value) => {
    setFilterParams({
      ...filterParams,
      speciality: specialityFilterValue,
      startDate: startDateFilterVal,
      endDate: endDateFilterVal,
      startHour: startHourFilterVal,
      endHour: endHourFilterVal,
    });
  };

  const handleSpecialityFilter = (event) => {
    setSpecialityFilterValue(event.target.value);
  };

  // const handleDateFilter = (event) => {
  //   setDayFilterValue(event.target.value);
  // };

  // const handleHourFilter = (event) => {
  //   setHourFilterValue(event.target.value);
  // };

  const handleStartDateFilterVal = (event) => {
    setStartDateFilterVal(event.target.value);
  };

  const handleEndDateFilterVal = (event) => {
    setEndDateFilterVal(event.target.value);
  };

  const handleStartHourFilterVal = (event) => {
    setStartHourFilterVal(event.target.value);
  };

  const handleEndHourFilterVal = (event) => {
    setEndHourFilterVal(event.target.value);
  };

  const handleDateHourValue = (event) => {
    setDayHourFilterValue(event.target.value);
    const newDate = new Date(event.target.value);
    const newHour = newDate.getHours() + newDate.getMinutes() / 100;
    setDayFilterValue(newDate);
    setHourFilterValue(newHour);
  };

  const handleSearchButtonClick = () => {
    // Call both search functions with the current search values
    setSearchParams({
      ...searchParams,
      Name: nameSearchValue,
      Speciality: specialitySearchValue,
    });
  };

  const handleClrButtonClick = () => {
    setDayFilterValue([]);
    setHourFilterValue([]);
    setFilterParams({
      speciality: "",
      startDate: [],
      endDate: [],
      startHour: [],
      startHour: [],
    });
  };

  const handleNameSearchValueChange = (value) => {
    setNameSearchValue(value);
  };

  const handleSpecialitySearchValueChange = (value) => {
    setSpecialitySearchValue(value);
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
            placeholder="Doctor Name..."
            onChange={handleNameSearchValueChange}
          />
          <SearchBar
            placeholder="Doctor Speciality..."
            onChange={handleSpecialitySearchValueChange}
            marginLeft={4} // Add margin to the left
          />
          <Button onClick={handleSearchButtonClick} marginLeft={4}>
            Search
          </Button>
        </Flex>

        <Flex direction="row" alignItems="flex-start">
          <select onChange={handleSpecialityFilter}>
            <option value="">All</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            value={dayHourFilterValue}
            onChange={handleDateHourValue}
          /> */}

          {/* startDate */}
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="date"
            value={startDateFilterVal}
            onChange={handleStartDateFilterVal}
          />

          {/* endDate */}
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="date"
            value={endDateFilterVal}
            onChange={handleEndDateFilterVal}
          />

          {/* startHour */}
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="time"
            value={startHourFilterVal}
            onChange={handleStartHourFilterVal}
          />

          {/* endHour */}
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="time"
            value={endHourFilterVal}
            onChange={handleEndHourFilterVal}
          />

          <Button onClick={handleFilterOnChange} marginLeft={4}>
            filter
          </Button>

          <Button onClick={handleClrButtonClick} marginLeft={4}>
            Clear
          </Button>
        </Flex>
        <DoctorsTable
          title="Available Doctors"
          captions={["Name", "Speciality", "Cost"]}
          data={data}
        />
      </Flex>
    </Box>
  );
}
