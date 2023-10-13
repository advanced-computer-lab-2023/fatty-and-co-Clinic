import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import DoctorsTable from "./components/DoctorsTable";
import { Flex, Button, Box, Text, Input } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";

export function ViewDoctors() {
  const [data, setData] = useState([{}]);
  const [searchParams, setSearchParams] = useState({
    Name: "",
    Speciality: "",
  });

  const [filterParams, setFilterParams] = useState({
    speciality: "",
    date: [],
    hour: [],
    id: "",
  });
  const { id } = useParams();
  const options = [
    { label: "Cardiology", value: "Cardiology" },
    { label: "Dermatology", value: "Dermatology" },
    { label: "Endocrinology", value: "Endocrinology" },
    { label: "Gastroenterology", value: "Gastroenterology" },
    { label: "Hematology", value: "Hematology" },
    { label: "Infectious Disease", value: "Infectious Disease" },
    { label: "Nephrology", value: "Nephrology" },
    { label: "Neurology", value: "Neurology" },
    { label: "Oncology", value: "Oncology" },
    { label: "Ophthalmology", value: "Ophthalmology" },
    { label: "Orthopedics", value: "Orthopedics" },
    { label: "Otolaryngology", value: "Otolaryngology" },
    { label: "Pediatrics", value: "Pediatrics" },
  ];
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const url = API_PATHS.viewFilteredDoctors;
      console.log("Sending filter params:", filterParams);
      axios
        .get(url, { params: filterParams })
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [filterParams]);

  const [specialityFilterValue, setSpecialityFilterValue] = useState("");
  const [dayFilterValue, setDayFilterValue] = useState([]);
  const [hourFilterValue, setHourFilterValue] = useState([]);
  const [dayHourFilterValue, setDayHourFilterValue] = useState([]);

  //add date and hour
  const handleFilterOnChange = (value) => {
    setFilterParams({
      ...filterParams,
      speciality: specialityFilterValue,
      date: dayFilterValue,
      hour: hourFilterValue,
      id: id,
    });
  };

  const handleSpecialityFilter = (event) => {
    setSpecialityFilterValue(event.target.value);
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
    const url = API_PATHS.viewDoctors + id;
    axios
      .get(url, { params: searchParams })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [searchParams]);

  const [nameSearchValue, setNameSearchValue] = useState("");
  const [specialitySearchValue, setSpecialitySearchValue] = useState("");

  const handleSearchButtonClick = () => {
    // Call both search functions with the current search values
    setSearchParams({
      ...searchParams,
      Name: nameSearchValue,
      Speciality: specialitySearchValue,
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
            // placeholder="Select Date and Time"
            size="ld"
            type="date"
            value={dayFilterValue}
            onChange={handleDateFilter}
          />

          <Input
            // placeholder="Select Date and Time"
            size="ld"
            // type="time"
            placeholder="Time format: HH.MM"
            type="number"
            min="0"
            max="23"
            step="0.01"
            value={hourFilterValue}
            onChange={handleHourFilter}
          /> */}

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

          <Button onClick={handleSearchButtonClick} marginLeft={4}>
            Clear
          </Button>
        </Flex>
        {(id && id !== ":id" && (
          <DoctorsTable
            title={"Available Doctors"}
            captions={["Name", "Speciality", "Cost"]}
            data={data}
          />
        )) || (
          <Text fontSize="3xl" fontWeight="bold">
            ID not found
          </Text>
        )}
      </Flex>
    </Box>
  );
}
