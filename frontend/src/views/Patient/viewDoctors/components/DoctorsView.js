import {
    Box,
    Flex,
    Grid,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { useHistory } from "react-router-dom";
  import React, { useState } from "react";
  import DoctorCard from "./DoctorCard";
  
  const DoctorsView = ({ title, data }) => {
    const [selectedRow, setSelectedRow] = useState(null);
    const history = useHistory();
    const textColor = useColorModeValue("gray.700", "white");
  
    const handleRowClick = (row) => {
      setSelectedRow(row);
  
      let newUrl = `./viewDoctorDetails/${row}`;
      let newState = {
        Username: row.Username,
        Cost: row.Cost,
        CostFam: row.CostFam,
      }
  
      history.push(newUrl,newState );
    };
  
    return (
      <Box my="22px" overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Box p="6px 0px 22px 0px">
          <Flex direction="column">
            <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
              {/* title will be All doctors  */}
              {title}
            </Text>
          </Flex>
        </Box>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
          {data.map((row) => {
            return (
              <DoctorCard
                key={row.Username}
                Name={row.Name}
                Speciality={row.Speciality}
                Cost={row.Cost}
                CostOld={row.CostOld}
                isSelected={selectedRow === row}
                onClick={() => handleRowClick(row)}
              />
            );
          })}
        </Grid>
      </Box>
    );
  };
  
  export default DoctorsView;