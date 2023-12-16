// Chakra imports
import {
  Flex,
  Spinner,
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
import AppointmentsRow from "components/Tables/AppointmentsRow";

import React from "react";

export const AppointmentsTable = ({ title, captions, data, isLoading, handleRescheduleAppointment }) => {
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
        {isLoading ? (
          <Spinner />
        ) : (
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px">
                {captions.map((caption, idx) => {
                  return (
                    <Th
                      color="gray.400"
                      key={idx}
                      ps={idx === 0 ? "0px" : null}
                    >
                      {caption}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row) => {
                return (
                  <AppointmentsRow
                    DoctorName={row.DoctorName}
                    key={row._id}
                    DoctorUsername={row.DoctorName}
                    customkey={row._id}
                    PatientName={row.PatientName}
                    PatientUsername={row.PatientUsername}
                    Type={row.FollowUp ? "Follow Up" : "First Time"}
                    Status={row.Status}
                    DateTime={row.Date}
                    handleRescheduleAppointment={handleRescheduleAppointment}
                  />
                );
              })}
            </Tbody>
          </Table>
        )}
      </CardBody>
    </Card>
  );
};

export default AppointmentsTable;
