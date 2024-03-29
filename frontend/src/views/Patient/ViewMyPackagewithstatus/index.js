import React, { useEffect, useState } from "react";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import { Flex, Button, Box, Input, Text, Select } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
//import FamPackageTable from "./components/FamPackageTable";
import MyPackageSubsTable from "./components/MyPackageTable";
//import FamPackageRow from "components/Tables/FamPackageRow";
//import statuspackagerow from "components/Tables/statuspackagerow";
 const ViewMyPackageswithstatus= ()=>{
  const [data, setData] = useState([]);
  
 
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;


  useEffect(() => {
    const url = API_PATHS.viewHealthPackagewithstatus;
    console.log(url)
    axios
      .get(url, {
        headers:{
          'Authorization': Authorization
        }})
      .then((response) => {
        setData(response.data);

      
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <Box pt="80px">
      <Flex
        direction="column"
        alignItems="flex-start"
        pt="50px"
        justifyContent="flex-start"
      >
         <MyPackageSubsTable
            title={"My Package"}
            captions={["Package", "Status","Enddate", "Startdate","Renewaldate"]}
            data={data}
           />
            {/* <Text fontSize="3xl" fontWeight="bold">
              No Subscriptions Found
            </Text> 
           */}
      </Flex>
    </Box>
  );
}
export default ViewMyPackageswithstatus