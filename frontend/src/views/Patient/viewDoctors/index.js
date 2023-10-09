import React, { useEffect, useState } from "react";
import SearchBar from "components/Navbars/SearchBar/SearchBar";
import DoctorsRow from "components/Tables/DoctorsRow";
import DoctorsTable from "./components/DoctorsTable";
import { Flex } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";

function ViewDoctors() {
  const [mdata, setData] = useState([{}]);
  const id = "6521bece68537b0c5336b14a";
  useEffect(() => {
    fetch(API_PATHS.viewAllDoctors + id)
      .then((response) => response.json())
      .then((mdata) => setData(mdata));
  }, []);

  return (
    //search bar & filter

    console.log("hello" + mdata),
    (
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <DoctorsTable
          title={"Available Doctors"}
          captions={["Name", "Speciality", "Cost"]}
          data={mdata}
        />
      </Flex>
    )
  );
}

export default ViewDoctors;
