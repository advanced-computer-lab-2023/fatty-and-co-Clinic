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
import ViewPackagewithstatus from "components/Tables/viewMyPackagewithstatus";
//console.log(statuspackagerow)
import React from "react";
const   MYPackagestatusTable = ({ title, captions, data }) => {
  const textColor = useColorModeValue("gray.700", "white");
  title="Family Member Packages"
  return (
    <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p="6px 0px 22px 0px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
            {title}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px">
              {captions.map((caption, idx) => (
                <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                  {caption}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
                <ViewPackagewithstatus
                  key={id}
                  Name={data.Patient.Name}
                  Status={data.Status}
                  PackageName={data.PackageName.Name}
                  Enddate={data.Enddate}
                  Startdate={data.Startdate}
                  Renewaldate={data.Renewaldate}
                />
              
          
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default MYPackagestatusTable ;
  