// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import DoctorsRow from "components/Tables/DoctorsRow";

import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import DocSlotRowApt from "components/Tables/DocSlotRowApt";
import { useAuthContext } from "hooks/useAuthContext";
import { useParams , useLocation} from "react-router-dom";

const DocSlotAptsTable = ({ title, captions, data,cameFromReschedule }) => {
  const history = useHistory();
  const textColor = useColorModeValue("gray.700", "white");

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const location = useLocation();
  const { state } = location;
  let Cost = state.Cost;
  let CostFam = state.CostFam;
  
  const handleBookClick = (row) => {
    // if (cameFromReschedule) {
    //   console.log("Handling Reschedule..."); // Log if came from Reschedule
    // } else {
      let newUrl = `../bookAptDetails/${row}`;
      let newState = {
        DayName: row.DayName,
        StartTime: row.StartTime,
        DoctorId: row.DoctorId,
        Cost: Cost,
        CostFam: CostFam,
      };

      history.push(newUrl, newState);
    
  };

  return (
    <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p="6px 0px 22px 0px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
            {/* title will be All doctors  */}
            {title}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px">
              {captions.map((caption, idx) => {
                return (
                  <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => {
              return (
                <DocSlotRowApt
                  key={row.id}
                  DayName={row.DayName}
                  StartTime={row.StartTime}
                  bookClickHandler={() => handleBookClick(row)}
                  cameFromReschedule={cameFromReschedule} 
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default DocSlotAptsTable;
