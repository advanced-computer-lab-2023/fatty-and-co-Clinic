// Chakra imports
import {
    Flex,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    Spinner,
    useColorModeValue,
  } from "@chakra-ui/react";
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";

  import Famappointmentrow from "components/Tables/Famappointmentrow";
  
  import React from "react";
  
  export const FamAppTable = ({ title, captions, data, isLoading ,handleCancelAppointment, }) => {
    //Table that uses row
    const textColor = useColorModeValue("gray.700", "white");
    return (
      <Card my="12px" overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 12px 0px">
          <Flex direction="column">
            <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
              {/* title will be All doctors  */}
              {title}
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          {isLoading ? (
            <Spinner></Spinner>
          ) : (
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr my=".6rem" pl="0px">
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
                {data?.map((row) => {
                  return (
                    <Famappointmentrow
                      key={row._id}
                      PatientName = {row.PatientName}
                      DoctorName={row.DoctorName}
                      DoctorUsername={row.DoctorUsername}
                      Status={row.Status}
                      Type={row.FollowUp ? "Follow Up" : "First Time"}
                      DateTime={row.Date}
                      data={data}
                      isLoading={isLoading}
                      appointmentId={row._id} // Assuming the appointment ID is in the data row as _id
                      handleCancelAppointment={handleCancelAppointment} // Pass the function to the row component// Pass the cancellation function as a prop
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
  
  export default FamAppTable;
  