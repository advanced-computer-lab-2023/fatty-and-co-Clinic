import React, { useEffect, useState } from "react";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import PatientRow from "components/Tables/PatientRow";
import PatientTable from "./components/PatientTable";
import { Flex, Button, Box } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";

function ViewDoctorsPatients() {
  const [data, setData] = useState([{}]);
  const [searchParams, setSearchParams] = useState({
    Name: "",
    DoctorUsername: "",
  });

  setSearchParams({
    ...searchParams,
    Name: "",
    DoctorUsername: "",
  });
  useEffect(() => {
    const url = API_PATHS.viewPatientsDoctor;
    console.log("Sending search params:", searchParams);
    axios
      .get(url, { params: searchParams })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [searchParams]);

  const handleSearchButtonClick = () => {
    // Call both search functions with the current search values
    setSearchParams({
      ...searchParams,
      Name: "",
      DoctorUsername: "",
    });
  };

  const handleNameSearchValueChange = (value) => {
    setNameSearchValue(value);
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
            placeholder="Patient Name..."
            onChange={handleNameSearchValueChange}
          />

          <Button onClick={handleSearchButtonClick} marginLeft={4}>
            Search
          </Button>
        </Flex>
        <PatientTable
          title={"my patients"}
          captions={["Name", "MobileNum", "DateOfBirth"]}
          data={data}
        />
      </Flex>
    </Box>
  );
}

export default ViewDoctorsPatients;
