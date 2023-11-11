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
import PatientAppRow from "components/Tables/PatientAppRow";
import AppointmentsRow from "components/Tables/AppointmentsRow";

import React from "react";

export const PatientAppTable = ({ title, captions, data }) => {
  //Table that uses row
  const textColor = useColorModeValue("gray.700", "white");
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
            {data?.map((row) => {
              console.log(row);
              return (
                <AppointmentsRow
                  key={row.DoctorUsername}
                  DoctorName={row.DoctorName}
                  Status={row.Status}
                  Type={row.FollowUp ? "Follow Up" : "First Time"}
                  DateTime={row.Date}
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default PatientAppTable;
