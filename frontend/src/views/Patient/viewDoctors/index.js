import React, { useEffect, useState } from "react";
import SearchBar from "components/Navbars/SearchBar/SearchBar";
import DoctorsRow from "components/Tables/DoctorsRow";
import DoctorsTable from "./components/DoctorsTable";
import { Flex } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";

function ViewDoctors() {
  const [data, setData] = useState([{}]);
  const id = "6521bece68537b0c5336b14a";
  useEffect(() => {
    fetch(API_PATHS.viewAllDoctors + id)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    //search bar & filter

    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <DoctorsTable
        title={"Available Doctors"}
        captions={["Name", "Speciality", "Cost"]}
        data={data}
      />
    </Flex>
  );
}

export default ViewDoctors;
