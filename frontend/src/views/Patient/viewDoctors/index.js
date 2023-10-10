import React, { useEffect, useState } from "react";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import DoctorsRow from "components/Tables/DoctorsRow";
import DoctorsTable from "./components/DoctorsTable";
import { Flex, Button, Box } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";

function ViewDoctors() {
  const [data, setData] = useState([{}]);
  const [searchParams, setSearchParams] = useState({
    Name: "",
    Speciality: "",
  });
  const id = "6521bece68537b0c5336b14a";

  useEffect(() => {
    const url = API_PATHS.viewDoctors + id;
    console.log("Sending search params:", searchParams);
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
        <DoctorsTable
          title={"Available Doctors"}
          captions={["Name", "Speciality", "Cost"]}
          data={data}
        />
      </Flex>
    </Box>
  );
}

export default ViewDoctors;