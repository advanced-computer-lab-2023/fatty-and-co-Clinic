import React, { useEffect, useState } from "react";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import { FamilymemberTable } from "./components/FamilymemberTable.js";
import { Flex, Button, Box } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useParams } from "react-router-dom";

function Viewmembers() {
  const [data, setData] = useState([{}]);
  const [searchParams, setSearchParams] = useState({
    Name: "",
    Speciality: "",
  });
  const { PatientUserName } = useParams();

  useEffect(() => {

  const URL1=API_PATHS.viewfamilymembers+PatientUserName;
    console.log("Sending search params:", searchParams);
    console.log( "here");
    console.log( URL1);
    axios
      .get(URL1, { params: searchParams })
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
        <FamilymemberTable
          title={"Registered Family Memebers"}
          captions={["Name", "NationalId", "Age", "Gender", "Relation"]}
          data={data}
        />
      </Flex>
    </Box>
  );
}

export default Viewmembers;
