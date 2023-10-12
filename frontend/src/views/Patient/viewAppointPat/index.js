import React, { useEffect, useState } from "react";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import { Flex, Button, Box } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import PatientAppTable from "./components/PatientAppTable";

function ViewPatientAppointments() {
  const [data, setData] = useState([{}]);
  const [searchParams, setSearchParams] = useState({
    Status: "",
    Date: "",
  });

  useEffect(() => {
    const Username = "Marioooom";
    const url = API_PATHS.viewAppointPat + Username;
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

  console.log(data);

  const handleStatusSearchValueChange = (value) => {

    setStatusSearchValue(value);
  };

  const handleDateSearchValueChange = (value) => {
    console.log(value);
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
            placeholder="Date..."
            onChange={handleDateSearchValueChange}
            marginLeft={4} // Add margin to the left
          />
          <Button onClick={handleSearchButtonClick} marginLeft={4}>
            Search
          </Button>
        </Flex>
        <PatientAppTable
          title={"Available Appointments"}
          captions={["Patient Name","Doctor Name", "Status", "Date"]}
          data={data}
        />
      </Flex>
    </Box>
  );
}

export default ViewPatientAppointments;
