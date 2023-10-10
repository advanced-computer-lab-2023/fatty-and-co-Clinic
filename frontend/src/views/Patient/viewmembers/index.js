import React, { useEffect, useState } from "react";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import DoctorsRow from "components/Tables/DoctorsRow";
import familymemberTable from "./components/FamilymemberTable";
import { Flex, Button, Box } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";

function Viewmembers() {
  const [data, setData] = useState([{}]);
  const [searchParams, setSearchParams] = useState({
    Name: "",
    Speciality: "",
  });
  const PatientUserName= "Mariam";

  useEffect(() => {
    const url = API_PATHS.Viewmembers + PatientUserName;
    console.log("Sending search params:", searchParams);
    console.log(url);
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
        <familymemberTable
          title={"Registered Family Memebers"}
          captions={["Name", "NationalId", "Age","Gender","Relation"]}
          data={data}
        />
      </Flex>
    </Box>
  );
}

export default Viewmembers;
