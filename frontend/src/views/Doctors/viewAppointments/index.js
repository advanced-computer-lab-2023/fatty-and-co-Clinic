import React, { useEffect, useState } from "react";
import SearchBar from "components/Navbars/SearchBar/SearchBar";

import Appointments from "components/Appointments.js"; //change imports
import { Flex } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";

function ViewAppointments() {
  const [data, setData] = useState([{}]);
  useEffect(() => {
    fetch(API_PATHS.viewAllAppointments)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    //search bar & filter

    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <DoctorsTable
        title={"All Appointments"}
        captions={["PatientUsername", "Status", "Date"]}
        data={data}
      />
    </Flex>
  );
}

export default ViewAppointments;
