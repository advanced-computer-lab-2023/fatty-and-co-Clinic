import React, { useEffect } from "react";
import  SearchBar  from "components/Navbars/SearchBar/SearchBar";
import DoctorsRow from "components/Tables/DoctorsRow";
import DoctorsTable from "./components/DoctorsTable";
import { Flex } from "@chakra-ui/react";



function Patient(){
    useEffect(() => {
        const myData = async() => {
            const response = await fetch("patient/view/doctors/:id");
            const data = await response.json();
            if (response.ok) {
              console.log(packages);
            } else {
              console.log(data);
            }
        }
    })
 
    return (

        //search bar & filter

        
        <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
        <DoctorsTable
        title={"Available Doctors"}
        captions={["Name", "Speciality", "Cost"]}
        data= {
            // [{
            //     Name: "JiraLogo",
            //     Speciality: "Add the New Pricing Page",
            //     Cost: "990"
            //     }]
            myData
            }
        />
        </Flex>
    )

}

export default Patient;
