import React from "react";
import SearchBar from "components/Navbars/SearchBar/SearchBar";
import DoctorsRow from "components/Tables/DoctorsRow";
import DoctorsTable from "./components/DoctorsTable";
import { Flex } from "@chakra-ui/react";
import { DoctorListContextProvider } from "../../../context/DoctorsContext";

function viewDoctors() {
  return (
    <DoctorListContextProvider>
      //search bar & filter
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <DoctorsTable
          title={"Available Doctors"}
          captions={["Name", "Speciality", "Cost"]}
          data={[
            {
              Name: "JiraLogo",
              Speciality: "Add the New Pricing Page",
              Cost: "990",
            },
          ]}
        />
      </Flex>
    </DoctorListContextProvider>
  );
}

export default viewDoctors;
